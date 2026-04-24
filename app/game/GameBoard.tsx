import { Eraser, Heart, NotebookPen } from "lucide-react";
import { Link } from "react-router";
import { api, type Game } from "~/api/api";
import HeaderBlock from "~/components/HeaderBlock";

import GameTimer from "~/components/GameTimer";
import LobbyCodeBlock from "~/components/LobbyCodeBlock";
import { useGameBoard } from "./hooks/useGameBoard";
import { GameBoardCell } from "./GameBoardCell";

type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const digits: Digit[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const renderElapsedTime = (startTime: number, endTime: number) => {
    const totalSeconds = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const GameBoard = ({ initialGame }: { initialGame: Game }) => {
    const { board, selectedCellIndex, setSelectedCellIndex, noteModeActive, setNoteModeActive, livesLeft, startTime, endTime, isHost, handleInput, handleClear, restartGame } = useGameBoard(initialGame);

    return (
        <div
            className="
                min-h-screen w-screen
                animate-float-bg bg-radial-[at_var(--bg-pos)_50%] from-(--bg-main) to-(--bg-card)
                flex flex-col font-sans text-(--text-main) overflow-x-hidden transition-colors duration-300
            "
        >
            <HeaderBlock confirmExit />
            <div className="my-auto  px-2 py-4">
                <div className="w-full flex gap-x-10 gap-y-10 justify-center items-center flex-col md:flex-row">
                    <div className="w-full sm:w-xl">
                        <div className="p-4 flex justify-between">
                            <div className="flex justify-center">
                                <Heart size={30} fill={livesLeft > 0 ? "red" : "none"} />
                                <Heart size={30} fill={livesLeft > 1 ? "red" : "none"} />
                                <Heart size={30} fill={livesLeft > 2 ? "red" : "none"} />
                            </div>
                            {endTime !== 0 ? (
                                <h1 className="text-2xl font-bold">{renderElapsedTime(startTime, endTime)}</h1>
                            ) : (
                                <GameTimer startTime={startTime} stop={endTime != 0 || livesLeft <= 0} />
                            )}

                        </div>
                        <div className="w-full sm:w-xl aspect-square grid grid-cols-9 border-2 border-(--thick-board-border)">
                            {board.map((cell, index) =>
                                <GameBoardCell
                                    key={index}
                                    cell={cell}
                                    index={index}
                                    selectedCellIndex={selectedCellIndex}
                                    selectedValue={selectedCellIndex !== null ? board[selectedCellIndex].cellValue : null}
                                    setSelectedCellIndex={setSelectedCellIndex}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-9 md:grid-cols-3 gap-3">
                            {digits.map((value) => {
                                const numberLeft = 9 - board.filter(cell => cell.cellValue == value).length;
                                return (
                                    <button
                                        key={value}
                                        className={`
                                            sm:w-15 text-2xl
                                            bg-(--game-board-cell-hover-secondary) sm:rounded-lg rounded-xl transition-colors hover:text-(--primary-hover) 
                                            flex flex-col justify-center items-center aspect-square hover:cursor-pointer p-2
                                            ${numberLeft === 0 && "bg-(--number-filled) text-(--text-muted) hover:text-(--text-muted)"}`
                                        }
                                        disabled={numberLeft === 0}
                                        onClick={() => handleInput(value)}
                                    >
                                        <p>{value}</p>
                                        <p className=" text-sm text-(--text-muted)">
                                            {numberLeft != 0 && numberLeft}
                                        </p>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="flex justify-center items-center gap-5">
                            <button
                                className="flex flex-col justify-center items-center py-4 px-2 hover:cursor-pointer rounded-lg bg-(--game-board-cell-hover-secondary) gap-3 hover:text-(--primary-hover)"
                                onClick={() => handleClear()}
                            >
                                <Eraser />
                                Usuń
                            </button>

                            <button
                                className="flex flex-col justify-center items-center py-4 px-2 hover:cursor-pointer rounded-lg bg-(--game-board-cell-hover-secondary) relative gap-3 hover:text-(--primary-hover)"
                                onClick={() => setNoteModeActive((prev) => !prev)}
                            >
                                <NotebookPen />
                                <div
                                    className={`text-white absolute right-1 top-7 text-xs p-1 rounded-lg ${noteModeActive ? "bg-(--primary)" : "bg-slate-800"}`}
                                >
                                    {noteModeActive ? "ON" : "OFF"}
                                </div>
                                Notatki
                            </button>
                        </div>
                        <div className="flex flex-col text-center">
                            <p className="text-xl font-bold">Lobby Code:</p>

                            <LobbyCodeBlock code={initialGame.code}></LobbyCodeBlock>
                        </div>
                    </div>
                </div>

                {(endTime !== 0 || livesLeft <= 0) && (
                    <div className="absolute top-0 left-0 w-screen h-screen backdrop-blur-xs flex justify-center items-center">
                        <div className="max-w-60 w-full h-80 bg-(--bg-main) rounded-lg border-2 border-(--border-color) flex flex-col items-center justify-around">
                            <div className="font-bold text-5xl">
                                {endTime !== 0 ? (
                                    <h1 className="text-green-800 dark:text-green-400">
                                        You win
                                    </h1>
                                ) : (
                                    <h1 className="text-red-800 dark:text-red-400">You lose</h1>
                                )}
                            </div>
                            <div className="text-xl">
                                {endTime != null && (
                                    <h1>{renderElapsedTime(startTime, endTime)}</h1>
                                )}
                            </div>
                            {isHost && (
                                <button
                                    onClick={async () => {
                                        await api.startGame(initialGame.id);
                                        var gameData = await api.getGameData(initialGame.id);
                                        restartGame(gameData);
                                    }}
                                    className="p-4 bg-(--primary) rounded-lg hover:cursor-pointer"
                                >
                                    Restart game
                                </button>
                            )}
                            <Link to={"/"}>
                                <button className="p-4 bg-(--primary) rounded-lg hover:cursor-pointer">
                                    Main menu
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
