import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Bot = { id: string; username: string; xp: number; avatar: string };

interface AppState {
    username: string | null;
    language: string;
    theme: 'light' | 'dark';
    xp: number;
    streak: number;
    joinDate: string;
    bots: Bot[];
    login: (username: string, language: string) => void;
    logout: () => void;
    setLanguage: (lang: string) => void;
    toggleTheme: () => void;
    addXp: (amount: number) => void;
    initializeBots: () => void;
    tickBots: () => void;
}

const generateBots = (): Bot[] => {
    const names = ["Virat_Superfan", "ChainFlexer", "CPP_23_Dev", "Ryu_Admin", "AlgoPro", "LanguageLover", "Polyglot99", "WordWizard", "SyntaxSamurai", "GrammarGuru"];
    const bots: Bot[] = [];
    for (let i = 0; i < 50; i++) {
        bots.push({
            id: `bot-${i}`,
            username: names[i % names.length] + Math.floor(Math.random() * 1000),
            xp: Math.floor(Math.random() * 5000) + 100,
            avatar: String.fromCharCode(65 + Math.floor(Math.random() * 26))
        });
    }
    return bots.sort((a, b) => b.xp - a.xp);
};

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            username: null, language: 'Spanish', theme: 'light', xp: 0, streak: 1, joinDate: new Date().toISOString(), bots: [],
            login: (username, language) => set({ username, language, joinDate: new Date().toISOString() }),
            logout: () => set({ username: null, xp: 0 }),
            setLanguage: (language) => set({ language }),
            toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
            addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
            initializeBots: () => { if (get().bots.length === 0) set({ bots: generateBots() }); },
            tickBots: () => set((state) => {
                const newBots = state.bots.map(bot => ({ ...bot, xp: Math.random() > 0.8 ? bot.xp + Math.floor(Math.random() * 15) : bot.xp })).sort((a, b) => b.xp - a.xp);
                return { bots: newBots };
            })
        }),
        { name: 'language-app-storage' }
    )
);