import React, { useEffect, useState } from "react";
import { useTotalBalance } from "../hooks/useTotalBalance";
import { formatAccountNumber } from "../util/formatAccNum";
import { accountService } from "../services/accountService";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavBar from "../components/TopNavBar";

export default function TransferMoney() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [amount, setAmount] = useState(0);
  const [destinationAccount, setDestinationAccount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [sourceAccountId, setSourceAccountId] = useState("");
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    accountService.account_details().then((res) => {
      const fetchedAccounts = res.data.accounts || [];
      setAccounts(fetchedAccounts);
      if (fetchedAccounts.length > 0) {
        setSourceAccountId(fetchedAccounts[0].id);
      }
    }).catch(console.error);

    fetchTransfers();
  }, []);

  const fetchTransfers = () => {
    accountService.get_transactions(50, 0).then((res) => {
      const allTx = res.data.transactions || [];
      const transferTx = allTx.filter(tx => tx.type === "transfer");
      setTransfers(transferTx.slice(0, 5)); // Show top 5
    }).catch(console.error);
  };

  // Simulate navigation
  const goToStep = (step) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const nextStep = (step) => {
    setCurrentStep(step);
  };

  const prevStep = (step) => {
    setCurrentStep(step);
  };

  const quickSelect = (name, acct) => {
    setCurrentStep(2);
  };

  const completeTransfer = async () => {
    setIsProcessing(true);
    setErrorMessage("");
    try {
      const val = parseFloat(amount);
      if (!val || val <= 0) {
        throw new Error("Invalid amount");
      }
      if (!destinationAccount) {
        throw new Error("Invalid destination account");
      }
      if (!sourceAccountId) {
        throw new Error("Source account not selected");
      }
      const res = await accountService.transfer(parseInt(sourceAccountId), destinationAccount, val);
      setIsSuccess(true);
      alert(
        "Transfer initiated successfully! Your transaction reference is " +
          res.data.transaction.reference_number,
      );
      setTimeout(() => {
        setIsSuccess(false);
        setCurrentStep(1);
        setAmount(0);
        setDestinationAccount("");
      }, 3000);
      fetchTransfers();
    } catch (err) {
      console.error(err);
      const text =
        err.response?.data?.detail || err.message || "Transfer failed";
      setErrorMessage(text);
      alert(text);
    } finally {
      setIsProcessing(false);
    }
  };

  const { balance, accountNumber, loading: balLoading } = useTotalBalance();

  const getCircleClass = (stepNum) => {
    if (stepNum < currentStep) {
      return "w-10 h-10 rounded-full flex items-center justify-center bg-tertiary text-on-tertiary font-bold transition-colors";
    } else if (stepNum === currentStep) {
      return "w-10 h-10 rounded-full flex items-center justify-center bg-primary text-on-primary font-bold transition-colors";
    } else {
      return "w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant font-bold transition-colors";
    }
  };

  const getTextClass = (stepNum) => {
    if (stepNum < currentStep) {
      return "font-label-md text-label-md text-on-surface-variant";
    } else if (stepNum === currentStep) {
      return "font-label-md text-label-md text-primary";
    } else {
      return "font-label-md text-label-md text-on-surface-variant";
    }
  };

  const getLineStyle = (lineNum) => {
    if (lineNum < currentStep) {
      return { width: "100%" };
    } else {
      return { width: "0%" };
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen">
      {/* SideNavBar */}
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen px-margin-mobile md:px-margin-desktop pt-8 pb-xl max-w-container-max mx-auto">
        {/* Header Section */}
        <TopNavBar
          title="Transfer Money"
          subtitle="Move your funds securely across accounts or to third-party beneficiaries."
        />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
          {/* Transfer Stepper & Form */}
          <div className="xl:col-span-8">
            <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_12px_rgba(10,37,64,0.05)] border border-outline-variant/20 p-md md:p-lg">
              {/* Stepper Indicator */}
              <div className="flex items-center justify-between mb-lg max-w-2xl mx-auto overflow-hidden">
                <div
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                  onClick={() => goToStep(1)}
                >
                  <div className={getCircleClass(1)}>
                    {1 < currentStep ? (
                      <span className="material-symbols-outlined">check</span>
                    ) : (
                      "1"
                    )}
                  </div>
                  <span className={getTextClass(1)}>Source</span>
                </div>
                <div className="flex-1 h-[2px] bg-outline-variant/30 mx-4 -mt-6">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={getLineStyle(1)}
                  ></div>
                </div>

                <div
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => goToStep(2)}
                >
                  <div className={getCircleClass(2)}>
                    {2 < currentStep ? (
                      <span className="material-symbols-outlined">check</span>
                    ) : (
                      "2"
                    )}
                  </div>
                  <span className={getTextClass(2)}>Beneficiary</span>
                </div>
                <div className="flex-1 h-[2px] bg-outline-variant/30 mx-4 -mt-6">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={getLineStyle(2)}
                  ></div>
                </div>

                <div
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => goToStep(3)}
                >
                  <div className={getCircleClass(3)}>
                    {3 < currentStep ? (
                      <span className="material-symbols-outlined">check</span>
                    ) : (
                      "3"
                    )}
                  </div>
                  <span className={getTextClass(3)}>Amount</span>
                </div>
                <div className="flex-1 h-[2px] bg-outline-variant/30 mx-4 -mt-6">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={getLineStyle(3)}
                  ></div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className={getCircleClass(4)}>
                    {4 < currentStep ? (
                      <span className="material-symbols-outlined">check</span>
                    ) : (
                      "4"
                    )}
                  </div>
                  <span className={getTextClass(4)}>Verify</span>
                </div>
              </div>

              {/* Step Content Containers */}
              <div className="relative overflow-hidden min-h-[400px]">
                {/* Step 1: Source Account */}
                <div
                  className={`transition-all duration-400 ease-in-out ${currentStep === 1 ? "opacity-100 translate-x-0" : "hidden opacity-0 translate-x-20"}`}
                >
                  <h3 className="font-headline-md text-headline-md mb-md">
                    Select Source Account
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    {accounts.map((acc) => (
                      <label key={acc.id} className="relative block cursor-pointer group">
                        <input
                          checked={sourceAccountId === acc.id}
                          onChange={() => setSourceAccountId(acc.id)}
                          className="peer sr-only"
                          name="source_account"
                          type="radio"
                        />
                        <div className="p-md rounded-xl border-2 border-outline-variant/30 peer-checked:border-primary peer-checked:bg-primary/5 transition-all group-hover:bg-surface-container-low">
                          <div className="flex justify-between items-start mb-sm">
                            <span className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">
                              {acc.account_type}
                            </span>
                            <span className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100">
                              check_circle
                            </span>
                          </div>
                          <p className="font-headline-md text-headline-md text-on-surface mb-xs">
                            {`$${acc.balance}`}
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {acc.account_number}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="mt-lg flex justify-end">
                    <button
                      className="px-lg py-3 bg-primary text-on-primary rounded-lg font-bold hover:scale-[0.98] transition-transform flex items-center gap-2 outline-none"
                      onClick={() => nextStep(2)}
                    >
                      Continue{" "}
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Beneficiary Details */}
                <div
                  className={`transition-all duration-400 ease-in-out ${currentStep === 2 ? "opacity-100 translate-x-0" : "hidden opacity-0 translate-x-20"}`}
                >
                  <h3 className="font-headline-md text-headline-md mb-md">
                    Beneficiary Details
                  </h3>
                  <div className="space-y-md w-full">
                    <div className="space-y-2">
                      <label className="font-label-md text-label-md text-on-surface-variant ml-1">
                        Account Number
                      </label>
                      <input
                        className="w-full bg-surface-container-low border-0 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 transition-shadow outline-none"
                        placeholder="Enter account number"
                        type="text"
                        value={destinationAccount}
                        onChange={(e) => setDestinationAccount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-md text-label-md text-on-surface-variant ml-1">
                        Beneficiary Name
                      </label>
                      <input
                        className="w-full bg-surface-container-low border-0 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 transition-shadow outline-none"
                        placeholder="Full name as per bank records"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-md text-label-md text-on-surface-variant ml-1">
                        Bank Name
                      </label>
                      <select className="w-full bg-surface-container-low border-0 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 transition-shadow appearance-none outline-none">
                        <option>Select Bank</option>
                        <option>Nexus Reserve Bank</option>
                        <option>Global Equity Trust</option>
                        <option>Apex Commercial</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-lg flex justify-between">
                    <button
                      className="px-lg py-3 border border-outline-variant text-secondary rounded-lg font-bold hover:bg-surface-container-high transition-colors outline-none"
                      onClick={() => prevStep(1)}
                    >
                      Back
                    </button>
                    <button
                      className="px-lg py-3 bg-primary text-on-primary rounded-lg font-bold hover:scale-[0.98] transition-transform flex items-center gap-2 outline-none"
                      onClick={() => nextStep(3)}
                    >
                      Continue{" "}
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>

                {/* Step 3: Amount */}
                <div
                  className={`transition-all duration-400 ease-in-out ${currentStep === 3 ? "opacity-100 translate-x-0" : "hidden opacity-0 translate-x-20"}`}
                >
                  <h3 className="font-headline-md text-headline-md mb-md">
                    Enter Amount
                  </h3>
                  <div className="w-full text-center py-lg">
                    <div className="relative inline-block w-full">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display-lg text-display-lg text-primary">
                        $
                      </span>
                      <input
                        className="w-full text-center py-8 font-display-lg text-display-lg text-on-surface bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 outline-none transition-colors"
                        step="0.01"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <p className="mt-md font-body-sm text-body-sm text-on-surface-variant">
                      Daily limit remaining: $45,000.00
                    </p>
                    <div className="mt-md flex flex-wrap justify-center gap-sm">
                      <button className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors outline-none">
                        +$100
                      </button>
                      <button className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors outline-none">
                        +$500
                      </button>
                      <button className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors outline-none">
                        +$1,000
                      </button>
                    </div>
                  </div>
                  <div className="mt-lg flex justify-between">
                    <button
                      className="px-lg py-3 border border-outline-variant text-secondary rounded-lg font-bold hover:bg-surface-container-high transition-colors outline-none"
                      onClick={() => prevStep(2)}
                    >
                      Back
                    </button>
                    <button
                      className="px-lg py-3 bg-primary text-on-primary rounded-lg font-bold hover:scale-[0.98] transition-transform flex items-center gap-2 outline-none"
                      onClick={() => nextStep(4)}
                    >
                      Final Review{" "}
                      <span className="material-symbols-outlined">
                        verified_user
                      </span>
                    </button>
                  </div>
                </div>

                {/* Step 4: Verification */}
                <div
                  className={`transition-all duration-400 ease-in-out ${currentStep === 4 ? "opacity-100 translate-x-0" : "hidden opacity-0 translate-x-20"}`}
                >
                  <div className="text-center w-full">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-md">
                      <span
                        className="material-symbols-outlined text-primary text-4xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        security
                      </span>
                    </div>
                    <h3 className="font-headline-md text-headline-md mb-xs">
                      Secure Verification
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                      Please enter your 6-digit transaction PIN to authorize
                      this transfer of{" "}
                      <span className="font-bold text-on-surface">
                        ${amount}
                      </span>
                      .
                    </p>

                    <div className="flex justify-center gap-sm mb-lg">
                      {[1, 2, 3, 4, 5, 6].map((idx) => (
                        <input
                          key={idx}
                          className="w-12 h-16 text-center text-headline-md border-0 bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary/30 outline-none"
                          maxLength="1"
                          type="password"
                        />
                      ))}
                    </div>

                    <button
                      className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 outline-none flex items-center justify-center gap-2 disabled:opacity-50"
                      onClick={completeTransfer}
                      disabled={isProcessing || isSuccess}
                    >
                      {isProcessing ? (
                        <>
                          <span className="material-symbols-outlined animate-spin">
                            sync
                          </span>{" "}
                          Processing...
                        </>
                      ) : isSuccess ? (
                        <>
                          <span className="material-symbols-outlined">
                            check_circle
                          </span>{" "}
                          Transfer Complete
                        </>
                      ) : (
                        "Confirm Transfer"
                      )}
                    </button>
                    <button
                      className="mt-md text-on-surface-variant hover:text-primary transition-colors font-label-lg outline-none"
                      onClick={() => prevStep(3)}
                    >
                      Cancel Transaction
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Bento Column */}
          <div className="xl:col-span-4 space-y-gutter mt-lg xl:mt-0">
            {/* Frequent Beneficiaries */}
            <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-md shadow-[0px_4px_12px_rgba(10,37,64,0.05)]">
              <div className="flex items-center justify-between mb-md">
                <h4 className="font-headline-md text-label-lg text-on-surface uppercase tracking-tight">
                  Quick Transfer
                </h4>
                <button className="text-primary font-label-md hover:underline outline-none">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-sm">
                <button
                  className="group p-3 rounded-xl border border-outline-variant/10 hover:border-primary hover:bg-primary/5 transition-all text-center outline-none"
                  onClick={() => quickSelect("Elena Vance", "**** 4410")}
                >
                  <img
                    alt="Elena Vance"
                    className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-surface shadow-sm object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgAUujFG8puNKaIgYMBUp6SNCyQ-huZD1a0Z81p7atMjk84EhxwPCs9LgegPETHT_Q8KAA94aw6NQXPB5-QFwMo7gxR9Xo1nOpCCTxXGRJFxZdfcOWSq2CYYwQtlt1voGbhNPECVAKVxFtBMNvTR3fgfUtRqRhtjtNYtBl8hvGP4ybUb-BhN2kM9jm4qKWOjSvu2aH3Ot5YR8-4qeuUrxeJZUHSAzDzzplcIsoeAWlgv-xob8GcJzc6Z3G3_f5r4lzYmUBzneuMcND"
                  />
                  <p className="font-label-lg text-label-lg text-on-surface truncate">
                    Elena Vance
                  </p>
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    Savings
                  </p>
                </button>
                <button
                  className="group p-3 rounded-xl border border-outline-variant/10 hover:border-primary hover:bg-primary/5 transition-all text-center outline-none"
                  onClick={() => quickSelect("Marcus Thorne", "**** 2201")}
                >
                  <img
                    alt="Marcus Thorne"
                    className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-surface shadow-sm object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxBYxstn24sjZhi8QEaYvYMFs_pntztBBabg_hFrIofJNUf3l9Uu5urTIAfU2WdOOJdzwvNkq45jpsKddzpwuQmSASphRWA7UiS_tIwJNgYtBgIkC18L6xHcRAJYfGWNzyAUuN_VGDxaeLTU7CinAgMkVqG3xq48wUTK48Jej4w2K6SEtgRFuspcbsywstH2uMkRXvijz3YNaAey3x8UUG4T9QRMhNrYRJJUXLJCop9eDTKcTwvYwdT6jn3OsbjPgIWMgIFaP1-4vJ"
                  />
                  <p className="font-label-lg text-label-lg text-on-surface truncate">
                    Marcus Thorne
                  </p>
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    Joint Account
                  </p>
                </button>
                <button
                  className="group p-3 rounded-xl border border-outline-variant/10 hover:border-primary hover:bg-primary/5 transition-all text-center outline-none"
                  onClick={() => quickSelect("Sarah Jenkins", "**** 9982")}
                >
                  <img
                    alt="Sarah Jenkins"
                    className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-surface shadow-sm object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR5GQWOYkOP9RbUtwjHzzG1eraIsUBBGcMhH3o28Us9Y_PiAlcRTMrks0uKgLfjmcZePOeeT8KHLp0X7cm9e0b_w8htgGBEv-Aqx20VfygOpWFndVhgQ48pPr8qz3KY9DsqlydbTyDaQQ3MnxPtDT12QBppN3EWtlBv0i_rN1kaQMWzWK6hu-WQM8OjkSEbLvevZw00-napSEj7STKlUKRT5RHilPcOPAll3ESPKOp3EC3LLWNSsxv10x-6tEZqYUf9WWU7lYKQzM-"
                  />
                  <p className="font-label-lg text-label-lg text-on-surface truncate">
                    Sarah Jenkins
                  </p>
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    Work
                  </p>
                </button>
                <button className="p-3 rounded-xl border-2 border-dashed border-outline-variant/40 hover:border-primary hover:bg-primary/5 transition-all text-center flex flex-col items-center justify-center outline-none">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-primary">
                      add
                    </span>
                  </div>
                  <p className="font-label-lg text-label-lg text-primary">
                    New Payee
                  </p>
                </button>
              </div>
            </section>

            {/* Security Tip Card */}
            <div className="bg-primary rounded-xl p-md text-on-primary relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-on-primary/10 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
              <div className="relative z-10">
                <span
                  className="material-symbols-outlined mb-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <h4 className="font-headline-md text-label-lg uppercase mb-xs">
                  Security Advisory
                </h4>
                <p className="font-body-sm text-body-sm opacity-90 mb-md">
                  Never share your transaction PIN or OTP with anyone, even bank
                  officials. Nexus Bank will never ask for your private
                  credentials over phone or email.
                </p>
                <Link
                  className="font-label-md text-label-md underline hover:opacity-100 opacity-80"
                  to="#"
                >
                  Security Protocol Guide
                </Link>
              </div>
            </div>

            {/* Recent Activity Mini-List */}
            <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-md shadow-[0px_4px_12px_rgba(10,37,64,0.05)]">
              <h4 className="font-headline-md text-label-lg text-on-surface uppercase tracking-tight mb-md">
                Recent Transfers
              </h4>
              <div className="space-y-md">
                {transfers.length === 0 ? (
                  <p className="font-body-sm text-on-surface-variant">No recent transfers.</p>
                ) : (
                  transfers.map((tx) => (
                    <div key={tx.id} className="flex items-center gap-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">call_made</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-label-lg text-label-lg text-on-surface">
                          To {tx.destination_account_id ? `Account ID: ${tx.destination_account_id}` : tx.reference_number}
                        </p>
                        <p className="font-label-md text-label-md text-on-surface-variant">
                          {new Date(tx.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="font-numeric-data text-label-lg text-on-surface">
                        -${tx.amount.toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <footer className="lg:ml-64 w-full py-md px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container-lowest border-t border-outline-variant/10 mt-xl">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          © 2024 Nexus Bank. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-md">
          <Link
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            to="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            to="#"
          >
            Terms of Service
          </Link>
          <Link
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            to="#"
          >
            Security Disclosure
          </Link>
          <Link
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            to="#"
          >
            Contact Support
          </Link>
        </div>
      </footer>
    </div>
  );
}
