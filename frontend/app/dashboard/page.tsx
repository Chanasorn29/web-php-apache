"use client";

import { useState, useEffect } from "react";
import { Josefin_Slab } from "next/font/google";

const josefin = Josefin_Slab({
  subsets: ["latin"],
  weight: ["400"],
});

interface QuoteData {
  text: string;
  author: string;
  savedAt?: string;
  mood?: string;
}

type Mood = {
  emoji: string;
  label: string;
  percent: number;
};

const BASE_MOODS = [
  { emoji: "😌", label: "Calm" },
  { emoji: "🥰", label: "Romantic" },
  { emoji: "🥹", label: "Sad" },
  { emoji: "😇", label: "Grateful" },
  { emoji: "🤩", label: "Motivation" },
  { emoji: "😊", label: "Happy" },
  { emoji: "🧐", label: "Reflective" },
];

export default function DashboardPage() {
  const [savedQuotes, setSavedQuotes] = useState<QuoteData[]>([]);
  const [moods, setMoods] = useState<Mood[]>(
    BASE_MOODS.map((m) => ({ ...m, percent: 0 }))
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Calculate mood percentages from saved quotes
  const calculateMoodPercentages = (quotes: QuoteData[]): Mood[] => {
    // filter quotes that contain mood
    const quotesWithMood = quotes.filter(q => q.mood);

    const totalQuotes = quotesWithMood.length;

    // map results to BASE_MOODS
    return BASE_MOODS.map((mood) => {
      const count = quotesWithMood.filter(
        (q) => q.mood?.toLowerCase() === mood.label.toLowerCase()
      ).length;

      // calculate percentage
      return {
        emoji: mood.emoji,
        label: mood.label,
        percent: totalQuotes > 0 ? Math.round((count / totalQuotes) * 100) : 0,
      };
    });
  };

  useEffect(() => {
    // Load saved quotes from browser storage
    const stored = localStorage.getItem("saved_quotes");
    if (stored) {
      try {
        const parsed: QuoteData[] = JSON.parse(stored);
        setSavedQuotes(parsed);
        const calculatedMoods = calculateMoodPercentages(parsed);
        setMoods(calculatedMoods);
      } catch (error) {
        console.error("Failed to parse saved quotes:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div
        className={`${josefin.className} min-h-screen bg-[#FAFFC7] flex items-center justify-center`}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`${josefin.className} min-h-screen bg-[#FAFFC7] flex flex-col items-center justify-center px-4 py-6 md:px-8`}
    >
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl md:text-3xl mb-4 md:mb-6 text-left">
          Mood Tracking
        </h2>

        {/* Render mood progress bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 md:mb-16 w-full">
          {moods.map((mood, i) => (
            <div key={i} className="mood-row flex flex-col gap-2 w-full">
              <span className="text-sm md:text-base whitespace-nowrap">
                {mood.emoji} {mood.label} - {mood.percent}%
              </span>
              <div className="progress h-2 md:h-3 bg-white rounded-full overflow-hidden w-full">
                <div
                  className="progress-fill h-full bg-[#FFD1D4] transition-all duration-500"
                  style={{ width: `${mood.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl md:text-2xl mb-3 md:mb-4 text-left">Saved ♡</h2>

        {/* Render saved quote list */}
        <div className="bg-[#FFD1D4] w-full rounded-[16px] md:rounded-[20px] p-4 md:p-8 shadow-lg border border-black/5 h-[200px] md:h-[260px] overflow-y-auto">
          {savedQuotes.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#000000] opacity-60 text-center">
                No saved quotes yet.
              </p>
            </div>
          ) : (
            savedQuotes.map((q, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 last:mb-0 gap-2 sm:gap-0"
              >
                <p className="italic text-sm md:text-base">
                  "{q.text}" <span className="text-gray-500">- {q.author || "Unknown"}</span>
                </p>
                {q.mood && (
                  <span className="text-xs md:text-sm whitespace-nowrap">
                    {q.mood}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}