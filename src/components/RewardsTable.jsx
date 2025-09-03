import React, { useMemo } from "react";
import PropTypes from "prop-types";
import DataTable from "./DataTable/DataTable"; // ✅ updated path
import { calculatePoints } from "../utils/rewards";

// Data transformation logic
const transformRewardsData = (transactions) => {
  const monthlyRewards = [];
  const totalRewardsMap = {};

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

    if (!totalRewardsMap[txn.customerId]) {
      totalRewardsMap[txn.customerId] = {
        customerId: txn.customerId,
        customerName: txn.customerName,
        points: 0,
      };
    }
    totalRewardsMap[txn.customerId].points += points;
  });

  return {
    monthlyRewards,
    totalRewards: Object.values(totalRewardsMap),
  };
};

// Column configurations
const MONTHLY_COLUMNS = [
  { key: "customerId", label: "Customer ID" },
  { key: "customerName", label: "Customer Name" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
  { key: "points", label: "Reward Points" },
];

const TOTAL_COLUMNS = [
  { key: "customerId", label: "Customer ID" },
  { key: "customerName", label: "Customer Name" },
  { key: "points", label: "Total Reward Points" },
];

// Subsections
const MonthlyRewardsSection = ({ data }) => (
  <div>
    <h4>User Monthly Rewards</h4>
    <DataTable columns={MONTHLY_COLUMNS} data={data} />
  </div>
);

MonthlyRewardsSection.propTypes = {
  data: PropTypes.array.isRequired,
};

const TotalRewardsSection = ({ data }) => (
  <div>
    <h4 className="mt-5">Total Rewards</h4>
    <DataTable columns={TOTAL_COLUMNS} data={data} />
  </div>
);

TotalRewardsSection.propTypes = {
  data: PropTypes.array.isRequired,
};

/**
 * RewardsTable shows Monthly & Total rewards
 */
const RewardsTable = ({ transactions }) => {
  const { monthlyRewards, totalRewards } = useMemo(
    () => transformRewardsData(transactions),
    [transactions]
  );

  return (
    <div className="mt-4">
      <MonthlyRewardsSection data={monthlyRewards} />
      <TotalRewardsSection data={totalRewards} />
    </div>
  );
};

RewardsTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      customerName: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RewardsTable;
