"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import jsPDF from "jspdf";

export default function ResultPage() {
  const [rank, setRank] = useState<number | null>(null);

  const name = localStorage.getItem("name") || "Participant";
  const roll = localStorage.getItem("roll") || "-";
  const score = Number(localStorage.getItem("quizScore") || 0);
  const timeTaken = Number(localStorage.getItem("timeTaken") || 0);

  // 🏅 Rank (optional, safe)
  useEffect(() => {
    const fetchRank = async () => {
      try {
        const q = query(
          collection(db, "participants"),
          orderBy("score", "desc")
        );
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => d.data());

        const index = list.findIndex(
          (p: any) =>
            p.name === name &&
            p.roll === roll &&
            p.score === score
        );

        setRank(index >= 0 ? index + 1 : null);
      } catch {
        setRank(null);
      }
    };

    fetchRank();
  }, []);

  // 🎓 CERTIFICATE GENERATOR
  const generateCertificate = () => {
    const pdf = new jsPDF("landscape", "mm", "a4");

    // 🟥 NSS LOGO (TOP LEFT)
    const img = new Image();
    img.src = "/nss-logo.jpg";

    img.onload = () => {
      pdf.addImage(img, "PNG", 20, 20, 35, 35);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(30);
      pdf.text("Certificate of Participation", 148, 45, { align: "center" });

      pdf.setFontSize(16);
      pdf.setFont("helvetica", "normal");
      pdf.text("This certificate is proudly presented to", 148, 70, {
        align: "center",
      });

      pdf.setFontSize(26);
      pdf.setFont("helvetica", "bold");
      pdf.text(name, 148, 95, { align: "center" });

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Roll Number: ${roll}`, 148, 110, { align: "center" });

      pdf.setFontSize(16);
      pdf.text(
        "For participating in the International Women’s Day Quiz",
        148,
        130,
        { align: "center" }
      );

      pdf.setFontSize(14);
      pdf.text(
        `Score: ${score}/10   |   Time: ${timeTaken}s`,
        148,
        145,
        { align: "center" }
      );

      if (rank) {
        pdf.text(`Rank: #${rank}`, 148, 158, { align: "center" });
      }

      pdf.setFontSize(13);
      pdf.text("National Service Scheme (NSS)", 148, 175, {
        align: "center",
      });
      pdf.text("BIT Mesra • Team Samarpan", 148, 185, {
        align: "center",
      });

      pdf.save("NSS_Womens_Day_Certificate.pdf");
    };
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f0617] text-white px-4">
      <div className="bg-white/10 p-8 rounded-3xl max-w-md w-full text-center backdrop-blur-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-4">🎉 Quiz Completed!</h1>

        <p className="text-lg">
          Score: <b>{score}/10</b>
        </p>
        <p className="text-lg">
          Time: <b>{timeTaken}s</b>
        </p>

        {rank && (
          <p className="text-xl mt-2">
            🏅 Rank: <b>#{rank}</b>
          </p>
        )}

        <button
          onClick={generateCertificate}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
        >
          🎓 Download Certificate
        </button>
      </div>
    </main>
  );
}
