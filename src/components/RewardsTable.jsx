import React, { useMemo } from "react";
import PropTypes from "prop-types";
import DataTable from "./DataTable/DataTable"; // ✅ updated path
import { calculatePoints } from "../utils/rewards";

// Data transformation logic
const transformRewardsData = (transactions) => {
  const monthlyRewardsMap = {};
  const totalRewardsMap = {};

  transactions.forEach((txn) => {
    const dateObj = new Date(txn.date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear();
    const monthYear = `${month} ${year}`;
    const points = calculatePoints(txn.amount);

    // Create a unique key for customer-month-year combination
    const monthlyKey = `${txn.customerId}-${monthYear}`;

    // Aggregate monthly rewards
    if (!monthlyRewardsMap[monthlyKey]) {
      monthlyRewardsMap[monthlyKey] = {
        customerId: txn.customerId,
        customerName: txn.customerName,
        monthYear,
        points: 0,
        originalDate: txn.date, // Use first transaction date for this month
      };
    }
    monthlyRewardsMap[monthlyKey].points += points;

    // Update to earliest date for this month (better for filtering)
    if (
      new Date(txn.date) < new Date(monthlyRewardsMap[monthlyKey].originalDate)
    ) {
      monthlyRewardsMap[monthlyKey].originalDate = txn.date;
    }

    // Aggregate total rewards
    if (!totalRewardsMap[txn.customerId]) {
      totalRewardsMap[txn.customerId] = {
        customerId: txn.customerId,
        customerName: txn.customerName,
        points: 0,
        originalDate: txn.date, // Use the first transaction date for this customer
      };
    }
    totalRewardsMap[txn.customerId].points += points;

    // Update to the latest transaction date for this customer
    if (
      new Date(txn.date) >
      new Date(totalRewardsMap[txn.customerId].originalDate)
    ) {
      totalRewardsMap[txn.customerId].originalDate = txn.date;
    }
  });

  return {
    monthlyRewards: Object.values(monthlyRewardsMap),
    totalRewards: Object.values(totalRewardsMap),
  };
};

// Column configurations
const MONTHLY_COLUMNS = [
  { key: "customerId", label: "Customer ID" },
  { key: "customerName", label: "Customer Name" },
  { key: "monthYear", label: "Month Year" },
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
 * RewardsTable component displays monthly and total rewards for customers.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.transactions - List of transactions to calculate rewards from.
 * @returns {JSX.Element} Rendered RewardsTable component.
 */
const RewardsTable = ({ transactions }) => {
  const { monthlyRewards, totalRewards } = useMemo(
    () => transformRewardsData(transactions),
    [transactions]
  );

  return (
    <div className="mt-4 mb-5">
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
