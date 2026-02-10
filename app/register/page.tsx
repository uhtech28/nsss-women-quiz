"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Petals from "../components/Petals";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");

  const handleSubmit = () => {
    if (!name || !roll) {
      alert("Please fill all details");
      return;
    }
    localStorage.setItem("name", name);
    localStorage.setItem("roll", roll);
    router.push("/quiz");
  };

  return (
    <main
      className="
        relative min-h-screen flex items-center justify-center overflow-hidden px-4
        bg-gradient-to-br from-[#0f0617] via-[#1a0b2e] to-[#2a0f45]
      "
    >
      {/* 🌸 PETALS */}
      <Petals />

      {/* ✨ GLOW ORBS */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl z-[2]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl z-[2]" />

      {/* 💎 CARD */}
      <div
        className="
          relative z-10 w-full max-w-md rounded-3xl
          bg-[#1c102b]/80
          backdrop-blur-xl
          border border-white/20
          shadow-[0_40px_120px_rgba(0,0,0,0.65)]
          p-8 text-center
          animate-fade-up

        "
      >
        {/* ICON */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-xl">
          <span className="text-2xl">📝</span>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-white">
          Participant Registration
        </h1>

        <p className="mt-2 text-md text-purple-200">
          International Day of Women and Girls in science 
        </p>

        {/* INPUTS */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full rounded-xl px-4 py-3
              bg-white/10 text-white
              placeholder-purple-300
              border border-white/20
              focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          />

          <input
            type="text"
            placeholder="Roll Number"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            className="
              w-full rounded-xl px-4 py-3
              bg-white/10 text-white
              placeholder-purple-300
              border border-white/20
              focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          className="
            mt-6 w-full rounded-2xl
            bg-gradient-to-r from-pink-500 to-purple-600
            py-3 text-lg font-semibold text-white
            shadow-xl shadow-purple-700/40
            transition-all duration-200
            hover:from-pink-600 hover:to-purple-700
            active:scale-[0.97]
          "
        >
          Proceed to Quiz
        </button>

        {/* FOOTER */}
        <p className="mt-6 text-xs text-purple-300">
          Your data is used only for this event
        </p>
      </div>
    </main>
  );
}
