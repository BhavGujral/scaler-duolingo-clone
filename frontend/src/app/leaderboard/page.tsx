"use client";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Shield } from "lucide-react";

export default function Leaderboard() {
    const { username, xp, bots, tickBots } = useStore();

    useEffect(() => {
        const interval = setInterval(tickBots, 5000);
        return () => clearInterval(interval);
    }, [tickBots]);

    const allUsers = [...bots, { id: 'current_user', username: username || 'You', xp, avatar: username?.[0].toUpperCase() || 'U' }].sort((a, b) => b.xp - a.xp);

    return (
        <main className="max-w-2xl mx-auto p-6 pt-10">
            <div className="mb-12 p-10 bg-yellow-400 rounded-[2rem] text-center border-b-[8px] border-yellow-500 shadow-sm">
                <Shield size={80} className="text-white mx-auto mb-4 drop-shadow-sm" />
                <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">Obsidian League</h1>
                <p className="text-yellow-100 font-extrabold mt-3 text-lg">Top 10 advance to the next league</p>
            </div>

            <div className="flex flex-col gap-4">
                {allUsers.map((user, index) => {
                    const isCurrentUser = user.id === 'current_user';
                    return (
                        <div key={user.id} className={`flex items-center justify-between p-6 rounded-[1.5rem] border-2 border-b-[6px] ${isCurrentUser ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
                            <div className="flex items-center gap-8">
                                <span className={`w-8 text-center font-extrabold text-2xl ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-amber-600' : 'text-slate-400 dark:text-slate-500'}`}>{index + 1}</span>
                                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-extrabold text-2xl text-slate-500 dark:text-slate-300">{user.avatar}</div>
                                <span className={`font-extrabold text-xl ${isCurrentUser ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-white'}`}>{user.username}</span>
                            </div>
                            <span className="font-extrabold text-slate-500 text-xl">{user.xp} XP</span>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}