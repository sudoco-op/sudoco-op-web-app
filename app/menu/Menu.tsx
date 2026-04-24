import { Link } from 'react-router';
import { Play, LogIn } from "lucide-react";
import MenuSideBlock from '~/components/MenuSideBlock';


export function Menu() {
    return (
        <div className="min-h-screen w-screen
            animate-float-bg bg-radial-[at_75%_var(--bg-pos)] from-(--bg-main) to-(--bg-card)
            font-sans text-(--text-main) overflow-hidden transition-colors duration-300
            flex flex-col-reverse md:flex-row"
        >
            {/* SideBlock component */}
            <MenuSideBlock />

            <main className="flex flex-col items-center justify-center relative mx-auto py-4 gap-12 my-20 md:my-0">
                <div className="flex-1 flex flex-col items-center justify-center relative">
                    <div className="text-center space-y-4 mb-16">
                        <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-linear-to-b from-(--text-main) to-(--text-muted)">
                            SUDOCO-OP
                        </h1>
                        <p className="text-(--text-muted) uppercase tracking-[0.5em] text-xs font-bold opacity-80">
                            Cooperative Sudoku Platform
                        </p>
                    </div>

                    <div className="flex flex-col gap-5 w-full max-w-sm px-6">
                        <Link to="/create-game">
                            <button className="group w-full relative flex items-center justify-between p-6 bg-(--primary) hover:bg-(--primary-hover) text-(--text-inverse) transition-all duration-300 rounded-2xl shadow-xl shadow-blue-500/30 dark:shadow-purple-500/20 active:scale-[0.98]">
                                <div className="flex items-center gap-4">
                                    <Play className="fill-current group-hover:translate-x-1 transition-transform" size={20} />
                                    <span className="text-xl font-bold">Create Game</span>
                                </div>
                                <div className="text-[10px] bg-white/20 px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                                    Host
                                </div>
                            </button>
                        </Link>

                        <Link to="/join-game">
                            <button className="group w-full flex items-center justify-between p-6 bg-(--bg-card) hover:border-(--primary) border border-(--border-color) text-(--text-main) transition-all duration-300 rounded-2xl active:scale-[0.98] shadow-sm">
                                <div className="flex items-center gap-4">
                                    <LogIn className="text-(--text-muted) group-hover:text-(--primary) transition-colors" size={20} />
                                    <span className="text-xl font-bold">Join Game</span>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>

                <Link to="https://github.com/sudoco-op" target="_blank">
                    <button className="text-(--text-muted) hover:text-(--primary) transition-all text-xs font-bold uppercase tracking-[0.3em] py-2 px-4 border-b border-transparent hover:border-(--primary)">
                        GitHub Project
                    </button>
                </Link>
            </main>
        </div>
    );
}
