import React, { useMemo } from "react";
import PropTypes from "prop-types";
import DataTable from "./DataTable/DataTable"; // ✅ updated path
import { calculatePoints } from "../utils/rewards";

// Data transformation logic
const transformTransactionData = (transactions) => {
  return transactions.map((txn) => ({
    transactionId: txn.transactionId,
    customerName: txn.customerName,
    date: new Date(txn.date).toLocaleDateString(),
    product: txn.product,
    amount: txn.amount,
    points: calculatePoints(txn.amount),
  }));
};

// Column configuration
const TRANSACTION_COLUMNS = [
  { key: "transactionId", label: "Transaction ID" },
  { key: "customerName", label: "Customer Name" },
  { key: "date", label: "Purchase Date" },
  { key: "product", label: "Product Purchased" },
  { key: "amount", label: "Price ($)" },
  { key: "points", label: "Reward Points" },
];

/**
 * Transactions table with rewards points
 */
const TransactionsTable = ({ transactions }) => {
  const transactionsWithPoints = useMemo(
    () => transformTransactionData(transactions),
    [transactions]
  );

  return (
    <DataTable columns={TRANSACTION_COLUMNS} data={transactionsWithPoints} />
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      customerName: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
      product: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionsTable;
