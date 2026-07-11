"use client";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { LogOut, Settings, Moon, Sun } from "lucide-react";

export default function Profile() {
    const { username, language, xp, streak, joinDate, setLanguage, logout, theme, toggleTheme } = useStore();
    const router = useRouter();

    if (!username) return null;

    return (
        <main className="max-w-2xl mx-auto p-6 pt-10">
            <div className="flex items-center gap-8 mb-12 border-b-2 border-slate-200 dark:border-slate-700 pb-12">
                <div className="w-28 h-28 rounded-full bg-green-500 flex items-center justify-center text-5xl font-extrabold text-white border-b-[6px] border-green-600">{username[0].toUpperCase()}</div>
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">{username}</h1>
                    <p className="text-slate-400 font-bold mt-2 text-lg">Joined {new Date(joinDate).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="p-8 border-2 border-b-[6px] border-slate-200 dark:border-slate-700 rounded-[2rem] bg-white dark:bg-slate-800 text-center">
                    <h3 className="text-slate-400 font-extrabold mb-3 text-lg uppercase tracking-wider">Total XP</h3>
                    <p className="text-4xl font-extrabold text-blue-500">{xp}</p>
                </div>
                <div className="p-8 border-2 border-b-[6px] border-slate-200 dark:border-slate-700 rounded-[2rem] bg-white dark:bg-slate-800 text-center">
                    <h3 className="text-slate-400 font-extrabold mb-3 text-lg uppercase tracking-wider">Day Streak</h3>
                    <p className="text-4xl font-extrabold text-orange-500">{streak}</p>
                </div>
            </div>

            <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3 text-slate-800 dark:text-white"><Settings size={28} /> Settings</h2>

            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between p-6 border-2 border-slate-200 dark:border-slate-700 rounded-[1.5rem] bg-white dark:bg-slate-800">
                    <span className="font-extrabold text-xl text-slate-800 dark:text-white">Learning Language</span>
                    <select className="p-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white font-bold text-lg outline-none cursor-pointer" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        {["Spanish", "French", "German", "Japanese", "Italian"].map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>

                <button onClick={toggleTheme} className="flex items-center justify-between p-6 border-2 border-b-[6px] border-slate-200 dark:border-slate-700 rounded-[1.5rem] bg-white dark:bg-slate-800 font-extrabold text-xl text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-750 transition-all active:border-b-2 active:translate-y-[4px]">
                    <span>Theme</span>{theme === 'dark' ? <Moon size={28} className="text-purple-400" /> : <Sun size={28} className="text-orange-400" />}
                </button>

                <button onClick={() => { logout(); router.push('/login'); }} className="mt-8 flex items-center justify-center gap-3 w-full p-6 border-2 border-b-[6px] border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 text-red-500 font-extrabold text-xl tracking-wider rounded-[1.5rem] hover:bg-red-100 dark:hover:bg-red-900/40 transition-all active:border-b-2 active:translate-y-[4px]">
                    <LogOut size={28} /> SIGN OUT
                </button>
            </div>
        </main>
    );
}