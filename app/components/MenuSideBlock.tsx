import React from 'react';
import { BookOpen, Users, Info } from "lucide-react";

export default function MenuSideBlock() {
  return (
    <div className="w-80 h-screen bg-[var(--bg-sidebar)] backdrop-blur-md border-r border-[var(--border-color)] p-8 flex flex-col overflow-y-auto custom-scrollbar text-[var(--text-muted)] transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[var(--primary)] rounded-lg shadow-lg shadow-blue-500/20">
          <Info size={24} className="text-[var(--text-inverse)]" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">About</h2>
      </div>

      {/* Description Section */}
      <div className="mb-10">
        <p className="leading-relaxed mb-4">
          <span className="text-[var(--primary)] font-semibold">Sudoco-op</span> is a
          platform where you and your friends can solve classic Sudoku
          challenges in real-time.
        </p>
        <div className="flex items-start gap-3 text-sm italic">
          <Users size={18} className="text-[var(--primary)] shrink-0 mt-1" />
          <p>
            Shared progress, collaborative moves, and{" "}
            <span className="text-[var(--danger)] font-medium">
              responsibility for each other's mistakes.
            </span>
          </p>
        </div>
      </div>

      {/* Tips Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-500/10 rounded-lg">
          <BookOpen size={20} className="text-[var(--accent)]" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--text-main)]">Game tips</h3>
      </div>

      {/* Tips List */}
      <ul className="space-y-6 text-sm">
        <li className="flex gap-4 group">
          <div className="w-1 h-auto bg-[var(--border-color)] group-hover:bg-[var(--primary)] transition-colors rounded-full" />
          <p className="leading-snug">
            Each <span className="text-[var(--text-main)] font-medium">3x3 subgrid</span>{" "}
            must contain all digits from 1 to 9.
          </p>
        </li>
        <li className="flex gap-4 group">
          <div className="w-1 h-auto bg-[var(--border-color)] group-hover:bg-[var(--primary)] transition-colors rounded-full" />
          <p className="leading-snug">
            Each <span className="text-[var(--text-main)] font-medium">row</span> and{" "}
            <span className="text-[var(--text-main)] font-medium">column</span> must contain
            each digit exactly once.
          </p>
        </li>
        <li className="flex gap-4 group">
          <div className="w-1 h-auto bg-[var(--border-color)] group-hover:bg-[var(--primary)] transition-colors rounded-full" />
          <p className="leading-snug">
            Look for <span className="text-[var(--text-main)] font-medium">rows, columns</span> and{" "}
            <span className="text-[var(--text-main)] font-medium">3×3 boxes</span> with just
            a few blanks remaining.
          </p>
        </li>
        <li className="flex gap-4 group">
          <div className="w-1 h-auto bg-[var(--border-color)] group-hover:bg-[var(--primary)] transition-colors rounded-full" />
          <p className="leading-snug">
            Communicate! You can see your partner's moves instantly.
          </p>
        </li>
        <li className="flex gap-4 group">
          <div className="w-1 h-auto bg-[var(--danger)] transition-colors rounded-full" />
          <p className="leading-snug">
            You only have <span className="text-[var(--danger)] font-bold">3</span>{" "}
            possible mistakes. After the last wrong number, the grid will be
            frozen.
          </p>
        </li>
      </ul>
          
    </div>
  );
}
