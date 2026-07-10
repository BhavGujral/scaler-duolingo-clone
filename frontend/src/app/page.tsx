"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Flame, Star, Heart, Home, Trophy, User as UserIcon, BookOpen } from "lucide-react";

export default function Dashboard() {
  const [pathData, setPathData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/user")
      .then((res) => res.json())
      .then(setUserData)
      .catch(console.error);

    fetch("http://127.0.0.1:8000/api/path")
      .then((res) => res.json())
      .then(setPathData)
      .catch(console.error);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center pb-24 font-sans text-gray-800">
      <header className="sticky top-0 z-50 flex w-full max-w-3xl items-center justify-between border-b-2 border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-2 font-black text-orange-500">
          <Flame fill="currentColor" size={24} />
          <span className="text-xl">{userData?.streak_count || 0}</span>
        </div>
        <div className="flex items-center gap-2 font-black text-blue-500">
          <Star fill="currentColor" size={24} />
          <span className="text-xl">{userData?.total_xp || 0}</span>
        </div>
        <div className="flex items-center gap-2 font-black text-red-500">
          <Heart fill="currentColor" size={24} />
          <span className="text-xl">{userData?.hearts || 0}</span>
        </div>
      </header>

      <div className="w-full max-w-2xl px-6 py-12 flex flex-col items-center">
        {pathData.length === 0 ? (
          <div className="flex flex-col items-center gap-4 mt-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-500" />
            <p className="font-bold text-gray-400 text-lg">Loading Course Data...</p>
          </div>
        ) : (
          pathData.map((unit, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={unit.id}
              className="mb-12 flex w-full flex-col relative"
            >
              <div className="mb-8 rounded-3xl bg-green-500 p-6 text-white shadow-[0_6px_0_0_#46a302] relative overflow-hidden">
                <div className="absolute -right-10 -top-10 opacity-20"><BookOpen size={150} /></div>
                <h2 className="text-3xl font-black tracking-tight">{unit.title}</h2>
                <p className="mt-2 text-green-100 font-bold text-lg">Section {index + 1}</p>
              </div>

              <div className="flex flex-col items-center gap-8 py-4 relative">
                {unit.skills.map((skill: any, i: number) => {
                  const isEven = i % 2 === 0;
                  const offset = i === 0 ? 0 : isEven ? -40 : 40;

                  return (
                    <motion.div
                      key={skill.id}
                      className="flex flex-col items-center relative z-10"
                      style={{ transform: `translateX(${offset}px)` }}
                    >
                      <button
                        onClick={() => router.push('/lesson')}
                        className="button-3d flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400 border-b-8 border-yellow-600 hover:bg-yellow-300 transition-colors"
                      >
                        <Star fill="white" stroke="white" size={40} />
                      </button>
                      <span className="mt-4 font-bold text-lg text-gray-700 bg-white px-4 py-2 rounded-2xl shadow-sm border-2 border-gray-100">
                        {skill.title}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))
        )}
      </div>

      <nav className="fixed bottom-0 flex w-full max-w-3xl justify-around border-t-2 border-gray-200 bg-white p-4 z-50 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={() => router.push('/')} className="flex flex-col items-center text-green-500 hover:bg-green-50 p-3 rounded-2xl transition-colors">
          <Home size={32} strokeWidth={2.5} />
        </button>
        <button onClick={() => router.push('/leaderboard')} className="flex flex-col items-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-3 rounded-2xl transition-colors">
          <Trophy size={32} strokeWidth={2.5} />
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-3 rounded-2xl transition-colors">
          <UserIcon size={32} strokeWidth={2.5} />
        </button>
      </nav>
    </main>
  );
}