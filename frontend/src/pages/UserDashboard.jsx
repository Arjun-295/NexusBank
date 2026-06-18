import React, { use, useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavBar from "../components/TopNavBar";
import { accountService } from "../services/accountService.js";
import { formatAccountNumber } from "../util/formatAccNum.js";
import { useTransactions } from "../hooks/useTransactions.js";
import { useTotalBalance } from "../hooks/useTotalBalance.js";
import TransactionTable from "../components/TransactionTable.jsx";
import AIInsights from "../components/AIInsights.jsx";
export default function UserDashboard() {
  const [accountNumber, setAccountNumber] = useState(0);
  const [balance, setBalance] = useState(0);

  {
    /**Handle Details in User Dashboard */
  }
  const {
    balance: totalBalance,
    accountNumber: acctNum,
    loading: balLoading,
  } = useTotalBalance();

  useEffect(() => {
    if (acctNum) setAccountNumber(formatAccountNumber(acctNum));
    if (typeof totalBalance !== "undefined") setBalance(totalBalance);
  }, [acctNum, totalBalance]);

  const {
    transactions: recentTransactions,
    loading: txLoading,
    error: txError,
    refresh: refreshTx,
  } = useTransactions(5, 0);

  console.log(recentTransactions);

  return (
    <div className="font-body-md text-body-md bg-background text-on-surface min-h-screen">
      <Sidebar />

      {/* Main Content Area */}
      <main className="lg:ml-64 min-h-screen">
        <TopNavBar title="Dashboard" />

        <div className="max-w-container-max mx-auto p-margin-desktop space-y-lg">
          {/* Bento Grid Section 1: Balance & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Account Summary Card (Large) */}
            <div className="lg:col-span-8 bg-primary rounded-xl p-md text-on-primary shadow-xl relative overflow-hidden group hover:-translate-y-[2px] transition-transform duration-300">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="font-label-lg text-label-lg opacity-80 mb-1">
                      Total Available Balance
                    </p>
                    <h3 className="font-display-lg text-display-lg tracking-tight">
                      {`${balance} Rs`}
                    </h3>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <span
                      className="material-symbols-outlined text-3xl"
                      data-icon="account_balance"
                    >
                      account_balance
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="font-label-md text-label-md opacity-60">
                      Account Number
                    </p>
                    <p className="font-numeric-data text-numeric-data tracking-widest">
                      {accountNumber}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-on-tertiary-container/20 px-3 py-1 rounded-full flex items-center gap-1 border border-on-tertiary-container/30">
                      <span
                        className="material-symbols-outlined text-sm"
                        data-icon="trending_up"
                      >
                        trending_up
                      </span>
                      <span className="font-label-md text-label-md text-on-tertiary-container">
                        +2.4%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative Background Element */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            </div>

            {/* Quick Actions Card */}
            <div className="lg:col-span-4 bg-white rounded-xl p-md border border-outline-variant shadow-[0px_4px_12px_rgba(10,37,64,0.05)] flex flex-col justify-between hover:-translate-y-[2px] transition-transform duration-300">
              <h4 className="font-headline-md text-headline-md text-on-surface mb-6">
                Quick Actions
              </h4>
              <div className="space-y-3">
                <Link to="/deposit">
                  <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-[0.98]">
                    <span
                      className="material-symbols-outlined"
                      data-icon="add_circle"
                    >
                      add_circle
                    </span>
                    Deposit Funds
                  </button>
                </Link>
                <Link to="/withdraw">
                  <button className="w-full border border-primary text-primary py-4 mt-3 rounded-lg font-label-lg flex items-center justify-center gap-2 hover:bg-primary/5 transition-all active:scale-[0.98]">
                    <span
                      className="material-symbols-outlined"
                      data-icon="arrow_circle_up"
                    >
                      arrow_circle_up
                    </span>
                    Withdraw
                  </button>
                </Link>
                <Link to="/transfer">
                  <button className="w-full border border-primary text-primary py-4 mt-3 rounded-lg font-label-lg flex items-center justify-center gap-2 hover:bg-primary/5 transition-all active:scale-[0.98]">
                    <span
                      className="material-symbols-outlined"
                      data-icon="swap_horiz"
                    >
                      swap_horiz
                    </span>
                    Transfer Money
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bento Grid Section 2: Transactions & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* AI Insights Widget */}
            <div className="lg:col-span-12 bg-white rounded-xl border border-outline-variant shadow-[0px_4px_12px_rgba(10,37,64,0.05)] overflow-hidden hover:-translate-y-[2px] transition-transform duration-300">
              <div className="p-md flex justify-between items-center border-b border-outline-variant/30 bg-primary/5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" data-icon="auto_awesome">auto_awesome</span>
                  <h4 className="font-headline-md text-headline-md text-on-surface">
                    Omni AI Financial Insights
                  </h4>
                </div>
              </div>
              <AIInsights />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full py-md px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-md max-w-container-max mx-auto border-t border-outline-variant/10 mt-xl">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2024 Nexus Bank. All rights reserved.
          </p>
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

      {/* Visual Polish: Background Aura */}
      <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
