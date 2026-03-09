import { BookOpen, Users, HelpCircle, Play, LogIn, Info, Angry, } from "lucide-react";
export default function MenuSideBlock() {
    return (
        <div className="w-80 h-100vh dark:bg-slate-900 bg-gray-200 backdrop-blur-md border-r border-slate-700 p-8 flex flex-col overflow-y-auto custom-scrollbar text-slate-200">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2  dark:bg-blue-600 bg-blue-700 rounded-lg">
                    <Info size={24} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">About</h2>
            </div>

            <div className="mb-10">
                <p className="text-slate-400 leading-relaxed mb-4">
                    <span className="text-blue-400 font-semibold">Sudoco-op</span> is a
                    platform where you and your friends can solve classic Sudoku
                    challenges in real-time
                </p>
                <div className="flex items-start gap-3 text-sm text-slate-400 italic">
                    <Users size={18} className="text-blue-500 shrink-0 mt-1" />
                    <p>
                        Shared progress, collaborative moves, and{" "}
                        <span className="text-red-400">
                            responsibility for each other's mistakes
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                    <BookOpen size={20} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">Sudoku tips</h3>
            </div>

            <ul className="space-y-6 text-sm">
                <li className="flex gap-4">
                    <p className="leading-snug">
                        Each <span className="text-white font-medium">3x3 subgrid</span>{" "}
                        must contain all digits from 1 to 9.
                    </p>
                </li>
                <li className="flex gap-4">
                    <p className="leading-snug">
                        Each <span className="text-white font-medium">row</span> and{" "}
                        <span className="text-white font-medium">column</span> must contain
                        each digit exactly once.
                    </p>
                </li>
                <li className="flex gap-4">
                    <p className="leading-snug">
                        Look for{" "}
                        <span className="text-white font-medium">rows, columns</span> and{" "}
                        <span className="text-white font-medium">3×3 boxes</span> with just
                        a few blanks remaining.
                    </p>
                </li>
                <li className="flex gap-4">
                    <p className="leading-snug ">
                        Communicate! You can see your partner's moves instantly.
                    </p>
                </li>
                <li className="flex gap-4">
                    <p className="leading-snug">
                        You only have <span className="text-red-400 font-medium">3</span>{" "}
                        possible mistakes. After last wrong number inserted grid will be
                        frozen
                    </p>
                </li>
            </ul>
        </div>
    );
}
