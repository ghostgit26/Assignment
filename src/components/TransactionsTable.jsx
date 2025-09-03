// TransactionsTable.js
import DataTable from "./DataTable";
import { calculatePoints } from "../utils/rewards";

/**
 * Transactions table with rewards points
 */
const TransactionsTable = ({ transactions }) => {
  const transactionsWithPoints = transactions.map((txn) => ({
    transactionId: txn.transactionId,
    customerName: txn.customerName,
    date: new Date(txn.date).toLocaleDateString(),
    product: txn.product,
    amount: txn.amount,
    points: calculatePoints(txn.amount),
  }));

  const columns = [
    { key: "transactionId", label: "Transaction ID" },
    { key: "customerName", label: "Customer Name" },
    { key: "date", label: "Purchase Date" },
    { key: "product", label: "Product Purchased" },
    { key: "amount", label: "Price ($)" },
    { key: "points", label: "Reward Points" },
  ];

  return <DataTable columns={columns} data={transactionsWithPoints} />;
};

export default TransactionsTable;
