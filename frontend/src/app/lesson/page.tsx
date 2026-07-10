"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { XCircle, Volume2, HelpCircle } from "lucide-react";

export default function Lesson() {
    const [exercises, setExercises] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [showHint, setShowHint] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const lang = localStorage.getItem("language") || "Spanish";
        fetch(`https://scaler-duolingo-clone.onrender.com/api/lessons/1/exercises?lang=${lang}`)
            .then((res) => res.json())
            .then(setExercises);
    }, []);

    const current = exercises[currentIndex];

    // Text-to-Speech
    const speakQuestion = () => {
        const utterance = new SpeechSynthesisUtterance(current.question_text);
        window.speechSynthesis.speak(utterance);
    };

    const handleWordClick = (word: string) => {
        setSelectedWords([...selectedWords, word]);
    };

    const checkAnswer = () => {
        if (JSON.stringify(selectedWords) === JSON.stringify(current.correct)) {
            alert("Correct!");
            setSelectedWords([]);
            if (currentIndex < exercises.length - 1) setCurrentIndex(currentIndex + 1);
            else router.push("/");
        } else {
            alert("Try again!");
            setSelectedWords([]);
        }
    };

    if (exercises.length === 0) return <div className="p-20 text-center">Loading...</div>;

    return (
        <main className="flex min-h-screen flex-col items-center p-6 bg-white font-sans text-gray-800">
            <div className="w-full max-w-2xl">
                <div className="flex items-center gap-4 mb-10">
                    <button onClick={() => router.push('/')}><XCircle size={32} /></button>
                    <div className="h-4 w-full bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full" style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }} /></div>
                </div>

                <h1 className="text-3xl font-black mb-6">{current.question_text}</h1>
                <button onClick={speakQuestion} className="bg-blue-100 p-3 rounded-full mb-6"><Volume2 size={24} className="text-blue-600" /></button>

                <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl">
                    <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-2 text-blue-700 font-bold"><HelpCircle size={20} /> Need help?</button>
                    {showHint && <p className="text-blue-600 mt-2">{current.hint}</p>}
                </div>

                <div className="min-h-[60px] border-b-2 border-gray-300 mb-8 flex gap-2">
                    {selectedWords.map((w, i) => <span key={i} className="p-3 bg-gray-100 rounded-lg font-bold">{w}</span>)}
                </div>

                <div className="flex flex-wrap gap-3 mb-10">
                    {current.options.map((word: string, i: number) => (
                        <button key={i} onClick={() => handleWordClick(word)} className="p-4 border-2 border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-100">{word}</button>
                    ))}
                </div>

                <button onClick={checkAnswer} className="w-full bg-green-500 text-white font-black py-4 rounded-2xl text-xl hover:bg-green-600">
                    CHECK
                </button>
            </div>
        </main>
    );
}