"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Lesson() {
    const [exercises, setExercises] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const lang = localStorage.getItem("language") || "Spanish";
        // Fetching exercises for the selected language
        fetch(`https://scaler-duolingo-clone.onrender.com/api/lessons/1/exercises?lang=${lang}`)
            .then((res) => res.json())
            .then(setExercises);
    }, []);

    if (exercises.length === 0) return <div className="p-10 text-center">Loading Lesson...</div>;

    const currentExercise = exercises[currentIndex];

    const renderExercise = () => {
        // FIX: Handling Match type explicitly
        if (currentExercise.type === "match") {
            return (
                <div className="grid grid-cols-2 gap-4">
                    {currentExercise.pairs.map((pair: any, i: number) => (
                        <div key={i} className="flex flex-col gap-2">
                            <button className="p-4 border-2 rounded-2xl hover:bg-blue-50">{pair.term}</button>
                            <button className="p-4 border-2 rounded-2xl hover:bg-blue-50">{pair.match}</button>
                        </div>
                    ))}
                </div>
            );
        }
        return <p>MCQ/Translation question goes here...</p>;
    };

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-black mb-8">{currentExercise.question}</h1>
            {renderExercise()}
            <button className="mt-10 w-full bg-green-500 text-white font-black py-4 rounded-2xl">CHECK</button>
        </main>
    );
}