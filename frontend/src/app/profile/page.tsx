"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
    const [name, setName] = useState("Guest");
    const [lang, setLang] = useState("Spanish");
    const router = useRouter();

    useEffect(() => {
        setName(localStorage.getItem("user_name") || "Guest");
        setLang(localStorage.getItem("language") || "Spanish");
    }, []);

    return (
        <main className="p-10 flex flex-col items-center min-h-screen bg-white">
            <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-black mb-4">
                {name[0].toUpperCase()}
            </div>
            <h1 className="text-3xl font-black text-gray-800">{name}</h1>
            <p className="text-gray-500 font-bold mb-6">Learning: {lang}</p>

            <button
                onClick={() => { localStorage.clear(); router.push('/login'); }}
                className="mt-6 px-6 py-3 bg-red-100 text-red-500 font-bold rounded-2xl hover:bg-red-200 transition-colors"
            >
                Log Out
            </button>
        </main>
    );
}