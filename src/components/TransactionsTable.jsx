import React from "react";

function TransactionsTable({ transactions }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Customer</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.transactionId}>
            <td>{t.transactionId}</td>
            <td>{t.customerName}</td>
            <td>${t.amount}</td>
            <td>{t.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsTable;
