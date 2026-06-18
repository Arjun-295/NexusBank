import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavBar from "../components/TopNavBar";

import { useState } from "react";
import { accountService } from "../services/accountService";
import { useTotalBalance } from "../hooks/useTotalBalance";
import { formatAccountNumber } from "../util/formatAccNum";
import DepositTable from "../components/DepositTable";

export default function DepositMoney() {
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  React.useEffect(() => {
    accountService.account_details().then((res) => {
      const fetchedAccounts = res.data.accounts || [];
      setAccounts(fetchedAccounts);
      if (fetchedAccounts.length > 0) {
        setAccountId(fetchedAccounts[0].id);
      }
    }).catch(console.error);

    fetchDeposits();
  }, []);

  const fetchDeposits = () => {
    accountService.get_transactions(50, 0).then((res) => {
      const allTx = res.data.transactions || [];
      const depositTx = allTx.filter(tx => tx.type === "deposit");
      setDeposits(depositTx);
    }).catch(console.error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      setLoading(true);
      const num = parseFloat(amount);
      if (isNaN(num) || num <= 0) {
        setMessage({ type: "error", text: "Enter a valid amount" });
        return;
      }
      const res = await accountService.deposit(num, parseInt(accountId));
      setMessage({ type: "success", text: "Deposit successful" });
      setAmount("");
      fetchDeposits();
      // Optionally refresh account details or transactions here
    } catch (err) {
      console.error(err);
      const text =
        err.response?.data?.detail || err.message || "Deposit failed";
      setMessage({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  const { balance, accountNumber, loading: balLoading } = useTotalBalance();

  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen">
      <Sidebar />

      {/* Main Content Area */}
      <main className="lg:ml-64 min-h-screen">
        <TopNavBar
          title="Deposit Money"
          subtitle="Add funds to your secure accounts"
        />

        <div className="px-margin-desktop py-lg max-w-[1000px] mx-auto">
          {/* Deposit Card (Bento Style) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <section className="md:col-span-7 bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_12px_rgba(10,37,64,0.05)] border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <span
                    className="material-symbols-outlined text-primary"
                    data-icon="add_card"
                  >
                    add_card
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  New Deposit
                </h3>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="font-label-lg text-label-lg text-on-surface-variant">
                    Select Account
                  </label>
                  <div className="relative group">
                    <select
                      value={accountId}
                      onChange={(e) => setAccountId(e.target.value)}
                      className="w-full bg-[#F8FAFC] border-none rounded-lg px-4 py-4 font-body-md text-on-surface appearance-none focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    >
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>
                          {acc.account_type.toUpperCase()} - {acc.account_number} (${acc.balance})
                        </option>
                      ))}
                    </select>
                    <span
                      className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
                      data-icon="expand_more"
                    >
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label-lg text-label-lg text-on-surface-variant">
                    Deposit Amount
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-numeric-data text-on-surface-variant">
                      $
                    </span>
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-[#F8FAFC] border-none rounded-lg pl-8 pr-4 py-4 font-numeric-data text-headline-md focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="0.00"
                      step="0.01"
                      type="number"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-3 py-1 bg-surface-container text-primary font-label-md text-label-md rounded-full hover:bg-primary hover:text-on-primary transition-colors outline-none"
                      type="button"
                    >
                      +$100
                    </button>
                    <button
                      className="px-3 py-1 bg-surface-container text-primary font-label-md text-label-md rounded-full hover:bg-primary hover:text-on-primary transition-colors outline-none"
                      type="button"
                    >
                      +$500
                    </button>
                    <button
                      className="px-3 py-1 bg-surface-container text-primary font-label-md text-label-md rounded-full hover:bg-primary hover:text-on-primary transition-colors outline-none"
                      type="button"
                    >
                      +$1,000
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-surface-container-low rounded-lg flex items-start gap-3">
                  <span
                    className="material-symbols-outlined text-primary text-body-lg"
                    data-icon="info"
                  >
                    info
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Funds deposited via internal transfer are available
                    immediately. External bank transfers may take 1-3 business
                    days.
                  </p>
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 outline-none"
                >
                  <span
                    className="material-symbols-outlined"
                    data-icon="account_balance_wallet"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    account_balance_wallet
                  </span>
                  {loading ? "Depositing..." : "Deposit Funds"}
                </button>
              </form>
              {message && (
                <div
                  className={`mt-4 p-3 rounded ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
                >
                  {message.text}
                </div>
              )}
            </section>

            {/* Information/Status Area (Side Bento) */}
            <aside className="md:col-span-5 space-y-gutter">
              <div className="bg-primary text-on-primary p-md rounded-xl shadow-lg shadow-primary/10 overflow-hidden relative">
                <div className="relative z-10">
                  <p className="font-label-md text-label-md text-on-primary/80 uppercase tracking-wider mb-2">
                    Total Balance
                  </p>
                  <h4 className="font-display-lg text-display-lg mb-6">
                    {balLoading ? "Loading..." : `$${balance}`}
                  </h4>
                  <div className="flex items-center gap-2 text-on-tertiary-container bg-tertiary px-3 py-1 rounded-full w-fit">
                    <span
                      className="material-symbols-outlined text-body-sm"
                      data-icon="trending_up"
                    >
                      trending_up
                    </span>
                    <span className="font-label-md text-label-md">
                      {accountNumber ? formatAccountNumber(accountNumber) : "—"}
                    </span>
                  </div>
                </div>
                {/* Abstract decorative circle */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              </div>

              <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/10 shadow-[0px_4px_12px_rgba(10,37,64,0.05)]">
                <h4 className="font-label-lg text-label-lg text-on-surface mb-4">
                  Security Insights
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-tertiary-fixed-dim rounded-full"></div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      256-bit AES Encryption Active
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-tertiary-fixed-dim rounded-full"></div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      FDIC Insured up to $250k
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-tertiary-fixed-dim rounded-full"></div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Fraud detection monitoring
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Recent Deposit History */}
          <section className="mt-xl">
            <div className="flex justify-between items-end mb-md">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Recent Deposit History
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Your transaction records from the last 30 days
                </p>
              </div>
              <button className="text-primary font-label-lg text-label-lg flex items-center gap-1 hover:underline outline-none">
                View Statement
                <span
                  className="material-symbols-outlined text-body-md"
                  data-icon="open_in_new"
                >
                  open_in_new
                </span>
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_12px_rgba(10,37,64,0.05)] border border-outline-variant/10 overflow-hidden">
              <DepositTable deposits={deposits} />
            </div>
          </section>
        </div>

        {/* Footer Integration */}
        <footer className="w-full py-md px-margin-desktop mt-xl flex flex-col md:flex-row justify-between items-center gap-md max-w-container-max mx-auto border-t border-outline-variant/10">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="font-label-lg text-label-lg font-bold text-on-surface">
              Nexus Bank
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              © 2024 Nexus Bank. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
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
      </main>
    </div>
  );
}
