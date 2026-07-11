"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/useStore";
import { questionBank, Question } from "@/data/questions";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, CheckCircle2, XCircle, Timer } from "lucide-react";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import { Speaker } from "@/components/Speaker";

function LessonEngine() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') || 'guided';
    const { language, addXp } = useStore();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<any>(null);
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
    const [showHint, setShowHint] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [sessionXp, setSessionXp] = useState(0);

    // Match Question Specific State
    const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
    const [activeMatch, setActiveMatch] = useState<{ term: string | null, match: string | null }>({ term: null, match: null });
    const [shuffledTerms, setShuffledTerms] = useState<string[]>([]);
    const [shuffledMatches, setShuffledMatches] = useState<string[]>([]);

    const setupQuestion = (index: number, qs: Question[]) => {
        const q = qs[index];
        setSelected(q.type === 'rearrange' ? [] : null);
        setStatus('idle');
        setShowHint(false);
        setTimeLeft(15);
        setMatchedPairs([]);
        setActiveMatch({ term: null, match: null });

        if (q.type === 'match') {
            setShuffledTerms([...q.pairs!.map(p => p.term)].sort(() => Math.random() - 0.5));
            setShuffledMatches([...q.pairs!.map(p => p.match)].sort(() => Math.random() - 0.5));
        }
    };

    useEffect(() => {
        const bank = questionBank[language] || questionBank['Spanish'];
        const shuffled = [...bank].sort(() => Math.random() - 0.5).slice(0, 5);
        setQuestions(shuffled);
        if (shuffled.length > 0) setupQuestion(0, shuffled);
    }, [language]);

    useEffect(() => {
        if (mode === 'test' && status === 'idle' && questions.length > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) { clearInterval(timer); handleCheck(true); return 0; }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [currentIndex, mode, status, questions.length]);

    if (questions.length === 0) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400 text-2xl">Loading...</div>;
    const current = questions[currentIndex];

    const handleMatchClick = (value: string, type: 'term' | 'match') => {
        if (activeMatch.term && activeMatch.match) return;

        const newActive = { ...activeMatch, [type]: value };
        setActiveMatch(newActive);

        if (newActive.term && newActive.match) {
            const isPair = current.pairs?.find(p => p.term === newActive.term && p.match === newActive.match);
            if (isPair) {
                const newMatched = [...matchedPairs, newActive.term];
                setMatchedPairs(newMatched);
                if (newMatched.length === current.pairs?.length) {
                    setSelected(true);
                }
                setActiveMatch({ term: null, match: null });
            } else {
                setTimeout(() => setActiveMatch({ term: null, match: null }), 400);
            }
        }
    };

    const handleCheck = (timeOut = false) => {
        if (timeOut) { setStatus('wrong'); return; }
        let isCorrect = false;
        if (current.type === 'mcq' || current.type === 'listen') isCorrect = selected === current.correct;
        if (current.type === 'rearrange') isCorrect = JSON.stringify(selected) === JSON.stringify(current.correct);
        if (current.type === 'match') isCorrect = true;

        if (isCorrect) {
            setStatus('correct');
            const base = mode === 'test' ? 20 : 10;
            const bonus = mode === 'test' ? timeLeft : 0;
            setSessionXp(prev => prev + base + bonus);
        } else setStatus('wrong');
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setupQuestion(currentIndex + 1, questions);
        } else {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            addXp(sessionXp);
            toast.success(`Session Complete! +${sessionXp} XP`);
            router.push("/");
        }
    };

    return (
        <main className="flex flex-col min-h-screen w-full pb-40 pt-10 px-6">
            <div className="max-w-3xl w-full mx-auto flex items-center gap-6 mb-12">
                <button onClick={() => router.push('/')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><X size={36} /></button>
                <div className="flex-1 h-5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${(currentIndex / questions.length) * 100}%` }} />
                </div>
                {mode === 'test' && <div className={`font-extrabold flex items-center gap-2 text-2xl ${timeLeft < 5 ? 'text-red-500' : 'text-purple-500'}`}><Timer size={28} /> {timeLeft}s</div>}
            </div>

            <div className="max-w-3xl w-full mx-auto flex-1">
                <h1 className="text-3xl font-extrabold mb-8 text-slate-800 dark:text-white leading-tight">{current.prompt}</h1>
                {current.locale && <div className="mb-12"><Speaker text={current.type === 'listen' ? current.correct as string : (current.options ? current.options[0] : current.prompt)} locale={current.locale} /></div>}

                {mode === 'guided' && (
                    <div className="mb-10 p-6 bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800 rounded-[1.5rem]">
                        <button onClick={() => setShowHint(!showHint)} className="font-extrabold text-blue-500 flex items-center gap-2 text-lg uppercase tracking-wide"><HelpCircle size={24} /> Need help?</button>
                        {showHint && <p className="mt-4 text-blue-700 dark:text-blue-300 font-bold text-lg">{current.hint}</p>}
                    </div>
                )}

                {current.type === 'mcq' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {current.options?.map(opt => (
                            <button
                                key={opt} onClick={() => status === 'idle' && setSelected(opt)}
                                className={`p-6 border-2 border-b-[6px] rounded-[1.5rem] text-xl font-bold transition-all active:border-b-2 active:translate-y-[4px] ${selected === opt
                                        ? 'border-blue-400 bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:border-blue-500'
                                        : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}

                {current.type === 'rearrange' && (
                    <div className="flex flex-col gap-8">
                        <div className="min-h-[100px] border-b-2 border-slate-300 dark:border-slate-700 flex gap-3 flex-wrap pb-6">
                            {(selected || []).map((w: string, i: number) => (
                                <button key={i} onClick={() => status === 'idle' && setSelected(selected.filter((_: any, idx: number) => idx !== i))} className="p-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-b-[6px] border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-lg active:border-b-2 active:translate-y-[4px] transition-all">{w}</button>
                            ))}
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            {current.options?.filter(w => !(selected || []).includes(w)).map(w => (
                                <button key={w} onClick={() => status === 'idle' && setSelected([...(selected || []), w])} className="p-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-b-[6px] border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-lg active:border-b-2 active:translate-y-[4px] transition-all hover:bg-slate-50 dark:hover:bg-slate-700">{w}</button>
                            ))}
                        </div>
                    </div>
                )}

                {current.type === 'listen' && (
                    <input type="text" value={selected || ''} onChange={(e) => status === 'idle' && setSelected(e.target.value)} placeholder="Type what you hear..." className="w-full p-6 text-2xl font-bold border-2 border-b-[6px] border-slate-200 dark:border-slate-700 rounded-[1.5rem] bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:border-blue-400 placeholder:text-slate-300 dark:placeholder:text-slate-600" />
                )}

                {current.type === 'match' && (
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-4 w-1/2">
                            {shuffledTerms.map(term => {
                                const isMatched = matchedPairs.includes(term);
                                const isActive = activeMatch.term === term;
                                return (
                                    <button
                                        key={term} onClick={() => !isMatched && handleMatchClick(term, 'term')} disabled={isMatched}
                                        className={`p-5 md:p-6 border-2 rounded-[1.5rem] font-bold text-lg md:text-xl transition-all ${isMatched
                                                ? 'border-slate-200 bg-slate-100 text-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-600 opacity-60 border-b-2 translate-y-[4px]'
                                                : isActive
                                                    ? 'border-blue-400 bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:border-blue-500 border-b-2 translate-y-[4px]'
                                                    : 'border-b-[6px] border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 active:border-b-2 active:translate-y-[4px]'
                                            }`}
                                    >
                                        {term}
                                    </button>
                                )
                            })}
                        </div>
                        <div className="flex flex-col gap-4 w-1/2">
                            {shuffledMatches.map(match => {
                                const isMatched = !!current.pairs?.find(p => matchedPairs.includes(p.term) && p.match === match);
                                const isActive = activeMatch.match === match;
                                return (
                                    <button
                                        key={match} onClick={() => !isMatched && handleMatchClick(match, 'match')} disabled={isMatched}
                                        className={`p-5 md:p-6 border-2 rounded-[1.5rem] font-bold text-lg md:text-xl transition-all ${isMatched
                                                ? 'border-slate-200 bg-slate-100 text-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-600 opacity-60 border-b-2 translate-y-[4px]'
                                                : isActive
                                                    ? 'border-blue-400 bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:border-blue-500 border-b-2 translate-y-[4px]'
                                                    : 'border-b-[6px] border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 active:border-b-2 active:translate-y-[4px]'
                                            }`}
                                    >
                                        {match}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className={`fixed bottom-0 left-0 w-full p-8 border-t-2 z-50 transition-colors ${status === 'correct' ? 'border-green-500 bg-green-100 dark:bg-green-950 dark:border-green-800' : status === 'wrong' ? 'border-red-500 bg-red-100 dark:bg-red-950 dark:border-red-800' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'}`}>
                <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    {status === 'idle' ? (
                        <button onClick={() => handleCheck()} disabled={!selected} className="w-full md:w-auto ml-auto px-16 py-5 btn-3d-green text-xl font-extrabold uppercase rounded-2xl disabled:opacity-50 disabled:active:transform-none disabled:active:border-b-[6px]">CHECK</button>
                    ) : (
                        <>
                            <div className="flex items-center gap-6 font-extrabold text-2xl w-full md:w-auto">
                                {status === 'correct'
                                    ? <><CheckCircle2 className="text-green-500" size={56} /><span className="text-green-600 dark:text-green-400 text-3xl">Excellent!</span></>
                                    : <><XCircle className="text-red-500" size={56} /><div className="flex flex-col text-xl"><span className="text-red-600 dark:text-red-400">Correct Answer:</span><span className="font-medium text-red-500">{Array.isArray(current.correct) ? current.correct.join(' ') : current.correct}</span></div></>}
                            </div>
                            <button onClick={nextQuestion} className={`w-full md:w-auto px-16 py-5 text-xl font-extrabold uppercase rounded-2xl ${status === 'correct' ? 'btn-3d-green' : 'btn-3d-red'}`}>CONTINUE</button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
export default function Lesson() { return <Suspense fallback={<div>Loading...</div>}><LessonEngine /></Suspense>; }