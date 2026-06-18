import React from "react";

export default function DepositTable({ deposits = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant/20">
            <th className="px-md py-4 font-label-lg text-label-lg text-on-surface">
              Date
            </th>
            <th className="px-md py-4 font-label-lg text-label-lg text-on-surface">
              Account
            </th>
            <th className="px-md py-4 font-label-lg text-label-lg text-on-surface text-right">
              Amount
            </th>
            <th className="px-md py-4 font-label-lg text-label-lg text-on-surface text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {deposits && deposits.length > 0 ? (
            deposits.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-surface-bright transition-colors cursor-pointer group hover:translate-x-1 duration-200"
              >
                <td className="px-md py-5 font-body-md text-body-md text-on-surface">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-md py-5 font-body-md text-body-md text-on-surface-variant">
                  {item.destination_account_id
                    ? `Account ID: ${item.destination_account_id}`
                    : item.reference_number}
                </td>
                <td className="px-md py-5 font-numeric-data text-numeric-data text-on-surface text-right">
                  ${item.amount.toFixed(2)}
                </td>
                <td className="px-md py-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full font-label-md text-label-md capitalize ${item.status?.toLowerCase() === "completed" ? "bg-tertiary-fixed text-on-tertiary-fixed-variant" : "bg-secondary-fixed text-on-secondary-fixed-variant"}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center py-lg font-body-md text-on-surface-variant"
              >
                No deposits yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
