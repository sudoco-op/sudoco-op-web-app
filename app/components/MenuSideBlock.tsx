import { BookOpen, Users, HelpCircle, Play, LogIn, Info, Angry } from 'lucide-react';
export default function MenuSideBlock() {
 return (
    <div className="w-80 h-full bg-slate-900/50 backdrop-blur-md border-r border-slate-700 p-8 flex flex-col overflow-y-auto custom-scrollbar text-slate-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Info size={24} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">About</h2>
      </div>

      <div className="mb-10">
        <p className="text-slate-400 leading-relaxed mb-4">
          <span className="text-blue-400 font-semibold">Sudoco-op</span> is a platform where you and your friends can solve classic Sudoku challenges in real-time
        </p>
        <div className="flex items-start gap-3 text-sm text-slate-400 italic">
          <Users size={18} className="text-blue-500 shrink-0 mt-1" />
          <p>Shared progress, collaborative moves, and <span className='text-red-400'>responsibility for each other's mistakes</span></p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-500/20 rounded-lg">
          <BookOpen size={20} className="text-amber-500" />
        </div>
        <h3 className="text-xl font-semibold text-white">How to Play?</h3>
      </div>

      <ul className="space-y-6 text-sm">
        <li className="flex gap-4">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 border border-slate-600 shrink-0 text-xs font-bold text-blue-400">1</span>
          <p className="leading-snug">Fill the grid with numbers from <span className="text-white font-medium">1 to 9</span>.</p>
        </li>
        <li className="flex gap-4">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 border border-slate-600 shrink-0 text-xs font-bold text-blue-400">2</span>
          <p className="leading-snug">Each <span className="text-white font-medium">row</span> and <span className="text-white font-medium">column</span> must contain each digit exactly once.</p>
        </li>
        <li className="flex gap-4">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 border border-slate-600 shrink-0 text-xs font-bold text-blue-400">3</span>
          <p className="leading-snug">Each <span className="text-white font-medium">3x3 subgrid</span> must contain all digits from 1 to 9.</p>
        </li>
        <li className="flex gap-4">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 border border-slate-600 shrink-0 text-xs font-bold text-blue-400">4</span>
          <p className="leading-snug text-slate-400">Communicate! You can see your partner's moves instantly.</p>
        </li>
      </ul>

      <div className="mt-auto pt-10 border-t border-slate-800 flex justify-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold text-center">
          Beta v0.1.0 • Built with passion
        </p>
      </div>
    </div>
  );
}
