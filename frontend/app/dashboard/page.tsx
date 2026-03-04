"use client";

import { useEffect, useState } from "react";
import { Josefin_Slab } from "next/font/google";

const josefin = Josefin_Slab({
  subsets: ["latin"],
  weight: ["400"],
});

type Mood = {
  emoji: string;
  label: string;
  percent: number;
};

// Initial template with 0%
const defaultMoods: Mood[] = [
  { emoji: "😌", label: "Calm", percent: 0 },
  { emoji: "🥰", label: "Romantic", percent: 0 },
  { emoji: "🥲", label: "Sad but Healing", percent: 0 },
  { emoji: "🥹", label: "Grateful", percent: 0 },
  { emoji: "😎", label: "Motivation", percent: 0 },
  { emoji: "😊", label: "Happy", percent: 0 },
  { emoji: "🧐", label: "Reflective", percent: 0 },
];

interface QuoteData {
  text: string;
  author: string;
  mood: string;
  savedAt: number;
}

export default function DashboardPage() {
  const [moods, setMoods] = useState<Mood[]>(defaultMoods);
  const [savedQuotes, setSavedQuotes] = useState<QuoteData[]>([]);

  useEffect(() => {
    // Read savedQuotes from localStorage
    const stored = localStorage.getItem("savedQuotes");
    if (stored) {
      try {
        const parsed: QuoteData[] = JSON.parse(stored);
        setSavedQuotes(parsed);

        // Calculate mood percentages for progress bars
        const total = parsed.length;
        if (total > 0) {
          const moodCounts: Record<string, number> = {};
          parsed.forEach((q) => {
            // Count how many quotes exist for each mood
            // Handle variations in formatting just in case
            const moodLabel = q.mood.toLowerCase();
            moodCounts[moodLabel] = (moodCounts[moodLabel] || 0) + 1;
          });

          // Compute percentages and update the state
          const updatedMoods = defaultMoods.map((m) => {
            let keyToMatch = m.label.toLowerCase();
            if (keyToMatch === "sad but healing") keyToMatch = "sad"; // map UI label to underlying category

            const count = moodCounts[keyToMatch] || 0;
            const percentage = Math.round((count / total) * 100);

            return {
              ...m,
              percent: percentage,
            };
          });

          setMoods(updatedMoods);
        }
      } catch (err) {
        console.error("Failed to parse savedQuotes", err);
      }
    }
  }, []);

  return (
    <div
      className={`${josefin.className} min-h-screen bg-[#FAFFC7] flex flex-col items-center justify-center px-4 py-6 md:px-8`}
    >
      {/* Container */}
      <div className="w-full max-w-6xl">
        {/* Mood Tracking */}
        <h2 className="text-2xl md:text-3xl mb-4 md:mb-6 text-left">
          Mood Tracking
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-4 md:gap-y-6 mb-10 md:mb-16 w-full">
          {moods.map((mood, i) => (
            <div key={i} className="flex items-center gap-3 w-full">
              <span className="text-xl md:text-2xl">{mood.emoji}</span>

              <div className="flex-1">
                <div className="h-2 md:h-3 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFD1D4] transition-all duration-500"
                    style={{ width: `${mood.percent}%` }}
                  />
                </div>
              </div>

              <span className="text-xs md:text-sm whitespace-nowrap">
                {mood.label} - {mood.percent}%
              </span>
            </div>
          ))}
        </div>

        {/* Saved */}
        <h2 className="text-xl md:text-2xl mb-3 md:mb-4 text-left">
          Saved ♡
        </h2>

        <div className="bg-[#FFD1D4] w-full rounded-[16px] md:rounded-[20px] p-4 md:p-8 shadow-lg border border-black/5 h-[200px] md:h-[260px] overflow-y-auto">
          {savedQuotes.length === 0 ? (
            <p className="text-gray-500 text-sm md:text-base italic text-center">No saved quotes yet.</p>
          ) : (
            savedQuotes.map((q, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 last:mb-0 gap-1 sm:gap-0"
              >
                <div className="flex-1">
                  <p className="italic text-sm md:text-base">
                    "{q.text}" <span className="text-gray-500">— {q.author || "Unknown"}</span>
                  </p>
                </div>

                <span className="text-xs md:text-sm capitalize px-2 py-1 bg-white/40 rounded-full ml-4 whitespace-nowrap">
                  {q.mood === "sad" ? "Sad but Healing" : q.mood}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}