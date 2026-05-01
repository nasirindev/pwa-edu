"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Trophy,
} from "lucide-react";
import { Decoration, LayoutWrapper } from "@/components/AnimatedBackgroud";
import { motion, AnimatePresence } from "framer-motion";
import { decorations } from "@/libs/decorations";

const questions = [
  {
    q: "Bangun datar yang memiliki empat sisi dan keempat sudutnya siku-siku adalah …",
    a: ["Trapesium", "Persegi panjang", "Layang-layang", "Segitiga"],
    correct: 1,
  },
  {
    q: "Bangun datar yang memiliki dua pasang sisi sejajar adalah …",
    a: ["Trapesium", "Segitiga", "Jajargenjang", "Lingkaran"],
    correct: 2,
  },
  {
    q: "Pada persegi, hubungan antara sisi-sisinya adalah …",
    a: [
      "Semua sisi sejajar",
      "Semua sisi sama panjang dan sisi berhadapan sejajar",
      "Tidak ada sisi sejajar",
      "Hanya dua sisi yang sama panjang",
    ],
    correct: 1,
  },
  {
    q: "Pada persegi panjang, sisi yang berhadapan memiliki sifat …",
    a: [
      "Tegak lurus",
      "Sama panjang dan sejajar",
      "Tidak sejajar",
      "Membentuk sudut lancip",
    ],
    correct: 1,
  },
  {
    q: "Garis yang membentuk sudut 90° disebut garis …",
    a: ["Sejajar", "Berpotongan", "Tegak lurus", "Lengkung"],
    correct: 2,
  },
  {
    q: "Bangun datar yang memiliki tepat satu pasang sisi sejajar adalah …",
    a: ["Jajargenjang", "Trapesium", "Persegi", "Belah ketupat"],
    correct: 1,
  },
  {
    q: "Pada jajargenjang, sudut-sudut yang berhadapan adalah …",
    a: ["Tidak sama besar", "Sama besar", "Siku-siku", "Lancip semua"],
    correct: 1,
  },
  {
    q: "Bangun datar yang semua sisinya sama panjang dan sudut-sudutnya siku-siku adalah …",
    a: ["Persegi", "Belah ketupat", "Layang-layang", "Trapesium"],
    correct: 0,
  },
  {
    q: "Pada belah ketupat, diagonalnya saling berpotongan secara …",
    a: [
      "Sejajar",
      "Tegak lurus",
      "Tidak berpotongan",
      "Membentuk sudut tumpul",
    ],
    correct: 1,
  },
  {
    q: "Pada layang-layang, terdapat …",
    a: [
      "Dua pasang sisi sejajar",
      "Dua pasang sisi sama panjang yang berdekatan",
      "Semua sisi sama panjang",
      "Tidak ada sisi yang sama",
    ],
    correct: 1,
  },
  {
    q: "Bangun datar yang tidak memiliki sisi lurus adalah …",
    a: ["Persegi", "Segitiga", "Lingkaran", "Trapesium"],
    correct: 2,
  },
  {
    q: "Pada segitiga, jumlah sisi yang dimiliki adalah …",
    a: ["Dua", "Tiga", "Empat", "Lima"],
    correct: 1,
  },
  {
    q: "Segitiga yang memiliki satu sudut siku-siku memiliki …",
    a: [
      "Dua garis sejajar",
      "Satu sudut 90°",
      "Semua sudut sama besar",
      "Tidak memiliki sudut",
    ],
    correct: 1,
  },
  {
    q: "Pada persegi panjang, setiap sudutnya adalah …",
    a: ["Lancip", "Tumpul", "Siku-siku", "Berbeda-beda"],
    correct: 2,
  },
  {
    q: "Garis sejajar adalah garis yang …",
    a: [
      "Selalu berpotongan",
      "Tidak pernah berpotongan",
      "Membentuk sudut 90°",
      "Berpotongan di satu titik",
    ],
    correct: 1,
  },
  {
    q: "Pada trapesium, sisi yang sejajar terletak pada …",
    a: ["Semua sisi", "Tidak ada sisi", "Sepasang sisi", "Tiga sisi"],
    correct: 2,
  },
  {
    q: "Pada jajargenjang, sisi-sisi yang berhadapan adalah …",
    a: [
      "Tegak lurus",
      "Sama panjang dan sejajar",
      "Tidak sama panjang",
      "Membentuk sudut siku-siku",
    ],
    correct: 1,
  },
  {
    q: "Bangun datar yang memiliki dua garis diagonal saling tegak lurus adalah …",
    a: ["Persegi panjang", "Layang-layang", "Trapesium", "Segitiga"],
    correct: 1,
  },
  {
    q: "Pada persegi, garis diagonal berpotongan dan membentuk sudut …",
    a: ["Lancip", "Tumpul", "Siku-siku", "Tidak beraturan"],
    correct: 2,
  },
  {
    q: "Bangun datar yang memiliki empat sisi tetapi tidak semua sudutnya siku-siku adalah …",
    a: ["Persegi", "Persegi panjang", "Jajargenjang", "Lingkaran"],
    correct: 2,
  },
];

export default function LatihanPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].correct;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <LayoutWrapper className="bg-yellow-50/30">
      {decorations.map((decorations, idx) => (
        <Decoration
          key={idx}
          icon={decorations.icon}
          className={decorations.className}
          animate={decorations.animate}
          transition={decorations.transition}
        />
      ))}
      <div className="h-full w-full flex flex-col p-4 md:p-6 relative space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-white border-[3px] border-gray-800 p-2 rounded-xl shadow-[4px_4px_0px_#1f2937] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1 bg-white border-[3px] border-gray-800 rounded-xl shadow-[4px_4px_0px_#1f2937] p-3 text-center">
            <h1 className="text-lg md:text-xl font-black text-gray-800 uppercase tracking-tight">
              Latihan Soal
            </h1>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col space-y-4"
            >
              {/* Progress Bar */}
              <div className="w-full bg-white border-[3px] border-gray-800 rounded-full h-6 overflow-hidden shadow-[4px_4px_0px_#1f2937]">
                <div
                  className="bg-orange-500 h-full transition-all duration-500 border-r-[3px] border-gray-800"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Soal */}
              <div className="bg-white border-4 border-gray-800 rounded-2xl shadow-[8px_8px_0px_#1f2937] p-6">
                <span className="text-orange-500 font-black text-sm uppercase">
                  Pertanyaan {currentQuestion + 1} dari {questions.length}
                </span>
                <p className="text-gray-800 font-bold text-lg md:text-xl mt-2">
                  {questions[currentQuestion].q}
                </p>
              </div>

              {/* Pilihan Jawaban */}
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {questions[currentQuestion].a.map((answer, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerClick(idx)}
                    disabled={selectedAnswer !== null}
                    className={`
                      text-left p-4 rounded-xl border-[3px] border-gray-800 font-bold transition-all flex justify-between items-center text-black
                      ${selectedAnswer === null ? "bg-white hover:bg-gray-50 shadow-[4px_4px_0px_#1f2937]" : ""}
                      ${selectedAnswer === idx && isCorrect ? "bg-green-400 shadow-none translate-x-1 translate-y-1" : ""}
                      ${selectedAnswer === idx && !isCorrect ? "bg-red-400 shadow-none translate-x-1 translate-y-1" : ""}
                      ${selectedAnswer !== null && idx === questions[currentQuestion].correct && !isCorrect ? "bg-green-200" : ""}
                    `}
                  >
                    <span>
                      {String.fromCharCode(65 + idx)}. {answer}
                    </span>
                    {selectedAnswer === idx &&
                      (isCorrect ? (
                        <CheckCircle2 size={24} />
                      ) : (
                        <XCircle size={24} />
                      ))}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center space-y-6"
            >
              <div className="bg-white border-4 border-gray-800 rounded-3xl shadow-[12px_12px_0px_#1f2937] p-10 text-center w-full max-w-md">
                <Trophy size={80} className="mx-auto text-yellow-500 mb-4" />
                <h2 className="text-4xl font-black text-gray-800 uppercase italic">
                  Selesai!
                </h2>
                <div className="my-6">
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                    Skor Kamu
                  </p>
                  <p className="text-7xl font-black text-orange-500">
                    {(score / questions.length) * 100}
                  </p>
                </div>
                <p className="font-bold text-gray-700 mb-8">
                  Kamu menjawab benar {score} dari {questions.length} soal!
                </p>
                <button
                  onClick={resetQuiz}
                  className="w-full bg-purple-500 text-white border-4 border-gray-800 py-3 rounded-xl font-black uppercase flex items-center justify-center gap-2 shadow-[4px_4px_0px_#1f2937] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                >
                  <RefreshCcw size={20} /> Ulangi Latihan
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutWrapper>
  );
}
