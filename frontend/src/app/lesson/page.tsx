"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { XCircle, Mic, HelpCircle } from "lucide-react";

export default function Lesson() {
    const [exercises, setExercises] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [transcript, setTranscript] = useState("");
    const router = useRouter();

    useEffect(() => {
        const lang = localStorage.getItem("language") || "Spanish";
        fetch(`https://scaler-duolingo-clone.onrender.com/api/lessons/1/exercises?lang=${lang}`)
            .then((res) => res.json())
            .then(setExercises);
    }, []);

    // Speech Recognition Setup
    const startListening = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.onresult = (event: any) => {
                setTranscript(event.results[0][0].transcript);
            };
            recognition.start();
        } else {
            alert("Microphone not supported in this browser.");
        }
    };

    if (exercises.length === 0) return <div className="p-20 text-center">Loading Content...</div>;

    const current = exercises[currentIndex];

    const handleNext = () => {
        setShowHint(false);
        setTranscript("");
        if (currentIndex < exercises.length - 1) setCurrentIndex(currentIndex + 1);
        else router.push("/");
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-6 bg-white font-sans text-gray-800">
            <div className="w-full max-w-2xl">
                <div className="flex items-center gap-4 mb-10">
                    <button onClick={() => router.push('/')}><XCircle size={32} /></button>
                    <div className="h-4 w-full bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full" style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }} /></div>
                </div>

                <h1 className="text-3xl font-black mb-6">{current.question_text}</h1>

                {/* Hint Box */}
                <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl">
                    <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                        <HelpCircle size={20} /> {showHint ? "Hide Hint" : "Need help?"}
                    </button>
                    {showHint && <p className="text-blue-600">{current.hint}</p>}
                </div>

                {/* Mic Practice */}
                <div className="mb-10 p-6 border-2 border-dashed border-gray-300 rounded-3xl text-center">
                    <button onClick={startListening} className="bg-gray-100 p-4 rounded-full mb-4 hover:bg-gray-200"><Mic size={32} /></button>
                    <p className="font-bold text-gray-500">{transcript || "Tap mic to practice pronunciation"}</p>
                </div>

                {/* Answer Options */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {current.options.map((word: string, i: number) => (
                        <button key={i} className="p-4 border-2 border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50">{word}</button>
                    ))}
                </div>

                <button onClick={handleNext} className="w-full bg-green-500 text-white font-black py-4 rounded-2xl text-xl shadow-[0_6px_0_0_#46a302] hover:bg-green-600">
                    CHECK
                </button>
            </div>
        </main>
    );
}