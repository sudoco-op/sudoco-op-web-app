import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "~/api/api";
import { setUserToken } from "~/auth/auth";
import FooterBlock from "~/components/FooterBlock";
import HeaderBlock from "~/components/HeaderBlock";

const DifficultyButton = ({ difName, isActive, onClick }: { difName: string, isActive: boolean, onClick: () => void }) => (
    <button
        className={`
            relative z-10 py-3 px-8 
            flex-1 text-center
            hover:cursor-pointer transition-colors duration-300
            ${isActive ? "text-(--text-main)" : "text-[var(--text-secondary)]"}
        `}
        onClick={onClick}
    >
        {difName}
    </button>
);


export const CreateGame = () => {
    const navigate = useNavigate();

    const startGame = async () => {
        const response = await api.createGame();
        setUserToken(response.userJwt);
        navigate(`/game-lobby/${response.game.id}`);
    }

    const [activeDifficulty, setActiveDifficulty] = useState<0 | 1 | 2>(1);
    return (
        <div className="min-h-screen w-screen 
        animate-float-bg bg-radial-[at_var(--bg-pos)_30%] from-(--bg-main) to-(--bg-card)
        flex flex-col justify-between items-center gap-60 font-sans text-(--text-main) overflow-hidden transition-colors duration-300 ">
            <HeaderBlock/>
            <div className="flex flex-row justify-between gap-16 bg-(--bg-sidebar) p-10 rounded-2xl border-2 border-(--border-color) shadow-2xl hover:shadow-purple-500/20 transition-colors duration-300">

                <div className="relative flex flex-col border-4 border-[var(--border-color)] rounded-xl bg-black/5 p-1 w-48">
                    {/* slider block */}
                    <div
                        className="absolute left-1 right-1 transition-all duration-300 ease-out bg-[var(--primary)] rounded-lg"
                        style={{
                            height: 'calc(33.33% - 3px)', // button height - padding
                            transform: `translateY(${activeDifficulty * 100}%)`,
                            top: '4px'
                        }}
                    />

                    <DifficultyButton
                        difName="Easy"
                        isActive={activeDifficulty === 0}
                        onClick={() => setActiveDifficulty(0)}
                    />
                    <DifficultyButton
                        difName="Medium"
                        isActive={activeDifficulty === 1}
                        onClick={() => setActiveDifficulty(1)}
                    />
                    <DifficultyButton
                        difName="Hard"
                        isActive={activeDifficulty === 2}
                        onClick={() => setActiveDifficulty(2)}
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="w-xl">
                        {activeDifficulty === 0 && <p className="text-2xl">Easy - only 20 fields are empty. Best option for the new player</p>}
                        {activeDifficulty === 1 && <p className="text-2xl">Medium - 50 fields are empty. Optimal for the chill sudoku solving</p>}
                        {activeDifficulty === 2 && <p className="text-2xl">Hard - 60 fields are empty.<span className="text-(--danger)"> Can you beat it?</span> </p>}
                    </div>
                    <button className="h-14 border-4 border-(--accent)/30  px-14 hover:cursor-pointer bg-(--accent) rounded-lg text-2xl font-bold"
                    onClick={startGame}
                >Start</button>
                </div>
                
            </div>

            <FooterBlock/>

        </div>
    )
}
