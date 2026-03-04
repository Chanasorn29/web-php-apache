"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Josefin_Slab } from 'next/font/google';

const josefin = Josefin_Slab({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={`${josefin.className}
      sticky top-10 z-50 w-full bg-[#FFD1D4] py-5 px-12 md:px-24 flex justify-between items-center shadow-lg border-y border-black/5`}
    >
      <div className="text-2xl text-[#000000] font-normal tracking-tight">
        Quietquote
      </div>

      <div className="flex gap-12 items-center">
        <Link href="/" className="relative group text-[#000000] text-xl font-normal">
          Quote
          <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-black transition-transform duration-300 ${pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
        </Link>

        <Link href="/dashboard" className="relative group text-[#000000] text-xl font-normal opacity-70 hover:opacity-100 transition-all">
          Dashboard
          <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-black transition-transform duration-300 ${pathname === '/dashboard' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
        </Link>
      </div>
    </nav>
  );
}