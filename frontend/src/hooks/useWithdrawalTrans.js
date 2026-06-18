import { useEffect, useState } from "react";
import { accountService } from "../services/accountService";

export function useWithdrawalTrans(limit = 3) {
  const [withdrawalTrans, setWithdrawalTrans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    accountService
      .recent_withdraws(limit)
      .then((data) => {
        setWithdrawalTrans(data.withdraw_transactions ?? []);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(withdrawalTrans);
  }, [limit]);

  return { withdrawalTrans, loading, error };
}
