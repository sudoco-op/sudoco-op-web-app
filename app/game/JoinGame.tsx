import React from "react"
import { Link } from "react-router"
import { House } from "lucide-react"

export const JoinGame = () => {
    return (
        <div className="relative min-h-screen w-full flex flex-col justify-between 
                font-sans text-(--text-main) overflow-hidden transition-colors duration-300
                bg-linear-to-b from-(--bg-card) to-(--bg-main) 
                ">

            <div className="w-full h-full py-3 bg-[var(--bg-sidebar)] backdrop-blur-md border-b border-[var(--border-color)]">
                <Link to="/">
                    <House className="mx-4" size={36} />
                </Link>
            </div>

            <div className="text-center space-y-4 mb-16">
                <h1 className="text-6xl font-black bg-clip-text text-transparent bg-linear-to-t from-(--text-main) to-(--text-muted) ">
                    SUDOCO-OP
                </h1>
                <p className="text-(--text-muted) uppercase tracking-[0.5em] text-xs font-bold opacity-80">
                    Cooperative Sudoku Platform
                </p>

            </div>

            <div>

            </div>
            <div>

            </div>
        </div>
    )
}
