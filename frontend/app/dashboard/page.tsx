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

const moods: Mood[] = [
  { emoji: "😌", label: "Calm", percent: 70 },
  { emoji: "🥰", label: "Romantic", percent: 50 },
  { emoji: "🥲", label: "Sad but Healing", percent: 40 },
  { emoji: "🥹", label: "Grateful", percent: 90 },
  { emoji: "😎", label: "Motivation", percent: 40 },
  { emoji: "😊", label: "Happy", percent: 90 },
  { emoji: "🧐", label: "Reflective", percent: 40 },
];

const savedQuotes = [
  { text: "Stillness is a quiet form of strength.", mood: "Happy" },
  { text: "Stillness is a quiet form of strength.", mood: "Romantic" },
  { text: "Stillness is a quiet form of strength.", mood: "Motivation" },
  { text: "Stillness is a quiet form of strength.", mood: "Calm" },
];

export default function DashboardPage() {
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
          {savedQuotes.map((q, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 last:mb-0 gap-1 sm:gap-0"
            >
              <p className="italic text-sm md:text-base">
                "{q.text}" <span className="text-gray-500">- Unknown</span>
              </p>

              <span className="text-xs md:text-sm">{q.mood}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
