"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Trophy, User as UserIcon, Shield } from "lucide-react";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch("https://scaler-duolingo-clone.onrender.com/api/leaderboard")
            .then((res) => res.json())
            .then(setLeaderboard)
            .catch(console.error);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center bg-white pb-24 font-sans text-gray-800">

            <header className="sticky top-0 z-50 flex w-full max-w-3xl items-center justify-center border-b-2 border-gray-200 bg-white/80 px-6 py-6 backdrop-blur-md">
                <h1 className="text-2xl font-black text-gray-700 tracking-wide uppercase">Leaderboard</h1>
            </header>

            <div className="w-full max-w-2xl px-6 py-10 flex flex-col items-center">

                <div className="mb-10 p-6 bg-yellow-400 rounded-3xl w-full flex flex-col items-center shadow-[0_6px_0_0_#ca8a04]">
                    <Shield size={64} className="text-white mb-4" />
                    <h2 className="text-3xl font-black text-white text-center">Obsidian League</h2>
                    <p className="text-yellow-100 font-bold mt-2">Top 10 advance to the next league</p>
                </div>

                <div className="w-full flex flex-col gap-4">
                    {leaderboard.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 mt-10">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-yellow-400" />
                        </div>
                    ) : (
                        leaderboard.map((user, index) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={index}
                                className={`flex items-center justify-between rounded-2xl p-5 border-2 ${user.username === "Learner1" ? "border-green-500 bg-green-50" : "border-gray-100 bg-white"
                                    }`}
                            >
                                <div className="flex items-center gap-6">
                                    <span className={`text-2xl font-black ${index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : index === 2 ? "text-amber-700" : "text-gray-300"}`}>
                                        {index + 1}
                                    </span>
                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
                                        {user.username.charAt(0)}
                                    </div>
                                    <span className="text-xl font-bold text-gray-700">{user.username}</span>
                                </div>
                                <span className="text-lg font-black text-gray-500">{user.total_xp} XP</span>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            <nav className="fixed bottom-0 flex w-full max-w-3xl justify-around border-t-2 border-gray-200 bg-white p-4 z-50 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <button onClick={() => router.push('/')} className="flex flex-col items-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-3 rounded-2xl transition-colors">
                    <Home size={32} strokeWidth={2.5} />
                </button>
                <button onClick={() => router.push('/leaderboard')} className="flex flex-col items-center text-blue-500 hover:bg-blue-50 p-3 rounded-2xl transition-colors">
                    <Trophy size={32} strokeWidth={2.5} />
                </button>
                <button className="flex flex-col items-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-3 rounded-2xl transition-colors">
                    <UserIcon size={32} strokeWidth={2.5} />
                </button>
            </nav>
        </main>
    );
}