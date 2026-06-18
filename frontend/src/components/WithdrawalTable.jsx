import React, { useEffect, useState } from "react";
import { useWithdrawalTrans } from "../hooks/useWithdrawalTrans";
import { formatAccountNumber } from "../util/formatAccNum";

export default function WithdrawalTable({ withdrawals = [] }) {

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-surface-container-low">
          <tr>
            <th className="px-lg py-sm font-label-md text-label-md text-on-surface-variant">
              Date
            </th>
            <th className="px-lg py-sm font-label-md text-label-md text-on-surface-variant">
              Description
            </th>
            <th className="px-lg py-sm font-label-md text-label-md text-on-surface-variant">
              Status
            </th>
            <th className="px-lg py-sm font-label-md text-label-md text-on-surface-variant text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {withdrawals && withdrawals.length > 0 ? (
            withdrawals.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-surface-container transition-colors cursor-pointer"
              >
                <td className="px-lg py-md">
                  <span className="font-body-sm text-body-sm">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-lg py-md">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg">
                      {item.description || "Withdrawal"}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.reference_number || `Account ID: ${item.source_account_id}`}
                    </span>
                  </div>
                </td>
                <td className="px-lg py-md">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full font-label-md text-[11px] font-bold capitalize ${item.status?.toLowerCase() === "completed" ? "bg-tertiary-container/20 text-tertiary" : "bg-secondary-container/20 text-secondary"}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-lg py-md text-right">
                  <span className="font-numeric-data text-on-surface">
                    ${item.amount?.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-lg">
                No Withdrawals
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
