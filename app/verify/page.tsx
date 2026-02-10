"use client";

import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function VerifyPage() {
  const [roll, setRoll] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyCertificate = async () => {
    if (!roll) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const q = query(
        collection(db, "participants"),
        where("roll", "==", roll)
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        setError("❌ Certificate not found");
      } else {
        setResult(snap.docs[0].data());
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0617] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 text-center">

        <h1 className="text-2xl font-bold mb-4">
          🎓 Certificate Verification
        </h1>

        <p className="text-sm text-purple-300 mb-6">
          NSS International Women’s Day Quiz
        </p>

        <input
          type="text"
          placeholder="Enter Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 mb-4 focus:outline-none"
        />

        <button
          onClick={verifyCertificate}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
        >
          {loading ? "Verifying..." : "Verify Certificate"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-6 bg-green-500/20 p-4 rounded-xl text-left">
            <p className="font-semibold text-green-300">✅ Verified</p>
            <p>Name: {result.name}</p>
            <p>Roll: {result.roll}</p>
            <p>Score: {result.score}</p>
            <p>Time Taken: {result.timeTaken}s</p>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-500/20 p-4 rounded-xl">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
