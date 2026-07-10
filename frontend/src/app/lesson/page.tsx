"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Lesson() {
    const [exercises, setExercises] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const lang = localStorage.getItem("language") || "Spanish";
        fetch(`https://scaler-duolingo-clone.onrender.com/api/lessons/1/exercises?lang=${lang}`)
            .then(res => res.json())
            .then(setExercises);
    }, []);

    if (exercises.length === 0) return <div>Loading...</div>;
    const current = exercises[currentIndex];

    const submit = async (isCorrect: boolean) => {
        if (isCorrect) {
            if (currentIndex < exercises.length - 1) setCurrentIndex(currentIndex + 1);
            else {
                await fetch("https://scaler-duolingo-clone.onrender.com/api/leaderboard/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: localStorage.getItem("user_name"), xp: 100 })
                });
                router.push("/");
            }
        } else alert("Wrong!");
    };

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">{current.question_text}</h2>

            {/* Translation Type */}
            {current.type === "translate" && (
                <div className="flex gap-2">{current.options.map((w: string) => <button key={w} className="p-4 border rounded-xl">{w}</button>)}</div>
            )}

            {/* Choice Type */}
            {current.type === "choice" && (
                <div className="flex flex-col gap-2">{current.options.map((opt: string) => <button key={opt} onClick={() => submit(opt === current.correct)} className="p-4 border rounded-xl">{opt}</button>)}</div>
            )}

            {/* Match Type */}
            {current.type === "match" && (
                <div className="grid grid-cols-2 gap-4">{current.pairs.map((p: any) => <button key={p.term} className="p-4 border rounded-xl">{p.term} - {p.match}</button>)}</div>
            )}
        </main>
    );
}