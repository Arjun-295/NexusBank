import joblib
import os
import pandas as pd
import numpy as np
import logging

logger = logging.getLogger(__name__)

# Load the models globally when the module loads
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
MODEL_DIR = os.path.join(BASE_DIR, "models")

try:
    # Load XGBoost model artifact
    artifact = joblib.load(os.path.join(MODEL_DIR, "best_fraud_model_tuned.pkl"))
    model = artifact["model"]
    threshold = artifact["threshold"]
    features_list = artifact["features"]
    
    # Load scaler, encoder, and stats
    scaler = joblib.load(os.path.join(MODEL_DIR, "xgb_scaler.pkl"))
    le = joblib.load(os.path.join(MODEL_DIR, "xgb_le.pkl"))
    p99_amount = joblib.load(os.path.join(MODEL_DIR, "xgb_p99.pkl"))
    
    model_loaded = True
except Exception as e:
    logger.error(f"Warning: Fraud model could not be loaded. {e}")
    model_loaded = False

def predict_risk(
    step: int,
    transaction_type: str,
    amount: float,
    oldbalanceOrg: float,
    newbalanceOrig: float,
    oldbalanceDest: float,
    newbalanceDest: float
) -> str:
    """
    Predicts the risk level of a transaction.
    Returns one of: "Normal", "Suspicious", "High Risk".
    """
    if not model_loaded:
        return "Normal"  # Default if model fails to load

    try:
        # 1. Feature Engineering
        log_amount = np.log1p(amount)
        is_high_amount = 1 if amount > p99_amount else 0
        
        hour = step % 24
        is_night = 1 if hour in [0,1,2,3,4,5,22,23] else 0
        
        balance_diff_orig = oldbalanceOrg - newbalanceOrig
        balance_diff_dest = newbalanceDest - oldbalanceDest
        
        # 2. Encode categorical variables
        try:
            type_enc = le.transform([transaction_type])[0]
        except ValueError:
            # If transaction type wasn't in training data
            type_enc = 0

        # Construct raw features array
        raw_features = {
            'step': step,
            'amount': amount,
            'log_amount': log_amount,
            'is_high_amount': is_high_amount,
            'hour': hour,
            'is_night': is_night,
            'balance_diff_orig': balance_diff_orig,
            'balance_diff_dest': balance_diff_dest,
            'type_enc': type_enc
        }

        # Create dataframe matching the required features order
        df_features = pd.DataFrame([raw_features])[features_list]
        
        # 3. Scale features
        X_scaled = scaler.transform(df_features)
        
        # Re-wrap in DataFrame for XGBoost if it requires column names
        df_scaled = pd.DataFrame(X_scaled, columns=features_list)

        # 4. Predict probabilities
        probabilities = model.predict_proba(df_scaled)[0]
        
        # Probability of being fraud (class 1)
        fraud_prob = probabilities[1]

        # Use our tuned threshold
        if fraud_prob >= threshold:
            return "High Risk"
        elif fraud_prob >= threshold * 0.7:  # A buffer for suspicious
            return "Suspicious"
        else:
            return "Normal"
            
    except Exception as e:
        logger.error(f"Error during fraud prediction: {e}")
        return "Normal"
