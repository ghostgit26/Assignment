// src/components/RewardsTable.js
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

function groupRewards(transactions) {
  const monthlyRewards = [];
  const totalRewards = {};

  transactions.forEach((txn) => {
    const dateObj = new Date(txn.date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear();
    const points = calculatePoints(txn.amount);

    // Monthly entry
    monthlyRewards.push({
      customerId: txn.customerId,
      customerName: txn.customerName,
      month,
      year,
      points,
    });

    // Total
    if (!totalRewards[txn.customerId]) {
      totalRewards[txn.customerId] = {
        customerId: txn.customerId,
        customerName: txn.customerName,
        points: 0,
      };
    }
    totalRewards[txn.customerId].points += points;
  });

  return {
    monthlyRewards,
    totalRewards: Object.values(totalRewards),
  };
}

const RewardsTable = ({ transactions }) => {
  const { monthlyRewards, totalRewards } = groupRewards(transactions);

  return (
    <div className="mt-4">
      <h4>User Monthly Rewards</h4>
      <div className="table-responsive mb-5">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {monthlyRewards.map((row, idx) => (
              <tr key={idx}>
                <td>{row.customerId}</td>
                <td>{row.customerName}</td>
                <td>{row.month}</td>
                <td>{row.year}</td>
                <td>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Total Rewards</h4>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Total Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {totalRewards.map((row, idx) => (
              <tr key={idx}>
                <td>{row.customerId}</td>
                <td>{row.customerName}</td>
                <td>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RewardsTable;
