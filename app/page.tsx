'use client'

import { useState } from "react";

export default function Home() {
  const [price, setPrice] = useState("");
  const [rent, setRent] = useState("");
  const [expenses, setExpenses] = useState("");
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
   const res = await fetch("https://deal-analyzer-backend.onrender.com/analyze", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: Number(price),
        rent: Number(rent),
        expenses: Number(expenses),
      }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <main className="p-10 space-y-4">
      <h1 className="text-3xl font-bold">Deal Analyzer</h1>

      <input placeholder="Purchase Price" className="border p-2 w-full" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Monthly Rent" className="border p-2 w-full" onChange={e => setRent(e.target.value)} />
      <input placeholder="Monthly Expenses" className="border p-2 w-full" onChange={e => setExpenses(e.target.value)} />

      <button onClick={analyze} className="bg-black text-white px-4 py-2">Analyze</button>

      {result && (
        <div className="mt-4">
          <p>Cashflow: ${result.cashflow}</p>
          <p>Verdict: {result.verdict}</p>
        </div>
      )}
    </main>
  );
}
