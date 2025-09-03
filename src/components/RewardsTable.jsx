// RewardsTable.js
import React from "react";
import DataTable from "./DataTable";
import { calculatePoints } from "../utils/rewards";

/**
 * Group rewards data by monthly & total
 */
function groupRewards(transactions) {
  const monthlyRewards = [];
  const totalRewards = {};

  transactions.forEach((txn) => {
    const dateObj = new Date(txn.date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear();
    const points = calculatePoints(txn.amount);

    monthlyRewards.push({
      customerId: txn.customerId,
      customerName: txn.customerName,
      month,
      year,
      points,
    });

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

/**
 * RewardsTable shows Monthly & Total rewards
 */
const RewardsTable = ({ transactions }) => {
  const { monthlyRewards, totalRewards } = groupRewards(transactions);

  const monthlyColumns = [
    { key: "customerId", label: "Customer ID" },
    { key: "customerName", label: "Customer Name" },
    { key: "month", label: "Month" },
    { key: "year", label: "Year" },
    { key: "points", label: "Reward Points" },
  ];

  const totalColumns = [
    { key: "customerId", label: "Customer ID" },
    { key: "customerName", label: "Customer Name" },
    { key: "points", label: "Total Reward Points" },
  ];

  return (
    <div className="mt-4">
      <h4>User Monthly Rewards</h4>
      <DataTable columns={monthlyColumns} data={monthlyRewards} />

      <h4 className="mt-5">Total Rewards</h4>
      <DataTable columns={totalColumns} data={totalRewards} />
    </div>
  );
};

export default RewardsTable;
