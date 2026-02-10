"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

type Participant = {
  id: string;
  name: string;
  roll: string;
  score: number;
  timeTaken: number;
};

export default function LeaderboardPage() {
  const [list, setList] = useState<Participant[]>([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(
      collection(db, "participants"),
      orderBy("score", "desc"),
      orderBy("timeTaken", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || "Anonymous",
        roll: doc.data().roll || "-",
        score: doc.data().score ?? 0,
        timeTaken: doc.data().timeTaken ?? 0,
      }));
      setList(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-[#0f0617] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">

        <h1 className="text-3xl font-bold text-center mb-6">
          🏆 Live Leaderboard
        </h1>

        {/* ✅ RESULT BUTTON */}
        <button
          onClick={() => router.push("/result")}
          className="mb-6 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
        >
          🎓 View My Result & Certificate
        </button>

        <div className="space-y-3">
          {list.map((p, i) => (
            <div
              key={p.id}
              className={`flex justify-between items-center p-4 rounded-xl
                ${
                  i === 0
                    ? "bg-yellow-500/30"
                    : i === 1
                    ? "bg-gray-400/30"
                    : i === 2
                    ? "bg-orange-600/30"
                    : "bg-white/10"
                }`}
            >
              <div>
                <p className="font-semibold">
                  #{i + 1} {p.name}
                </p>
                <p className="text-xs text-purple-300">
                  Roll: {p.roll}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  {p.score}/10
                </p>
                <p className="text-xs text-purple-300">
                  {p.timeTaken}s
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
