"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Participant = {
  id: string;
  name: string;
  roll: string;
  score: number;
  timetaken: number;
};

export default function LeaderboardPage() {
  const [list, setList] = useState<Participant[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "participants"),
      orderBy("score", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Participant[] = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          name: d.name || "Anonymous",
          roll: d.roll || "-",
          score: d.score ?? 0,
          timetaken: d.timetaken ?? 0, // ✅ FIXED
        };
      });

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

        {list.length === 0 && (
          <p className="text-center text-purple-300">
            No participants yet
          </p>
        )}

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
                  {p.timetaken}s
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
