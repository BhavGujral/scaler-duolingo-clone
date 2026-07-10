"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
    const [name, setName] = useState("");
    const router = useRouter();

    useEffect(() => {
        setName(localStorage.getItem("user_name") || "Guest");
    }, []);

    const changeLanguage = (lang: string) => {
        localStorage.setItem("language", lang);
        router.push("/");
    };

    return (
        <main className="p-10 max-w-md mx-auto">
            <h1 className="text-3xl font-black mb-6">Profile: {name}</h1>
            <div className="flex flex-col gap-4">
                <button onClick={() => router.push('/')} className="p-4 bg-blue-500 text-white rounded-2xl font-bold">Back to Home</button>
                <div className="border-t pt-6 mt-6">
                    <h2 className="font-bold mb-2">Change Language:</h2>
                    {['Spanish', 'French', 'German'].map(lang => (
                        <button key={lang} onClick={() => changeLanguage(lang)} className="block w-full p-3 mb-2 border rounded-xl">{lang}</button>
                    ))}
                </div>
                <button onClick={() => { localStorage.clear(); router.push('/login'); }} className="text-red-500 font-bold mt-10">Log Out</button>
            </div>
        </main>
    );
}