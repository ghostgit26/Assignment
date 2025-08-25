import React from "react";

function calculatePoints(amount) {
  let points = 0;
  if (amount > 100) points += (amount - 100) * 2 + 50;
  else if (amount > 50) points += amount - 50;
  return points;
}

function RewardsTable({ transactions }) {
  const rewards = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const points = calculatePoints(t.amount);
    if (!rewards[t.customerName]) rewards[t.customerName] = {};
    if (!rewards[t.customerName][month]) rewards[t.customerName][month] = 0;
    rewards[t.customerName][month] += points;
    if (!rewards[t.customerName].total) rewards[t.customerName].total = 0;
    rewards[t.customerName].total += points;
  });

  const months = [
    ...new Set(
      transactions.map((t) =>
        new Date(t.date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      )
    ),
  ];

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Customer</th>
          {months.map((m) => (
            <th key={m}>{m}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(rewards).map(([name, data]) => (
          <tr key={name}>
            <td>{name}</td>
            {months.map((m) => (
              <td key={m}>{data[m] || 0}</td>
            ))}
            <td>{data.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RewardsTable;
