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
    const lang = localStorage.getItem("language") || "Spanish";

    if (!localStorage.getItem("user_name")) {
      router.push("/login");
      return;
    }

    // Now adding ?lang= parameter to fetch
    fetch(`https://scaler-duolingo-clone.onrender.com/api/user?lang=${lang}`)
      .then((res) => res.json())
      .then(setUserData)
      .catch(console.error);

    fetch(`https://scaler-duolingo-clone.onrender.com/api/path?lang=${lang}`)
      .then((res) => res.json())
      .then(setPathData)
      .catch(console.error);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center pb-24 font-sans text-gray-800 bg-gray-50">
      <header className="sticky top-0 z-50 flex w-full max-w-3xl items-center justify-between border-b-2 border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-2 font-black text-orange-500"><Flame fill="currentColor" size={24} /> <span>{userData?.streak_count || 0}</span></div>
        <div className="flex items-center gap-2 font-black text-blue-500"><Star fill="currentColor" size={24} /> <span>{userData?.total_xp || 0}</span></div>
        <div className="flex items-center gap-2 font-black text-red-500"><Heart fill="currentColor" size={24} /> <span>{userData?.hearts || 0}</span></div>
      </header>

      <div className="w-full max-w-2xl px-6 py-12 flex flex-col items-center">
        {pathData.length === 0 ? (
          <div className="p-8 bg-white rounded-3xl shadow-sm text-center">
            <p className="font-bold text-gray-400">Loading your {localStorage.getItem("language")} course...</p>
          </div>
        ) : (
          pathData.map((unit, index) => (
            <motion.div key={unit.id} className="mb-12 w-full">
              <div className="mb-8 rounded-3xl bg-green-500 p-6 text-white shadow-[0_6px_0_0_#46a302]">
                <h2 className="text-3xl font-black">{unit.title}</h2>
              </div>
              <div className="flex flex-col items-center gap-6">
                {unit.skills.map((skill: any, i: number) => (
                  <button key={skill.id} onClick={() => router.push('/lesson')} className="button-3d h-20 w-20 rounded-full bg-yellow-400 border-b-8 border-yellow-600 flex items-center justify-center">
                    <Star fill="white" stroke="white" size={32} />
                  </button>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>

      <nav className="fixed bottom-0 w-full max-w-3xl flex justify-around border-t-2 bg-white p-4 z-50">
        <button onClick={() => router.push('/')}><Home size={32} /></button>
        <button onClick={() => router.push('/leaderboard')}><Trophy size={32} /></button>
        <button onClick={() => router.push('/profile')}><UserIcon size={32} /></button>
      </nav>
    </main>
  );
}