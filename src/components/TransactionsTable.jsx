// src/components/TransactionsTable.js
import React from "react";

function calculatePoints(amount) {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    points += amount - 50;
  }
  return points;
}

const TransactionsTable = ({ transactions }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Purchase Date</th>
            <th>Product Purchased</th>
            <th>Price ($)</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.transactionId}>
              <td>{txn.transactionId}</td>
              <td>{txn.customerName}</td>
              <td>{new Date(txn.date).toLocaleDateString()}</td>
              <td>{txn.product}</td>
              <td>{txn.amount}</td>
              <td>{calculatePoints(txn.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
