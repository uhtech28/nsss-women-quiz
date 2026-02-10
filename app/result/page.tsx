"use client";

import jsPDF from "jspdf";

export default function ResultPage() {
  const name = localStorage.getItem("name") || "Participant";
  const roll = localStorage.getItem("roll") || "-";
  const score = Number(localStorage.getItem("quizScore") || 0);
  const timeTaken = Number(localStorage.getItem("timeTaken") || 0);

  const generateCertificate = () => {
    const pdf = new jsPDF("landscape");

    pdf.setFont("times", "bold");
    pdf.setFontSize(28);
    pdf.text("Certificate of Participation", 148, 40, { align: "center" });

    pdf.setFontSize(16);
    pdf.text("This is proudly presented to", 148, 65, { align: "center" });

    pdf.setFontSize(26);
    pdf.text(name, 148, 95, { align: "center" });

    pdf.setFontSize(14);
    pdf.text(`Roll Number: ${roll}`, 148, 110, { align: "center" });

    pdf.text(
      "For participating in the International Women’s Day Quiz",
      148,
      130,
      { align: "center" }
    );

    pdf.text(
      `Score: ${score}/10 | Time: ${timeTaken}s`,
      148,
      150,
      { align: "center" }
    );

    pdf.setFontSize(14);
    pdf.text("NSS BIT Mesra • Team Samarpan", 148, 170, { align: "center" });

    pdf.save(`NSS_Certificate_${name}.pdf`);
  };

  return (
    <main className="min-h-screen bg-[#0f0617] text-white flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">🎉 Quiz Completed!</h1>

        <p>Score: <b>{score}/10</b></p>
        <p className="mb-4">Time: <b>{timeTaken}s</b></p>

        <button
          onClick={generateCertificate}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
        >
          🎓 Download Certificate
        </button>
      </div>
    </main>
  );
}
