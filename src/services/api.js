/**
 * API calls for transactions
 */
export async function fetchTransactions() {
  try {
    const res = await fetch(
      "https://68b73ee873b3ec66cec42e96.mockapi.io/transactions/transactions"
    );
    if (!res.ok) throw new Error("Failed to fetch transactions");
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
