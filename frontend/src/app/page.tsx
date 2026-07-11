"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { Flame, Star, Shield, Zap } from "lucide-react";

export default function Home() {
  const { username, language, xp, streak, initializeBots } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!username) router.push("/login");
    initializeBots();
  }, [username, router, initializeBots]);

  if (!username) return null;

  return (
    <main className="max-w-4xl mx-auto p-6 pt-10">
      <header className="flex justify-between items-center mb-12 bg-white dark:bg-slate-800 p-5 rounded-[2rem] border-2 border-b-[6px] border-slate-200 dark:border-slate-700">
        <div className="font-extrabold text-2xl text-slate-800 dark:text-white flex items-center gap-3">
          <span className="text-3xl">{language === 'Spanish' ? '🇪🇸' : language === 'French' ? '🇫🇷' : language === 'German' ? '🇩🇪' : language === 'Japanese' ? '🇯🇵' : '🌍'}</span>
          {language}
        </div>
        <div className="flex gap-8">
          <div className="flex items-center gap-2 font-extrabold text-orange-500 text-xl"><Flame fill="currentColor" size={28} /> {streak}</div>
          <div className="flex items-center gap-2 font-extrabold text-blue-500 text-xl"><Star fill="currentColor" size={28} /> {xp}</div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <button onClick={() => router.push('/lesson?mode=guided')} className="text-left bg-white dark:bg-slate-800 p-8 rounded-[2rem] card-3d hover:bg-slate-50 dark:hover:bg-slate-800/80 group">
          <Shield size={56} className="text-green-500 mb-6 group-hover:scale-110 transition-transform" />
          <h2 className="text-3xl font-extrabold mb-3 text-slate-800 dark:text-white">Learn with Guidance</h2>
          <p className="text-slate-500 font-bold text-lg">Hints enabled. Standard XP.</p>
        </button>

        <button onClick={() => router.push('/lesson?mode=test')} className="text-left bg-white dark:bg-slate-800 p-8 rounded-[2rem] card-3d hover:bg-slate-50 dark:hover:bg-slate-800/80 group">
          <Zap size={56} className="text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
          <h2 className="text-3xl font-extrabold mb-3 text-slate-800 dark:text-white">Test Mode (No Hints)</h2>
          <p className="text-slate-500 font-bold text-lg">Race the clock. Earn bonus XP!</p>
        </button>
      </div>
    </main>
  );
}