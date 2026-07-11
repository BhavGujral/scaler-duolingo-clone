"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { Flame, Heart, Gem, Lock, Check, BookOpen, Crown, Star } from "lucide-react";

const PATH_DATA = [
  {
    unit: 1,
    title: "Unit 1",
    description: "Form basic sentences, greet people",
    color: "bg-green-500",
    borderColor: "border-green-600",
    textColor: "text-green-500",
    skills: [
      { id: 1, icon: Star },
      { id: 2, icon: BookOpen },
      { id: 3, icon: Star },
      { id: 4, icon: Crown },
    ]
  },
  {
    unit: 2,
    title: "Unit 2",
    description: "Navigate the city, order at restaurants",
    color: "bg-blue-500",
    borderColor: "border-blue-600",
    textColor: "text-blue-500",
    skills: [
      { id: 5, icon: Star },
      { id: 6, icon: BookOpen },
      { id: 7, icon: Star },
      { id: 8, icon: Star },
      { id: 9, icon: Crown },
    ]
  },
  {
    unit: 3,
    title: "Unit 3",
    description: "Discuss travel plans, book hotels",
    color: "bg-purple-500",
    borderColor: "border-purple-600",
    textColor: "text-purple-500",
    skills: [
      { id: 10, icon: Star },
      { id: 11, icon: BookOpen },
      { id: 12, icon: Star },
      { id: 13, icon: Crown },
    ]
  }
];

export default function Home() {
  const { username, language, xp, streak, hearts, gems, completedLessons, initializeBots } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!username) router.push("/login");
    initializeBots();
  }, [username, router, initializeBots]);

  if (!username) return null;

  const allSkillIds = PATH_DATA.flatMap(u => u.skills.map(s => s.id));
  const currentSkillId = allSkillIds.find(id => !completedLessons.includes(id)) || allSkillIds[allSkillIds.length - 1];

  const getOffset = (index: number) => {
    const positions = [0, 1, 1.5, 1, 0, -1, -1.5, -1];
    return positions[index % positions.length] * 45;
  };

  return (
    <main className="w-full min-h-screen">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 flex justify-between items-center p-4 md:p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800">
        <div className="font-extrabold text-2xl text-slate-800 dark:text-white flex items-center gap-2">
          <span>{language === 'Spanish' ? '🇪🇸' : language === 'French' ? '🇫🇷' : language === 'German' ? '🇩🇪' : language === 'Japanese' ? '🇯🇵' : language === 'Italian' ? '🇮🇹' : '🌍'}</span>
        </div>
        <div className="flex gap-4 md:gap-8">
          <div className="flex items-center gap-1.5 font-extrabold text-red-500 text-lg md:text-xl"><Heart fill="currentColor" size={24} /> {hearts}</div>
          <div className="flex items-center gap-1.5 font-extrabold text-blue-400 text-lg md:text-xl"><Gem fill="currentColor" size={24} /> {gems}</div>
          <div className="flex items-center gap-1.5 font-extrabold text-orange-500 text-lg md:text-xl"><Flame fill="currentColor" size={24} /> {streak}</div>
        </div>
      </header>

      {/* Path Area */}
      <div className="max-w-2xl mx-auto p-6 pt-8 pb-32 flex flex-col items-center">
        {PATH_DATA.map((unit) => (
          <div key={unit.unit} className="w-full mb-12">
            {/* Unit Header */}
            <div className={`${unit.color} rounded-[2rem] p-6 md:p-8 mb-10 text-white border-b-[6px] border-black/20 flex justify-between items-center`}>
              <div>
                <h2 className="text-3xl font-extrabold mb-2 tracking-tight">{unit.title}</h2>
                <p className="font-bold text-lg opacity-90">{unit.description}</p>
              </div>
              <button className="bg-black/20 p-4 rounded-2xl font-extrabold hover:bg-black/30 transition-colors active:scale-95">
                <BookOpen size={32} />
              </button>
            </div>

            {/* Unit Skills */}
            <div className="flex flex-col items-center gap-6 relative">
              {unit.skills.map((skill, index) => {
                const isCompleted = completedLessons.includes(skill.id);
                const isCurrent = skill.id === currentSkillId;
                const isLocked = !isCompleted && !isCurrent;

                return (
                  <div key={skill.id} className="relative z-10 my-2" style={{ transform: `translateX(${getOffset(index)}px)` }}>
                    {isCurrent && (
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl font-extrabold text-green-500 tracking-wider uppercase animate-bounce z-20 shadow-md">
                        START
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-b-2 border-r-2 border-slate-200 dark:border-slate-700 rotate-45"></div>
                      </div>
                    )}

                    <button
                      disabled={isLocked}
                      onClick={() => router.push(`/lesson?mode=guided&id=${skill.id}`)}
                      className={`relative flex items-center justify-center w-[85px] h-[85px] md:w-[95px] md:h-[95px] rounded-full border-b-[8px] transition-all
                        ${isCompleted ? 'bg-yellow-400 border-yellow-500 text-white active:border-b-0 active:translate-y-[8px]' :
                          isCurrent ? `${unit.color} ${unit.borderColor} text-white active:border-b-0 active:translate-y-[8px]` :
                            'bg-slate-200 border-slate-300 text-slate-400 dark:bg-slate-700 dark:border-slate-800 dark:text-slate-500 cursor-not-allowed'
                        }
                      `}
                    >
                      {/* Inner Ring effect for current skill */}
                      {isCurrent && (
                        <div className="absolute -inset-3 border-4 border-slate-200 dark:border-slate-700 rounded-full animate-[spin_4s_linear_infinite]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}></div>
                      )}

                      {/* Icon */}
                      {isLocked ? <Lock size={36} /> : isCompleted ? <Check size={44} strokeWidth={4} /> : <skill.icon size={36} fill={isCompleted || isCurrent ? "currentColor" : "none"} />}

                      {/* Crown badge if completed */}
                      {isCompleted && (
                        <div className="absolute -bottom-2 -right-2 bg-yellow-500 border-2 border-white dark:border-slate-900 rounded-full p-1 shadow-sm">
                          <Crown size={16} fill="white" className="text-white" />
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}