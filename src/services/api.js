/**
 * API calls for transactions
 */

import { logRequest, logError, logResponse } from "./logger";
export async function fetchTransactions() {
  const url = "/db.json";
  try {
    //mock api with data
    // const res = await fetch(
    //   "https://68b73ee873b3ec66cec42e96.mockapi.io/transactions/transactions"
    // );

    //fetching from db.json
    logRequest(url);
    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch transactions");
    const data = await res.json();
    logResponse(url, data);
    return data.transactions;
  } catch (error) {
    logError(url, error);
    throw error;
  }
}
