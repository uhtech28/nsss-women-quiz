"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { quizQuestions } from "../data/quiz";

const TOTAL_TIME = 300; // 5 minutes

export default function QuizPage() {
  const router = useRouter();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const submittedRef = useRef(false);

  const question = quizQuestions[current];

  /* ⏳ TIMER */
  useEffect(() => {
    if (isSubmitting || timeLeft <= 0) return;

    timerRef.current = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isSubmitting]);

  /* ⏰ AUTO SUBMIT */
  useEffect(() => {
    if (timeLeft === 0) submitQuiz();
  }, [timeLeft]);

  /* ✅ SUBMIT QUIZ */
  const submitQuiz = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    setIsSubmitting(true);
    if (timerRef.current) clearTimeout(timerRef.current);

    const timetaken = TOTAL_TIME - timeLeft; // ✅ MATCH FIRESTORE

    // Save locally
    localStorage.setItem("quizScore", score.toString());
    localStorage.setItem("timeTaken", timetaken.toString());

    // 🚀 Redirect immediately
    router.replace("/leaderboard");

    // 🔥 Firestore write (background, non-blocking)
    addDoc(collection(db, "participants"), {
      name: localStorage.getItem("name"),
      roll: localStorage.getItem("roll"),
      score,
      timetaken, // ✅ FIXED
      submittedAt: serverTimestamp(),
    }).catch(() => {
      console.warn("Firestore write failed (ignored)");
    });
  };

  /* ▶ NEXT / FINISH */
  const handleNext = () => {
    if (selected === question.answer) {
      setScore((s) => s + 1);
    }

    setSelected(null);

    if (current + 1 < quizQuestions.length) {
      setCurrent((c) => c + 1);
    } else {
      submitQuiz();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0617] via-[#1a0b2e] to-[#2a0f45]">
      <div className="w-full max-w-2xl rounded-3xl bg-white/10 backdrop-blur-2xl p-8 border border-white/20 text-white">

        <div className="flex justify-between mb-4 text-sm text-purple-300">
          <span>Q {current + 1}/{quizQuestions.length}</span>
          <span>
            ⏳ {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-6">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              disabled={isSubmitting}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border
                ${
                  selected === i
                    ? "bg-purple-600 border-purple-400"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null || isSubmitting}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 py-3 font-semibold disabled:opacity-50"
        >
          {isSubmitting
            ? "Submitting..."
            : current + 1 === quizQuestions.length
            ? "Finish Quiz"
            : "Next"}
        </button>
      </div>
    </main>
  );
}
