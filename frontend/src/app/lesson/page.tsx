"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

export default function Lesson() {
    const [exercises, setExercises] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const lang = localStorage.getItem("language") || "Spanish";

        // Auth Check
        if (!localStorage.getItem("user_name")) {
            router.push("/login");
            return;
        }

        fetch(`https://scaler-duolingo-clone.onrender.com/api/lessons/1/exercises?lang=${lang}`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    setExercises(data);
                }
            })
            .catch(console.error);
    }, [router]);

    if (exercises.length === 0) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-500" />
            </main>
        );
    }

    const current = exercises[currentIndex];

    const handleNext = () => {
        if (currentIndex < exercises.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            router.push("/");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-6 bg-white font-sans text-gray-800">
            <div className="w-full max-w-2xl">
                {/* Header/Progress */}
                <div className="flex items-center gap-4 mb-10">
                    <button onClick={() => router.push('/')} className="text-gray-400 hover:text-gray-600"><XCircle size={32} /></button>
                    <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }} />
                    </div>
                </div>

                {/* Question Title */}
                <h1 className="text-3xl font-black mb-8">{current.question_text || "Translate this sentence"}</h1>

                {/* Dynamic Rendering Logic */}
                <div className="mb-10">
                    {current.type === "translate" && (
                        <div className="flex flex-wrap gap-3">
                            {current.options.map((word: string, i: number) => (
                                <button key={i} className="p-4 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 font-bold text-xl shadow-[0_4px_0_0_#e5e7eb]">
                                    {word}
                                </button>
                            ))}
                        </div>
                    )}

                    {current.type === "match" && (
                        <div className="grid grid-cols-2 gap-4">
                            {current.pairs.map((pair: any, i: number) => (
                                <div key={i} className="contents">
                                    <button className="p-4 border-2 border-blue-200 bg-blue-50 rounded-2xl font-bold text-lg">{pair.term}</button>
                                    <button className="p-4 border-2 border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50">{pair.match}</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={handleNext}
                    className="w-full bg-green-500 text-white font-black py-4 rounded-2xl text-xl shadow-[0_6px_0_0_#46a302] hover:bg-green-600 transition-all active:translate-y-1 active:shadow-none"
                >
                    CHECK
                </button>
            </div>
        </main>
    );
}