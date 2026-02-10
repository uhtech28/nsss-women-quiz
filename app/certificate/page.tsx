"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Petals from "../components/Petals";

export default function ThankYouPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("Participant");
  const [musicOn, setMusicOn] = useState(true);

  // 🔹 Load name + auto redirect
  useEffect(() => {
    const storedName = localStorage.getItem("participantName");
    if (storedName) setName(storedName);

    const timer = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // 🔹 Music control
  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (!audio) return;
    musicOn ? audio.play().catch(() => {}) : audio.pause();
  }, [musicOn]);

  // 🔹 Share
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "International Women’s Day Quiz",
        text: "I just participated in the International Women’s Day Quiz 🌸",
        url: window.location.origin,
      });
    } else {
      alert("Sharing not supported on this device");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden
      bg-gradient-to-br from-[#0f0617] via-[#1a0b2e] to-[#2a0f45] text-white">

      {/* 🌸 PETALS */}
      <Petals />

      {/* 🔊 BACKGROUND MUSIC */}
      <audio id="bg-music" loop autoPlay>
        <source src="/muzic.mp3" type="audio/mpeg" />
      </audio>

      {/* MUSIC TOGGLE */}
      <button
        onClick={() => setMusicOn(!musicOn)}
        className="absolute top-6 left-6 z-20 text-xs px-3 py-1 rounded-full
          bg-white/10 backdrop-blur border border-white/20"
      >
        {musicOn ? "🔊 Music On" : "🔇 Music Off"}
      </button>

      {/* CARD */}
      <div className="relative z-10 max-w-2xl w-full rounded-3xl
        bg-white/10 backdrop-blur-2xl border border-white/20
        shadow-[0_40px_120px_rgba(0,0,0,0.65)]
        p-8 md:p-12 text-center">

        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-400 mb-4">
          Thank You, {name} 🌸
        </h1>

        <p className="text-base md:text-lg leading-relaxed text-purple-100 italic">
          “Science has no gender. It only knows curiosity, persistence, and the
          courage to seek the truth.
          <br /><br />
          Let us pledge to build a world where every girl with a question is
          encouraged to find the answer.
          <br /><br />
          <span className="font-semibold text-pink-300">
            The next great discovery is waiting for you.”
          </span>
        </p>

        {/* ACTIONS */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={handleShare}
            className="px-6 py-3 rounded-2xl bg-purple-600 font-semibold"
          >
            Share with Friends
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-2xl bg-pink-500 font-semibold"
          >
            Back to Home
          </button>
        </div>

        <p className="mt-8 text-xs uppercase tracking-widest text-purple-400">
          NSS BIT Mesra • Team Samarpan
        </p>

        <p className="mt-2 text-[10px] text-purple-500">
          Redirecting to home in 10 seconds…
        </p>
      </div>
    </main>
  );
}
