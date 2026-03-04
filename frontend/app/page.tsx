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
}

const moodMap = {
  "😌": "calm",
  "😊": "happy",//คบเกโคตรมีความสุข
  "🥰": "romantic",
  "🤩": "motivation",
  "🧐": "reflective",
  "🥹": "sad",
  "😇": "grateful",
} as const;

type EmojiType = keyof typeof moodMap;

export default function HomePage() {
  const [quote, setQuote] = useState<QuoteData>({
    text: "Loading...",
    author: "",
  });

  const [currentMood, setCurrentMood] = useState<EmojiType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // สุ่ม emoji
  const getRandomEmoji = (): EmojiType => {
    const emojis = Object.keys(moodMap) as EmojiType[];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  // ดึง quote จาก backend
  const fetchRandomQuote = async (moodKey: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://172.16.8.211:3001/api/quotes/random?category=${moodKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();

      setQuote({
        text: data.text,
        author: data.author,
      });
    } catch (error) {
      setQuote({
        text: `No ${moodKey} quotes available right now.`,
        author: "System",
      });
    }

    setIsLoading(false);
  };

  // โหลดหน้า → สุ่ม mood อัตโนมัติ
  useEffect(() => {
    const randomEmoji = getRandomEmoji();
    setCurrentMood(randomEmoji);
    fetchRandomQuote(moodMap[randomEmoji]);
  }, []);

  // เปลี่ยนอารมณ์
  const handleMoodChange = (emoji: EmojiType) => {
    if (currentMood === emoji) {
      setCurrentMood(null);
      setQuote({
        text: "Pick a mood to get started ✨",
        author: "",
      });
      return;
    }

    setCurrentMood(emoji);
    fetchRandomQuote(moodMap[emoji]);
  };

  // ปุ่ม Generate
  const handleGenerate = () => {
    if (currentMood) {
      fetchRandomQuote(moodMap[currentMood]);
    } else {
      const randomEmoji = getRandomEmoji();
      setCurrentMood(randomEmoji);
      fetchRandomQuote(moodMap[randomEmoji]);
    }
  };

  return (
    <div
      className={`${josefin.className} min-h-screen bg-[#FAFFC7] flex flex-col items-center justify-start pt-24 md:pt-32 p-4 text-center`}
    >
      <h1 className="text-2xl md:text-4xl text-[#000000] mb-8 font-normal px-2">
        Here&#96;s something gentle today.
      </h1>

      <p className="text-sm md:text-base text-[#000000] mb-6 md:mb-3 uppercase tracking-widest font-normal">
        Mood selection
      </p>

      {/* Mood Selector */}
      <div className="max-w-full overflow-x-auto no-scrollbar">
        <div className="bg-[#FFD1D4] rounded-[20px] px-4 md:px-8 py-3 flex gap-4 md:gap-6 shadow-sm mb-8 md:mb-12 border border-black/5 mx-auto w-max">
          {(Object.keys(moodMap) as EmojiType[]).map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleMoodChange(emoji)}
              className={`text-2xl md:text-3xl transition-all duration-300 shrink-0 ${
                currentMood === emoji
                  ? "scale-125 drop-shadow-md opacity-100"
                  : "hover:scale-110 opacity-40"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Quote Card */}
      <div
        className={`bg-[#FFD1D4] w-full max-w-sm md:max-w-xl rounded-[20px] p-8 md:p-16 text-center shadow-lg border border-black/5 transition-opacity ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
      >
        <p className="text-xl md:text-3xl text-[#000000] mb-4 md:mb-6 leading-relaxed font-normal">
          "{quote.text}"
        </p>

        <p className="text-lg md:text-xl text-gray-500 mb-8 md:mb-10 font-normal">
          {quote.author && `- ${quote.author}`}
        </p>

        <hr className="border-[#000000] mb-8 md:mb-10 opacity-20 mx-auto w-4/5" />

        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 font-normal">

          {/* Save */}
          <button
            onClick={() => {
              if (!quote.text || !quote.author) return;

              try {
                const existing = localStorage.getItem("saved_quotes");

                const savedQuotes: QuoteData[] = existing
                  ? JSON.parse(existing)
                  : [];

                const isDuplicate = savedQuotes.some(
                  (q) =>
                    q.text === quote.text &&
                    q.author === quote.author
                );

                if (isDuplicate) {
                  alert("Already saved ♡");
                  return;
                }

                const newQuote = {
                  ...quote,
                  mood: currentMood ? moodMap[currentMood] : undefined,
                  savedAt: new Date().toISOString(),
                };

                localStorage.setItem(
                  "saved_quotes",
                  JSON.stringify([...savedQuotes, newQuote])
                );

                alert("Saved successfully ♡");
              } catch (error) {
                console.error("Save error:", error);
              }
            }}
            className="bg-[#FAFFC7] text-[#000000] px-10 py-3 rounded-full hover:scale-110 transition-all shadow-sm"
          >
            ♡ Save
          </button>

          {/* Generate */}
          <button
            onClick={handleGenerate} 
            className="bg-[#FAFFC7] text-[#000000] px-10 py-3 rounded-full hover:scale-110 transition-all shadow-sm"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
