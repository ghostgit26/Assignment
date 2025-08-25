export async function fetchTransactions() {
  const res = await fetch("http://localhost:5000/transactions");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
