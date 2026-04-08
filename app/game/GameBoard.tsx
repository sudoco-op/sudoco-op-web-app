import { Eraser, Heart, NotebookPen } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router";
import { api, websocketEmits, websocketEvents, type Game } from "~/api/api";
import type { WebsocketConnectionContext } from "./GameWebsocketProvider";
import { getUserId } from "~/auth/auth";

type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const digits: Digit[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const GameBoard = ({ initialGame }: { initialGame: Game }) => {
    const [board, setBoard] = useState(initialGame.boardState);
    const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(null);
    const [noteModeActive, setNoteModeActive] = useState<boolean>(false);
    const [win, setWin] = useState<boolean>(false);
    const [livesLeft, setLivesLeft] = useState<number>(initialGame.livesLeft);

    const userId = useMemo(() => getUserId(), []);
    const isHost = useMemo(() => userId === initialGame.playerIds[0], [initialGame, userId]);

    const websocketConnection = useOutletContext<WebsocketConnectionContext>();

    useEffect(() => {
        if (websocketConnection) {
            websocketConnection.on(websocketEvents.ReciveMarkCell, (cellNumber: number, markValue: number, isCorrect: boolean) => {
                if (markValue !== 0) setNumber(cellNumber, markValue as Digit, isCorrect);
                else clearNumber(cellNumber);
            });
            websocketConnection.on(websocketEvents.ReciveAddNote, addNote);
            websocketConnection.on(websocketEvents.ReciveRemoveNote, removeNote)
            websocketConnection.on(websocketEvents.ReciveRemoveAllNotes, clearNotes);
            websocketConnection.on(websocketEvents.ReciveStartGame, async () => {
                const newGame = await api.getGameData(initialGame.id);
                restartGame(newGame);
            });
        }

        return () => {
            websocketConnection?.off(websocketEvents.ReciveMarkCell);
            websocketConnection?.off(websocketEvents.ReciveAddNote);
            websocketConnection?.off(websocketEvents.ReciveRemoveNote);
            websocketConnection?.off(websocketEvents.ReciveRemoveAllNotes);
        }
    }, [websocketConnection]);

    const restartGame = useCallback((newGame: Game) => {
        setBoard(newGame.boardState);
        setSelectedCellIndex(null);
        setNoteModeActive(false);
        setWin(false);
        setLivesLeft(newGame.livesLeft);
    }, []);

    const selectedCellIndexRow = useMemo(() => {
        if (selectedCellIndex == null) return null;
        return Math.floor(selectedCellIndex / 9);
    }, [selectedCellIndex]);

    const selectedCellIndexCol = useMemo(() => {
        if (selectedCellIndex == null) return null;
        return selectedCellIndex % 9;
    }, [selectedCellIndex]);

    useEffect(() => { if (board.every(bc => bc.isCorrect)) setWin(true); }, [board])

    const setNumber = useCallback((index: number, value: Digit, isCorrect: boolean) => {
        if (!isCorrect) setLivesLeft(prev => prev - 1);
        setBoard(prevBoard => prevBoard.map((cell, i) => i === index ? { ...cell, cellValue: value, isCorrect: isCorrect } : cell));
    }, []);

    const addNote = useCallback((index: number, value: Digit) => {
        setBoard(prevBoard =>
            prevBoard.map((cell, i) => i === index ?
                {
                    ...cell,
                    cellNotes: cell.cellNotes.map((prevNote, noteIndex) => noteIndex === value - 1 ? value : prevNote)
                } : cell))
    }, []);

    const removeNote = useCallback((index: number, value: Digit) => {
        setBoard(prevBoard =>
            prevBoard.map((cell, i) => i === index ?
                {
                    ...cell,
                    cellNotes: cell.cellNotes.map((prevNote, noteIndex) => noteIndex === value - 1 ? 0 : prevNote)
                } : cell))
    }, []);

    const clearNumber = useCallback((index: number) => {
        setBoard(prevBoard => prevBoard.map((cell, i) => i === index ? { ...cell, cellValue: 0 } : cell));
    }, []);

    const clearNotes = useCallback((index: number) => {
        setBoard(prevBoard =>
            prevBoard.map((cell, i) => i === index ?
                {
                    ...cell,
                    cellNotes: cell.cellNotes.map(_ => 0)
                } : cell));
    }, [])

    const toggleNote = useCallback((index: number, value: Digit) => {
        if (!websocketConnection || websocketConnection.state !== "Connected") return;
        if (board[index].cellNotes[value - 1] === 0) websocketConnection.invoke(websocketEmits.AddNote, index, value);
        else websocketConnection.invoke(websocketEmits.RemoveNote, index, value);
    }, [board, addNote, removeNote, websocketConnection]);

    const handleInput = useCallback((value: Digit) => {
        if (!websocketConnection || websocketConnection.state !== "Connected") return;
        if (selectedCellIndex === null) return;
        if (noteModeActive) toggleNote(selectedCellIndex, value);
        else websocketConnection.invoke(websocketEmits.MarkCell, selectedCellIndex, value);
    }, [selectedCellIndex, noteModeActive, toggleNote, setNumber, websocketConnection])

    const handleClear = useCallback(() => {
        if (!websocketConnection || websocketConnection.state !== "Connected") return;
        if (selectedCellIndex === null) return;
        if (board[selectedCellIndex].cellValue === 0) websocketConnection.invoke(websocketEmits.RemoveAllNotes, selectedCellIndex)
        else websocketConnection.invoke(websocketEmits.MarkCell, selectedCellIndex, 0);
    }, [board, selectedCellIndex, noteModeActive, toggleNote, setNumber, websocketConnection])

    useEffect(() => {
        const handleKeyEvent = (e: KeyboardEvent) => {

            const calmpIndex = (index: number) => Math.min(Math.max(index, 0), 80)

            if (e.key === "ArrowLeft") {
                setSelectedCellIndex(prev => prev !== null ? calmpIndex(prev - 1) : 40);
                return;
            }

            if (e.key === "ArrowRight") {
                setSelectedCellIndex(prev => prev !== null ? calmpIndex(prev + 1) : 40);
                return;
            }

            if (e.key === "ArrowUp") {
                setSelectedCellIndex(prev => prev !== null ? calmpIndex(prev - 9) : 40);
                return;
            }

            if (e.key === "ArrowDown") {
                setSelectedCellIndex(prev => prev !== null ? calmpIndex(prev + 9) : 40);
                return;
            }

            if (e.key === "n") {
                setNoteModeActive(prev => !prev);
                return;
            }
        }

        document.addEventListener("keydown", handleKeyEvent);
        return () => {
            document.removeEventListener("keydown", handleKeyEvent);
        }
    }, [])

    useEffect(() => {
        const handleKeyEvent = (e: KeyboardEvent) => {
            if (e.key === "c") {
                handleClear();
                return;
            }

            const digitClicked = Number(e.key) as Digit;
            if (digits.includes(digitClicked)) {
                handleInput(digitClicked);
                return;
            }
        }

        document.addEventListener("keydown", handleKeyEvent)
        return () => {
            document.removeEventListener("keydown", handleKeyEvent);
        }
    }, [handleClear, handleInput]);

    return (
        <div className="h-screen w-screen bg-(--bg-main) flex flex-col sm:justify-center items-center font-sans text-(--text-main) overflow-x-hidden transition-colors duration-300 px-2 py-4">
            <div className="p-4 flex gap-3">
                <Heart size={30} fill={livesLeft > 0 ? "red" : "none"} />
                <Heart size={30} fill={livesLeft > 1 ? "red" : "none"} />
                <Heart size={30} fill={livesLeft > 2 ? "red" : "none"} />
            </div>
            <div className="w-full flex gap-x-10 gap-y-10 justify-center items-center flex-col md:flex-row">
                <div className="w-full sm:w-xl aspect-square grid grid-cols-9 border-2 border-[var(--thick-board-border)]">
                    {board.map((cell, index) => {
                        const rowIndex = Math.floor(index / 9);
                        const colIndex = index % 9;

                        let sameQuadrant;
                        if (selectedCellIndexCol === null || selectedCellIndexRow === null) sameQuadrant = null;
                        else sameQuadrant = Math.floor(selectedCellIndexCol / 3) == Math.floor(colIndex / 3) && Math.floor(selectedCellIndexRow / 3) === Math.floor(rowIndex / 3);
                        const highlight = selectedCellIndexRow === rowIndex || selectedCellIndexCol === colIndex || sameQuadrant;

                        let sameNumber;
                        if (cell.cellValue === 0 || selectedCellIndex === null) sameNumber = null;
                        else sameNumber = board[selectedCellIndex].cellValue === cell.cellValue;

                        const thickBorderRight = (colIndex + 1) % 3 === 0 && colIndex !== 8;
                        const thickBorderBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;

                        return (
                            <div
                                key={index}
                                className={`
                                    ${!cell.isCorrect && cell.cellValue !== 0 && "bg-[var(--game-board-cell-error)]"}
                                    ${(cell.isCorrect || cell.cellValue === 0) && selectedCellIndex === index && "bg-[var(--game-board-cell-hover)]"}
                                    ${(cell.isCorrect || cell.cellValue === 0) && selectedCellIndex !== index && !sameNumber && highlight && "bg-[var(--game-board-cell-hover-secondary)]"}
                                    ${(cell.isCorrect || cell.cellValue === 0) && selectedCellIndex !== index && sameNumber && "bg-[var(--game-board-cell-same-number)]"}
                                    aspect-square
                                    flex items-center justify-center
                                    text-xl sm:text-2xl font-light
                                    cursor-pointer border-gray-500
                                    transition-colors 
                                    ${(cell.isCorrect || cell.cellValue === 0) && "hover:bg-[var(--game-board-cell-hover)]"}
                                    ${thickBorderRight ? "border-r-2 border-r-[var(--thick-board-border)]" : "border-r border-r-slate-500"} ${thickBorderBottom ? "border-b-2 border-b-[var(--thick-board-border)]" : "border-b border-b-slate-500"}
                                    ${colIndex === 8 ? 'border-r-0' : ''}
                                    ${rowIndex === 8 ? 'border-b-0' : ''}
                                `}
                                onClick={() => {
                                    setSelectedCellIndex(index);
                                }}
                            >
                                {cell.cellValue !== 0 && cell.cellValue}
                                {cell.cellValue === 0 &&
                                    <div className="w-full h-full grid grid-cols-3 text-[0.5rem] sm:text-sm">
                                        {cell.cellNotes.map((noteValue, noteIndex) => (
                                            <div key={`${index}-${noteIndex}`} className="flex justify-center items-center">
                                                {noteValue !== 0 && noteValue}
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-9 md:grid-cols-3 gap-3">
                        {digits.map(value => (
                            <button key={value} className="sm:w-15 text-2xl bg-[var(--game-board-cell-hover-secondary)] sm:rounded-lg rounded-xl flex justify-center items-center aspect-square hover:cursor-pointer p-2 transition-colors hover:text-(--primary-hover)"
                                onClick={() => handleInput(value)}
                            >
                                {value}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-5">
                        <button className="flex flex-col justify-center items-center py-4 px-2 hover:cursor-pointer rounded-lg bg-[var(--game-board-cell-hover-secondary)] gap-3 hover:text-(--primary-hover)"
                            onClick={() => handleClear()}
                        >
                            <Eraser />
                            Usuń
                        </button>

                        <button className="flex flex-col justify-center items-center py-4 px-2 hover:cursor-pointer rounded-lg bg-[var(--game-board-cell-hover-secondary)] relative gap-3 hover:text-(--primary-hover)"
                            onClick={() => setNoteModeActive(prev => !prev)}
                        >
                            <NotebookPen />
                            <div className={`text-white absolute right-1 top-7 text-xs p-1 rounded-lg ${noteModeActive ? "bg-(--primary)" : "bg-slate-800"}`}>
                                {noteModeActive ? "ON" : "OFF"}
                            </div>
                            Notatki
                        </button>
                    </div>
                </div>
            </div>

            {(win || livesLeft == 0) &&
                <div className="absolute top-0 left-0 w-screen h-screen backdrop-blur-xs flex justify-center items-center">
                    <div className="max-w-60 w-full h-80 bg-[var(--bg-main)] rounded-lg border-2 border-[var(--border-color)] flex flex-col items-center justify-around">
                        {win ? <h1 className="font-bold text-2xl">You win</h1> : <h1 className="font-bold text-2xl">You lose</h1>}
                        {isHost &&
                            <button onClick={async () => {
                                await api.startGame(initialGame.id);
                                var gameData = await api.getGameData(initialGame.id);
                                restartGame(gameData);
                            }} className="p-4 bg-[var(--primary)] rounded-lg hover:cursor-pointer">Restart game</button>
                        }
                        <Link to={"/"}>
                            <button className="p-4 bg-[var(--primary)] rounded-lg hover:cursor-pointer">Main menu</button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}
