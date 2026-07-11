"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { Globe2 } from "lucide-react";

export default function Login() {
    const [name, setName] = useState("");
    const [lang, setLang] = useState("Spanish");
    const login = useStore(state => state.login);
    const existingName = useStore(state => state.username);
    const router = useRouter();

    useEffect(() => {
        if (existingName) router.push("/");
    }, [existingName, router]);

    const handleLogin = () => {
        if (!name.trim()) return;
        login(name, lang);
        router.push("/");
    };

    return (
        <main className="flex min-h-screen items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 p-10 rounded-[2rem] border-2 border-b-[8px] border-slate-200 dark:border-slate-700 text-center shadow-xl">
                <Globe2 size={80} className="mx-auto text-green-500 mb-6 drop-shadow-sm" />
                <h1 className="text-4xl font-extrabold mb-2 text-slate-800 dark:text-white tracking-tight">LanguageApp</h1>
                <p className="text-slate-400 font-bold mb-10 text-lg">Free. Fun. Effective.</p>

                <input
                    className="w-full p-5 mb-4 border-2 border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900 dark:text-white font-bold text-lg outline-none focus:border-green-500 transition-colors placeholder:text-slate-400"
                    placeholder="Enter your username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />

                <select
                    className="w-full p-5 mb-10 border-2 border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900 dark:text-white font-bold text-lg outline-none cursor-pointer focus:border-green-500 transition-colors appearance-none"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                >
                    {["Spanish", "French", "German", "Japanese", "Italian"].map(l => (
                        <option key={l} value={l} className="dark:bg-slate-800">{l}</option>
                    ))}
                </select>

                <button
                    onClick={handleLogin}
                    className="w-full btn-3d-green font-extrabold text-xl py-5 rounded-2xl tracking-wider uppercase"
                >
                    START LEARNING
                </button>
            </div>
        </main>
    );
}