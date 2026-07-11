"use client";
import { Volume2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function Speaker({ text, locale }: { text: string; locale: string }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const play = () => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = locale;
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <button onClick={play} className="relative p-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 transition-transform active:scale-95">
            {isPlaying && <motion.div initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-blue-400 rounded-full" />}
            <Volume2 size={28} className="relative z-10" />
        </button>
    );
}