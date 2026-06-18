import React from "react";
import { formatDate } from "../util/formatData.js";
import { getTypeIcon, getStatusColor } from "../util/colAndIcon.js";

export default function TransactionTable({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-12 text-on-surface-variant">
        <p className="font-body-lg">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low/50 border-b border-outline-variant/20">
            <th className="px-md py-4 font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
              Date
            </th>
            <th className="px-md py-4 font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
              Description
            </th>
            <th className="px-md py-4 font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
              Type
            </th>
            <th className="px-md py-4 font-label-lg text-label-lg text-on-surface uppercase tracking-wider text-center">
              Status
            </th>
            <th className="px-md py-4 font-label-lg text-label-lg text-on-surface uppercase tracking-wider text-center">
              Risk Level
            </th>
            <th className="px-md py-4 font-label-lg text-label-lg text-on-surface uppercase tracking-wider text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {transactions.map((txn) => {
            const { date, time } = formatDate(txn.created_at);
            return (
              <tr
                key={txn.id}
                className="hover:bg-primary/5 transition-colors group"
              >
                <td className="px-md py-5">
                  <p className="font-body-md text-on-background">{date}</p>
                  <p className="text-label-md text-on-surface-variant">{time}</p>
                </td>
                <td className="px-md py-5">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        {getTypeIcon(txn.type)}
                      </span>
                    </div>
                    <div>
                      <p className="font-body-md text-on-background">
                        {txn.description}
                      </p>
                      {txn.reference_number && (
                        <p className="text-label-md text-on-surface-variant">
                          {txn.reference_number}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-md py-5">
                  <span className="capitalize font-label-md text-on-surface">
                    {txn.type}
                  </span>
                </td>
                <td className="px-md py-5">
                  <div className="flex justify-center">
                    <span
                      className={`px-3 py-1 rounded-full text-label-md font-semibold capitalize flex items-center gap-1 ${getStatusColor(txn.status)}`}
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        check_circle
                      </span>
                      {txn.status}
                    </span>
                  </div>
                </td>
                <td className="px-md py-5">
                  <div className="flex justify-center">
                    <span
                      className={`px-3 py-1 rounded-full text-label-md font-semibold capitalize flex items-center gap-1 ${
                        txn.risk_level === 'Normal' ? 'bg-success/20 text-success' :
                        txn.risk_level === 'Suspicious' ? 'bg-[#FF9800]/20 text-[#FF9800]' :
                        txn.risk_level === 'High Risk' ? 'bg-error/20 text-error' :
                        'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {txn.risk_level === 'Normal' ? 'security' : txn.risk_level === 'Suspicious' ? 'warning' : 'gpp_bad'}
                      </span>
                      {txn.risk_level || 'Normal'}
                    </span>
                  </div>
                </td>
                <td
                  className={`px-md py-5 text-right font-label-lg font-bold ${txn.direction === "out" ? "text-error" : "text-success"}`}
                >
                  {txn.direction === "out" ? "-" : "+"}₹
                  {Number(txn.amount).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
