import React, { useEffect, useState } from "react";
import { fetchTransactions } from "./services/api";
import TransactionsTable from "./components/TransactionsTable";
import RewardsTable from "./components/RewardsTable";
import Loader from "./components/Loader";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <ErrorBoundary>
      <div className="container mt-4">
        <h2>Transactions</h2>
        <TransactionsTable transactions={transactions} />

        <h2 className="mt-5">Rewards</h2>
        <RewardsTable transactions={transactions} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
