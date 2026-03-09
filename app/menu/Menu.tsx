import { Link } from "react-router";
import { BookOpen, Users, SquareChevronRight, Play, LogIn, Info } from "lucide-react";
import MenuSideBlock from "~/components/MenuSideBlock";

export function Menu() {
    return (
        <div className="min-h-screen w-screen bg-slate-950 flex font-sans text-white overflow-hidden">
            {/* SideBlock component */}
            <MenuSideBlock />
            <main className="flex-1 flex flex-col items-center justify-center relative">

                <div className="text-center space-y-2 mb-16">
                    <h1 className="text-7xl  font-black  bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
                        SUDOCO-OP
                    </h1>
                    <p className="text-slate-500 uppercase tracking-[0.4em] text-sm font-semibold text-center">
                        Cooperative sudoku Platform
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-sm px-6">
                    {/* Button to Create game page*/}
                    <Link to="/create-game">
                        <button className="group w-full relative flex items-center justify-between p-5 bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded-2xl shadow-lg shadow-blue-900/20 active:scale-[0.98]">
                            <div className="flex items-center gap-4">
                                <Play
                                    className="fill-white group-hover:translate-x-1 transition-transform"
                                    size={20}
                                />
                                <span className="text-lg font-bold">Create Game</span>
                            </div>
                            <div className="text-[10px] bg-white/20 px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                                Host
                            </div>
                        </button>
                    </Link>

                    {/* Button to Join game page */}
                    <Link to="/join-game">
                        <button className="group w-full flex items-center justify-between p-5 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all duration-300 rounded-2xl active:scale-[0.98]">
                            <div className="flex items-center gap-4">
                                <LogIn
                                    className="text-slate-400 group-hover:text-white transition-colors"
                                    size={20}
                                />
                                <span className="text-lg font-bold">Join Game</span>
                            </div>
                        </button>
                    </Link>
                </div>

                {/* GIthub repo link */}
                <div className="absolute bottom-10 flex gap-8 text-slate-500 text-xs font-bold">
                    <Link to="https://github.com/sudoco-op" target="_blank">
                        <button className="hover:text-white transition-colors uppercase tracking-[0.2em]">
                            GitHub Project
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
