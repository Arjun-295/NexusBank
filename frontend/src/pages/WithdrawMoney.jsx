import React, { useEffect, useState } from "react";
import { useTotalBalance } from "../hooks/useTotalBalance";
import { formatAccountNumber } from "../util/formatAccNum";
import { accountService } from "../services/accountService";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavBar from "../components/TopNavBar";
import WithdrawalTable from "../components/WithdrawalTable";

export default function WithdrawMoney() {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sourceAccountId, setSourceAccountId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [message, setMessage] = useState(null);
  const [balance, setBalance] = useState(0);

  const { balance: totalBalance, loading: balLoading } = useTotalBalance();

  useEffect(() => {
    accountService.account_details().then((res) => {
      const fetchedAccounts = res.data.accounts || [];
      setAccounts(fetchedAccounts);
      if (fetchedAccounts.length > 0) {
        setSourceAccountId(fetchedAccounts[0].id);
      }
    }).catch(console.error);

    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = () => {
    accountService.recent_withdraws(50).then((res) => {
      setWithdrawals(res.withdraw_transactions || []);
    }).catch(console.error);
  };

  useEffect(() => {
    const selectedAcc = accounts.find(a => a.id === parseInt(sourceAccountId));
    if (selectedAcc) {
      setBalance(selectedAcc.balance);
    } else {
      setBalance(0);
    }
  }, [sourceAccountId, accounts]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const isError = parseFloat(amount) > balance;

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setMessage(null);
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      setMessage({ type: "error", text: "Please enter a valid amount." });
      return;
    }
    if (val > balance) {
      setMessage({ type: "error", text: "Insufficient funds." });
      return;
    }

    setIsProcessing(true);
    try {
      const res = await accountService.withdraw(val, parseInt(sourceAccountId));
      setIsSuccess(true);
      setMessage({ type: "success", text: "Withdrawal completed." });
      setAmount("");
      fetchWithdrawals();
      // Optionally refresh balance or transaction list here
    } catch (err) {
      console.error(err);
      const text =
        err.response?.data?.detail || err.message || "Withdrawal failed";
      setMessage({ type: "error", text });
    } finally {
      setIsProcessing(false);
      setTimeout(() => setIsSuccess(false), 1500);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* Side Navigation Shell */}
      <Sidebar />

      {/* Main Content Canvas */}
      <main className="lg:ml-64 min-h-screen px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        {/* Header Section */}
        <TopNavBar
          title="Withdraw Money"
          subtitle="Transfer funds securely to your linked accounts."
        />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-lg">
          {/* Main Interaction Column */}
          <div className="xl:col-span-8 flex flex-col gap-lg">
            {/* Available Balance Hero Card */}
            <section className="bg-primary text-on-primary p-lg rounded-xl shadow-[0px_4px_12px_rgba(10,37,64,0.05)] relative overflow-hidden">
              {/* Decor element */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl"></div>
              <div className="absolute right-10 bottom-10 opacity-20">
                <span
                  className="material-symbols-outlined text-[120px]"
                  data-icon="account_balance"
                >
                  account_balance
                </span>
              </div>
              <div className="relative z-10 flex flex-col gap-sm">
                <h3 className="font-label-lg text-label-lg opacity-80 uppercase tracking-widest">
                  Available Balance
                </h3>
                <div className="flex items-baseline gap-xs">
                  <span className="font-display-lg text-display-lg">$</span>
                  <span
                    className="font-display-lg text-display-lg"
                    id="balanceAmount"
                  >
                    {`${balance}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-base">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary-fixed text-[10px] font-bold uppercase">
                    Selected Account
                  </span>
                  <span className="text-on-primary/60 text-body-sm">
                    {accounts.find(a => a.id === parseInt(sourceAccountId))?.account_number || "---"}
                  </span>
                </div>
              </div>
            </section>

            {/* Withdrawal Form Card */}
            <section className="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(10,37,64,0.05)] border border-outline-variant/10">
              <div className="flex items-center gap-sm mb-lg">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary text-[20px]"
                    data-icon="outbound"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    outbound
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Initiate Withdrawal
                </h3>
              </div>

              <form className="flex flex-col gap-lg" onSubmit={handleWithdraw}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  {/* Account Selection */}
                  <div className="flex flex-col gap-base">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant"
                      htmlFor="account-select"
                    >
                      Source Account
                    </label>
                    <div className="relative">
                      <select
                        value={sourceAccountId}
                        onChange={(e) => setSourceAccountId(e.target.value)}
                        className="w-full bg-surface-container-low border-0 rounded-lg px-md py-sm font-body-md text-on-surface focus:ring-2 focus:ring-primary/20 transition-all appearance-none outline-none"
                        id="account-select"
                      >
                        {accounts.map(acc => (
                          <option key={acc.id} value={acc.id}>
                            {acc.account_type.toUpperCase()} - {acc.account_number}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <span
                          className="material-symbols-outlined text-on-surface-variant"
                          data-icon="expand_more"
                        >
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Destination Method */}
                  <div className="flex flex-col gap-base">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant"
                      htmlFor="method-select"
                    >
                      Destination Method
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-surface-container-low border-0 rounded-lg px-md py-sm font-body-md text-on-surface focus:ring-2 focus:ring-primary/20 transition-all appearance-none outline-none"
                        id="method-select"
                      >
                        <option value="ach">Bank Transfer (ACH)</option>
                        <option value="wire">Domestic Wire Transfer</option>
                        <option value="instant">Instant Debit Card Pull</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <span
                          className="material-symbols-outlined text-on-surface-variant"
                          data-icon="account_balance"
                        >
                          account_balance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="flex flex-col gap-base">
                  <label
                    className="font-label-md text-label-md text-on-surface-variant"
                    htmlFor="withdraw-amount"
                  >
                    Withdrawal Amount
                  </label>
                  <div className="relative">
                    <div className="absolute left-md top-1/2 -translate-y-1/2">
                      <span className="font-headline-md text-on-surface-variant">
                        $
                      </span>
                    </div>
                    <input
                      className={`w-full bg-surface-container-low border-0 rounded-lg pl-lg pr-md py-md font-numeric-data text-headline-md text-on-surface transition-all outline-none focus:ring-2 focus:ring-primary/20 ${isError ? "ring-2 ring-error focus:ring-error" : ""}`}
                      id="withdraw-amount"
                      placeholder="0.00"
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                  {/* Validation Message */}
                  <div
                    className={`${isError ? "flex" : "hidden"} items-center gap-2 text-error mt-1 animate-pulse`}
                    id="error-message"
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      data-icon="error"
                    >
                      error
                    </span>
                    <span className="font-label-md text-label-md">
                      Insufficient Balance. Please enter a lower amount.
                    </span>
                  </div>
                </div>

                {/* Confirmation Button */}
                <div className="pt-base border-t border-outline-variant/10 mt-md">
                  <button
                    className="w-full md:w-auto px-xl py-md bg-primary text-on-primary font-label-lg text-label-lg rounded-lg hover:bg-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-3 outline-none disabled:opacity-50"
                    id="confirm-btn"
                    type="submit"
                    disabled={isProcessing || isError}
                  >
                    {isProcessing ? (
                      <>
                        <span
                          className="material-symbols-outlined animate-spin"
                          data-icon="progress_activity"
                        >
                          progress_activity
                        </span>{" "}
                        Processing...
                      </>
                    ) : isSuccess ? (
                      <>
                        <span
                          className="material-symbols-outlined"
                          data-icon="check_circle"
                        >
                          check_circle
                        </span>{" "}
                        Success
                      </>
                    ) : (
                      <>
                        <span
                          className="material-symbols-outlined"
                          data-icon="lock"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          lock
                        </span>
                        Confirm Withdrawal
                      </>
                    )}
                  </button>
                </div>
              </form>
              {message && (
                <div
                  className={`mt-4 p-3 rounded ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
                >
                  {message.text}
                </div>
              )}
            </section>

            {/* Withdrawal History */}
            <section className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_12px_rgba(10,37,64,0.05)] border border-outline-variant/10 overflow-hidden">
              <div className="px-lg py-md border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Withdrawal History
                </h3>
                <button className="text-primary font-label-lg text-label-lg hover:underline transition-all outline-none">
                  View All
                </button>
              </div>
              <WithdrawalTable withdrawals={withdrawals} />
            </section>
          </div>

          {/* Sidebar Info Column */}
          <div className="xl:col-span-4 flex flex-col gap-lg">
            {/* Security Tip Card */}
            <section className="bg-surface-container-high/40 border border-outline-variant/10 p-md rounded-xl">
              <div className="flex items-center gap-sm mb-base text-primary">
                <span
                  className="material-symbols-outlined"
                  data-icon="verified_user"
                >
                  verified_user
                </span>
                <h4 className="font-label-lg text-label-lg">
                  Safe Banking Tip
                </h4>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Nexus Bank will never ask for your PIN or full password via
                phone or email. Always verify the withdrawal destination before
                confirming.
              </p>
            </section>

            {/* Limits Card */}
            <section className="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(10,37,64,0.05)] border border-outline-variant/10">
              <h4 className="font-label-lg text-label-lg text-on-surface mb-md">
                Withdrawal Limits
              </h4>
              <div className="flex flex-col gap-md">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface-variant">Daily Limit</span>
                    <span className="text-on-surface">$5,000.00</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="w-[30%] h-full bg-primary"></div>
                  </div>
                  <span className="text-[10px] text-on-surface-variant mt-1">
                    $1,500 used of $5,000
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface-variant">
                      Monthly Limit
                    </span>
                    <span className="text-on-surface">$25,000.00</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="w-[12%] h-full bg-primary"></div>
                  </div>
                  <span className="text-[10px] text-on-surface-variant mt-1">
                    $3,000 used of $25,000
                  </span>
                </div>
              </div>
            </section>

            {/* Help Banner Image */}
            <div className="rounded-xl overflow-hidden relative h-48 shadow-[0px_4px_12px_rgba(10,37,64,0.05)]">
              <img
                alt="Financial Support"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPf95TdgGwz3CHOH9JNmQj3AcNSU7XyMmvOai-tRuilmYP9V2Cz7Q8Fsbp-t2mRXds9CzQiD5GcFq7g83yrRjrarm_AnM0lOcwlcn4GcUE19hEBvqMDOKkFTHNShhN_QR21FssJ9KzAL551EugUfjJi2rqn_hSYG6JaFp48tUHNzt8fAIJjZju18hnSOHclgul8q1iM8F-aFt7a82R7J8MoWGgOEYg9BLK5Qk27CYiiLC22N1jhBySxZeYEpCDUR74oZ5YjDqLQpTN"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 to-transparent flex flex-col justify-end p-md">
                <h5 className="text-white font-label-lg text-label-lg">
                  Need Assistance?
                </h5>
                <p className="text-white/80 font-body-sm text-body-sm">
                  Our advisors are available 24/7 for security support.
                </p>
                <button className="mt-base text-primary-fixed font-label-md text-label-md hover:text-white transition-colors flex items-center gap-1 outline-none">
                  Chat Now{" "}
                  <span
                    className="material-symbols-outlined text-[14px]"
                    data-icon="chevron_right"
                  >
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="lg:ml-64 bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="w-full py-md px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-md max-w-container-max mx-auto">
          <span className="font-label-lg text-label-lg font-bold text-on-surface-variant">
            Nexus Bank
          </span>
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
          <p className="font-body-sm text-body-sm text-on-surface-variant opacity-70">
            © 2024 Nexus Bank. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
