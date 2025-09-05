/**
 * API calls for transactions
 */

import { logRequest, logError, logResponse } from "./logger";

/**
 * Fetch transactions from the API.
 *
 * @async
 * @function fetchTransactions
 * @returns {Promise<Object[]>} A promise that resolves to an array of transaction objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchTransactions() {
  const url = "/db.json";
  try {
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
