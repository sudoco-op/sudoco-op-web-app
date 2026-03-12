import { useState } from "react";

const DifficultyButton = ({ difName, isActive, onClick }: { difName: string, isActive: boolean, onClick: () => void }) => (
    <button className={`
        border-4 border-[var(--border-color)] py-4 px-10 rounded-lg 
        hover:cursor-pointer transition-all 
        ${isActive && "bg-[var(--primary)] scale-125"}
    `}
        onClick={onClick}
    >{difName}</button>
);


export const CreateGame = () => {
    const [activeDifficulty, setActiveDifficulty] = useState<0 | 1 | 2>(1);
    return (
        <div className="min-h-screen w-screen bg-(--bg-main) flex flex-col justify-center items-center gap-60 font-sans text-(--text-main) overflow-hidden transition-colors duration-300 ">
            <div className="flex gap-40">
                <DifficultyButton difName="Easy" isActive={activeDifficulty == 0} onClick={() => setActiveDifficulty(0)} />
                <DifficultyButton difName="Meadium" isActive={activeDifficulty == 1} onClick={() => setActiveDifficulty(1)} />
                <DifficultyButton difName="Hard" isActive={activeDifficulty == 2} onClick={() => setActiveDifficulty(2)} />
            </div>

            <button className="border-4 border-[var(--border-color)] py-5 px-14 hover:cursor-pointer bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg">Start</button>
        </div>
    )
}
