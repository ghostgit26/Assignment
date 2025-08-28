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

    if (!rewards[t.customerId]) {
      rewards[t.customerId] = {
        id: t.customerId,
        name: t.customerName,
        total: 0,
      };
    }

    if (!rewards[t.customerId][month]) rewards[t.customerId][month] = 0;

    rewards[t.customerId][month] += points;
    rewards[t.customerId].total += points;
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
          <th>Customer ID</th>
          <th>Customer Name</th>
          {months.map((m) => (
            <th key={m}>{m}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(rewards).map((data) => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
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
