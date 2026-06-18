import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavBar from "../components/TopNavBar";
import { accountService } from "../services/accountService.js";
import TransactionTable from "../components/TransactionTable.jsx";
export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [txType, setTxType] = useState("All Transactions");
  const [search, setSearch] = useState("");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const offset = (page - 1) * limit;
      const filters = {};
      if (startDate) filters.start_date = startDate;
      if (endDate) filters.end_date = endDate;
      if (txType && txType !== "All Transactions") {
        if (txType === "Withdraw") filters.tx_type = "withdrawal";
        else filters.tx_type = txType.toLowerCase();
      }
      if (search) filters.search = search;

      const response = await accountService.get_transactions(limit, offset, filters);
      setTransactions(response.data.transactions);
      setTotalCount(response.data.total_count);
    } catch (error) {
      setError(error.message);
      console.log("Error fetching Transactions");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, [page, startDate, endDate, txType, search]);

  const totalPages = Math.ceil(totalCount / limit) || 1;

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading) return <div className="p-8">Loading transactions...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="font-body-md text-body-md bg-background text-on-surface min-h-screen">
      <Sidebar />

      {/* Main Content Area */}
      <main className="lg:ml-64 min-h-screen">
        <TopNavBar title="Transactions" />

        <div className="max-w-container-max mx-auto p-margin-desktop space-y-lg">
          {/* Header Section */}
          <div className="mb-lg flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-background mb-2">
                Transaction History
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Manage and review your complete financial activity.
              </p>
            </div>
            <div className="flex gap-sm">
              <button className="flex items-center gap-2 px-md py-2 border border-outline-variant rounded-lg font-label-lg text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  download
                </span>{" "}
                Export PDF
              </button>
              <button className="flex items-center gap-2 px-md py-2 bg-primary text-on-primary rounded-lg font-label-lg hover:brightness-110 transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px]">
                  add
                </span>{" "}
                New Transaction
              </button>
            </div>
          </div>

          {/* Filters Section: Bento Grid Style */}
          <section className="mb-md grid grid-cols-1 lg:grid-cols-4 gap-md">
            {/* Search & Filters Container */}
            <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md shadow-[0px_4px_12px_rgba(10,37,64,0.05)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md items-end">
                {/* Date Range */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-wider">
                    Start Date
                  </label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-body-sm focus:ring-2 focus:ring-primary outline-none"
                    type="date"
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-wider">
                    End Date
                  </label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-body-sm focus:ring-2 focus:ring-primary outline-none"
                    type="date"
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
                  />
                </div>
                {/* Type Filter */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-wider">
                    Transaction Type
                  </label>
                  <select 
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-body-sm focus:ring-2 focus:ring-primary appearance-none cursor-pointer outline-none"
                    value={txType}
                    onChange={(e) => { setTxType(e.target.value); setPage(1); }}
                  >
                    <option>All Transactions</option>
                    <option>Deposit</option>
                    <option>Withdraw</option>
                    <option>Transfer</option>
                  </select>
                </div>
                {/* Search Input */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-wider">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-low border-none rounded-lg p-3 pr-10 text-body-sm focus:ring-2 focus:ring-primary outline-none"
                      placeholder="Merchant or ID..."
                      type="text"
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    />
                    <span className="material-symbols-outlined absolute right-3 top-3 text-outline text-[20px]">
                      search
                    </span>
                  </div>
                </div>
              </div>
              {/* Active Filters Chips */}
              {(startDate || endDate || txType !== "All Transactions" || search) && (
                <div className="mt-md flex flex-wrap gap-sm pt-4 border-t border-outline-variant/10">
                  {txType !== "All Transactions" && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-label-md flex items-center gap-1">
                      Type: {txType}
                      <button onClick={() => { setTxType("All Transactions"); setPage(1); }} className="hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                  )}
                  {(startDate || endDate) && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-label-md flex items-center gap-1">
                      Date Range
                      <button onClick={() => { setStartDate(""); setEndDate(""); setPage(1); }} className="hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                  )}
                  {search && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-label-md flex items-center gap-1">
                      Search: {search}
                      <button onClick={() => { setSearch(""); setPage(1); }} className="hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                  )}
                  <button 
                    onClick={() => { setStartDate(""); setEndDate(""); setTxType("All Transactions"); setSearch(""); setPage(1); }} 
                    className="text-primary font-label-md hover:underline transition-all outline-none"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Transaction Table Section */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(10,37,64,0.05)]">
            <TransactionTable transactions={transactions} />
            {/* Pagination Controls */}
            <div className="px-md py-md flex flex-col md:flex-row items-center justify-between gap-md border-t border-outline-variant/10">
              <p className="font-body-sm text-on-surface-variant">
                Showing{" "}
                <span className="font-bold text-on-background">
                  {totalCount === 0 ? 0 : (page - 1) * limit + 1}-{Math.min(page * limit, totalCount)}
                </span>{" "}
                of{" "}
                <span className="font-bold text-on-background">{totalCount}</span>{" "}
                transactions
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="p-2 border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-colors disabled:opacity-30 outline-none"
                >
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary rounded-lg font-label-lg shadow-sm">
                  {page}
                </button>
                <span className="px-2 text-on-surface-variant">of {totalPages}</span>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="p-2 border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-colors disabled:opacity-30 outline-none"
                >
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="w-full bg-surface-container-lowest py-md border-t border-outline-variant/20 mt-xl">
          <div className="px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-md max-w-container-max mx-auto">
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
          </div>
        </footer>
      </main>
    </div>
  );
}
