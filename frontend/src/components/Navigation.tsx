"use client";
import { Home, Trophy, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function Navigation() {
    const router = useRouter();
    const pathname = usePathname();
    if (pathname === '/login' || pathname === '/lesson') return null;

    const navs = [{ path: '/', icon: Home, label: "LEARN" }, { path: '/leaderboard', icon: Trophy, label: "LEAGUE" }, { path: '/profile', icon: User, label: "PROFILE" }];

    return (
        <nav className="fixed bottom-0 left-0 flex w-full justify-around border-t-2 border-slate-200 bg-white p-3 z-50 md:w-24 md:h-screen md:flex-col md:justify-start md:gap-6 md:border-t-0 md:border-r-2 md:pt-10 dark:bg-slate-900 dark:border-slate-800">
            {navs.map((nav) => (
                <button
                    key={nav.path}
                    onClick={() => router.push(nav.path)}
                    className={`flex flex-col items-center justify-center p-3 w-full rounded-2xl transition-all ${pathname === nav.path
                            ? 'text-green-500 bg-green-50 border-2 border-green-200 dark:bg-green-900/20 dark:border-green-900/50'
                            : 'text-slate-400 hover:bg-slate-100 border-2 border-transparent dark:hover:bg-slate-800'
                        }`}
                >
                    <nav.icon size={32} strokeWidth={2.5} />
                    <span className="text-[10px] font-black mt-1 hidden md:block tracking-wider">{nav.label}</span>
                </button>
            ))}
        </nav>
    );
}