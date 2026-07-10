"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [name, setName] = useState("");
    const [lang, setLang] = useState("Spanish");
    const router = useRouter();

    const handleLogin = () => {
        if (!name) return;
        localStorage.setItem("user_name", name);
        localStorage.setItem("language", lang);
        router.push("/");
    };

    return (
        <main className="flex min-h-screen items-center justify-center p-6 bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border-2 border-gray-100 text-center">
                <h1 className="text-3xl font-black mb-6">Welcome!</h1>
                <input
                    className="w-full p-4 mb-4 border-2 rounded-2xl"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select className="w-full p-4 mb-6 border-2 rounded-2xl" onChange={(e) => setLang(e.target.value)}>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Japanese</option>
                </select>
                <button onClick={handleLogin} className="w-full bg-green-500 text-white font-bold py-4 rounded-2xl">Start Learning</button>
            </div>
        </main>
    );
}