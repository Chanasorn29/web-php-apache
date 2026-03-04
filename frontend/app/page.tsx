import { Josefin_Slab } from "next/font/google";

const josefin = Josefin_Slab({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HomePage() {
  return (
    <div
      className={`${josefin.className} min-h-screen bg-[#FAFFC7] flex flex-col items-center justify-center p-4 text-center`}
    >
      {/* Header Section - ปรับขนาด text ให้เล็กลงบนมือถือ (text-2xl) และใหญ่ขึ้นบนจอคอม (md:text-4xl) */}
      <h1 className="text-2xl md:text-4xl text-[#000000] mb-8 font-normal px-2">
        Here is something gentle today.
      </h1>

      <p className="text-sm md:text-base text-[#000000] mb-6 md:mb-3 uppercase tracking-widest font-normal">
        Mood selection
      </p>

      {/* Mood Selector Bar - เพิ่ม overflow-x-auto เพื่อให้เลื่อนซ้ายขวาได้ถ้ามือถือจอแคบมาก */}
      <div className="max-w-full overflow-x-auto no-scrollbar">
        <div className="bg-[#FFD1D4] rounded-[20px] px-4 md:px-8 py-3 flex gap-4 md:gap-6 shadow-sm mb-8 md:mb-12 border border-black/5 mx-auto w-max">
          {["😌", "😊", "🥰", "😎", "🧐", "🥹", "😇"].map((emoji, index) => (
            <button
              key={index}
              className="text-2xl md:text-3xl hover:scale-125 transition-transform shrink-0"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Quote Card - ปรับ Padding (p-8 vs p-16) และความกว้างตามหน้าจอ */}
      <div className="bg-[#FFD1D4] w-full max-w-sm md:max-w-xl rounded-[20px] p-8 md:p-16 text-center shadow-lg relative border border-black/5">
        {/* ข้อความ Quote - ใช้ md:whitespace-nowrap เฉพาะจอใหญ่ บนมือถือให้ตัดบรรทัดได้เพื่อไม่ให้ล้น */}
        <p className="text-xl md:text-3xl text-[#000000] mb-4 md:mb-6 leading-relaxed font-normal md:whitespace-nowrap">
          Stillness is a quiet form of strength.
        </p>

        <p className="text-lg md:text-xl text-gray-500 mb-8 md:mb-10 font-normal">
          - Unknown
        </p>

        <hr className="border-[#000000] mb-8 md:mb-10 opacity-20 mx-auto w-4/5" />

        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 font-normal">
          {/* ปุ่ม Save */}
          <button
            className="
            bg-[#FAFFC7] text-[#000000]
            px-10 py-3 rounded-full
            flex items-center justify-center gap-2
            transition-all duration-300 ease-out
            hover:scale-110 hover:bg-white hover:shadow-md
            active:bg-[#FFD1D4] active:scale-95
          "
          >
            <span className="text-xl">♡</span> Save
          </button>

          {/* ปุ่ม Generate */}
          <button
            className="
            bg-[#FAFFC7] text-[#000000]
            px-10 py-3 rounded-full
            transition-all duration-300 ease-out
            hover:scale-110 hover:bg-white hover:shadow-md
            active:bg-[#FFD1D4] active:scale-95
          "
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
