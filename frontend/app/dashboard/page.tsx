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
    <div className={`${josefin.className} min-h-screen bg-[#FAFFC7] flex flex-col items-center justify-center p-4 text-center`}>

      {/* Mood Tracking */}
      <h2 className="text-3xl mb-6">Mood Tracking</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {moods.map((mood, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-2xl">{mood.emoji}</span>

            <div className="flex-1">
              <div className="h-3 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFD1D4]"
                  style={{ width: `${mood.percent}%` }}
                />
              </div>
            </div>

            <span className="text-sm whitespace-nowrap">
              {mood.label} - {mood.percent}%
            </span>
          </div>
        ))}
      </div>

      {/* Saved Section */}
      <h2 className="text-2xl mb-4">Saved ♡</h2>

      <div className="bg-[#FFD1D4] w-full max-w-sm md:max-w-xl rounded-[20px] p-8 md:p-16 text-center shadow-lg relative border border-black/5">

        {savedQuotes.map((q, i) => (
          <div
            key={i}
            className="flex justify-between items-center mb-3 last:mb-0"
          >
            <p className="italic">
              "{q.text}" <span className="text-gray-500">- Unknown</span>
            </p>

            <span className="text-sm">{q.mood}</span>
          </div>
        ))}

      </div>
    </div>
  );
}