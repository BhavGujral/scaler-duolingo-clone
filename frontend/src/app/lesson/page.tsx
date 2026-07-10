"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, CheckCircle, XCircle } from "lucide-react";

export default function Lesson() {
    const [exercises, setExercises] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
    const router = useRouter();

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [wordBank, setWordBank] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [typedAnswer, setTypedAnswer] = useState("");

    useEffect(() => {
        fetch("https://scaler-duolingo-clone.onrender.com/api/lessons/1/exercises")
            .then((res) => res.json())
            .then((data) => {
                setExercises(data);
                setupExercise(data[0]);
            });
    }, []);

    const setupExercise = (exercise: any) => {
        setStatus("idle");
        setSelectedOption(null);
        setSelectedWords([]);
        setTypedAnswer("");
        if (exercise?.type === "translate") {
            setWordBank(exercise.options);
        }
    };

    if (exercises.length === 0) return <div className="flex min-h-screen items-center justify-center text-xl font-bold text-gray-400">Loading advanced lesson...</div>;

    const currentExercise = exercises[currentIndex];

    const playAudio = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "es-ES";
        window.speechSynthesis.speak(utterance);
    };

    const checkAnswer = () => {
        let isCorrect = false;
        if (currentExercise.type === "multiple-choice" || currentExercise.type === "fill-blank") {
            isCorrect = selectedOption === currentExercise.correct_answer;
        } else if (currentExercise.type === "translate") {
            isCorrect = JSON.stringify(selectedWords) === currentExercise.correct_answer;
        } else if (currentExercise.type === "type-answer") {
            isCorrect = typedAnswer.toLowerCase().trim() === currentExercise.correct_answer.toLowerCase().trim();
        } else if (currentExercise.type === "match") {
            isCorrect = true;
        }

        setStatus(isCorrect ? "correct" : "incorrect");
    };

    const nextExercise = async () => {
        if (currentIndex + 1 < exercises.length) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setupExercise(exercises[nextIndex]);
        } else {
            await fetch("https://scaler-duolingo-clone.onrender.com/api/lessons/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ xp_gained: 25 }),
            });
            router.push("/");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center bg-white p-6 font-sans text-gray-800">
            <div className="w-full max-w-3xl flex-grow pt-4">
                <div className="flex items-center gap-4 mb-10">
                    <button onClick={() => router.push('/')} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <XCircle size={32} />
                    </button>
                    <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-green-500"
                            initial={{ width: `${(currentIndex / exercises.length) * 100}%` }}
                            animate={{ width: `${((currentIndex + (status === "correct" ? 1 : 0)) / exercises.length) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                    <h1 className="text-3xl font-black tracking-tight">{currentExercise.question_text}</h1>
                    <button onClick={() => playAudio(currentExercise.question_text)} className="w-fit p-3 text-blue-500 border-2 border-blue-500 hover:bg-blue-50 rounded-2xl transition-colors shadow-[0_4px_0_0_#3b82f6] active:translate-y-1 active:shadow-[0_0_0_0_#3b82f6]">
                        <Volume2 size={28} />
                    </button>
                </div>

                {(currentExercise.type === "multiple-choice" || currentExercise.type === "fill-blank") && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {currentExercise.options.map((option: string) => (
                            <button
                                key={option}
                                onClick={() => setSelectedOption(option)}
                                disabled={status !== "idle"}
                                className={`button-3d rounded-2xl border-2 p-6 text-xl font-bold transition-all ${selectedOption === option
                                        ? "border-blue-400 bg-blue-50 text-blue-500 shadow-[0_4px_0_0_#60a5fa]"
                                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-[0_4px_0_0_#e5e7eb]"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}

                {currentExercise.type === "translate" && (
                    <div className="flex flex-col gap-8">
                        <div className="min-h-[80px] border-b-2 border-gray-200 flex gap-2 flex-wrap items-end pb-4">
                            {selectedWords.map((word, i) => (
                                <motion.button layout key={`sel-${i}`} onClick={() => {
                                    if (status !== "idle") return;
                                    setSelectedWords(selectedWords.filter((_, idx) => idx !== i));
                                    setWordBank([...wordBank, word]);
                                }} className="button-3d rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-lg font-bold shadow-[0_4px_0_0_#e5e7eb]">
                                    {word}
                                </motion.button>
                            ))}
                        </div>
                        <div className="flex gap-3 flex-wrap justify-center">
                            {wordBank.map((word, i) => (
                                <motion.button layout key={`bank-${i}`} onClick={() => {
                                    if (status !== "idle") return;
                                    setWordBank(wordBank.filter((_, idx) => idx !== i));
                                    setSelectedWords([...selectedWords, word]);
                                }} className="button-3d rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-lg font-bold hover:bg-gray-50 shadow-[0_4px_0_0_#e5e7eb]">
                                    {word}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}

                {currentExercise.type === "type-answer" && (
                    <textarea
                        disabled={status !== "idle"}
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 p-6 text-xl font-bold focus:border-blue-400 focus:bg-white focus:outline-none transition-colors shadow-inner"
                        rows={4}
                        placeholder="Type your answer here..."
                    />
                )}

                {currentExercise.type === "match" && (
                    <div className="p-6 bg-blue-50 text-blue-500 font-bold rounded-3xl text-center border-2 border-blue-200 text-xl">
                        Select matching pairs (Click CHECK to proceed)
                    </div>
                )}
            </div>

            <AnimatePresence>
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    className={`fixed bottom-0 left-0 w-full p-6 sm:p-10 border-t-2 z-50 ${status === "correct" ? "bg-green-100 border-green-500" : status === "incorrect" ? "bg-red-100 border-red-500" : "bg-white border-gray-200"
                        }`}
                >
                    <div className="mx-auto flex flex-col sm:flex-row max-w-4xl items-center justify-between gap-6">
                        <div className="text-2xl font-black flex items-center gap-4 w-full sm:w-auto">
                            {status === "correct" && <><CheckCircle size={40} className="text-green-500" /> <span className="text-green-500 text-3xl">Excellent!</span></>}
                            {status === "incorrect" && <><XCircle size={40} className="text-red-500" /> <div className="flex flex-col"><span className="text-red-500 text-2xl">Correct solution:</span><span className="text-red-600 font-bold text-xl">{currentExercise.correct_answer}</span></div></>}
                        </div>

                        {status === "idle" ? (
                            <button
                                onClick={checkAnswer}
                                className="button-3d w-full sm:w-auto rounded-full bg-green-500 px-16 py-4 text-xl font-black text-white shadow-[0_4px_0_0_#46a302] disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                            >
                                CHECK
                            </button>
                        ) : (
                            <button
                                onClick={nextExercise}
                                className={`button-3d w-full sm:w-auto rounded-full px-16 py-4 text-xl font-black text-white ${status === "correct" ? "bg-green-500 shadow-[0_4px_0_0_#46a302]" : "bg-red-500 shadow-[0_4px_0_0_#b91c1c]"}`}
                            >
                                CONTINUE
                            </button>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </main>
    );
}