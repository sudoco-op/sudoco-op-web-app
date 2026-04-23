import { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import { api, websocketEmits, websocketEvents, type Game } from "~/api/api";
import type { WebsocketConnectionContext } from "../GameWebsocketProvider";
import { getUserId } from "~/auth/auth";

type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
const digits: Digit[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const useGameBoard = (initialGame: Game) => {
    const [board, setBoard] = useState(initialGame.boardState);
    const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(null);
    const [noteModeActive, setNoteModeActive] = useState<boolean>(false);
    const [win, setWin] = useState<boolean>(false);
    const [livesLeft, setLivesLeft] = useState<number>(initialGame.livesLeft);
    const [startTime, setStartTime] = useState<number>(initialGame.startTime);
    const [endTime, setEndTime] = useState<number | null>(null);

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
        setStartTime(newGame.startTime);
        setEndTime(null);
    }, []);

    useEffect(() => { if (board.every(bc => bc.isCorrect)) setWin(true); }, [board])
    useEffect(() => { if (win) setEndTime(Date.now()) }, [win])

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

            const updateIndexX = (prevIndex: number | null, newIndex: number) => {
                if (prevIndex === null) return newIndex;
                const prevIndexRow = Math.floor(prevIndex / 9);
                const newIndexRow = Math.floor(newIndex / 9);
                if (prevIndexRow !== newIndexRow) return newIndex - 9 * (newIndexRow - prevIndexRow);
                return newIndex;
            }

            const updateIndexY = (newIndex: number) => {
                if (newIndex > 80) return newIndex - 81;
                if (newIndex < 0) return newIndex + 81;
                return newIndex;
            }

            if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
                setSelectedCellIndex((prev) => updateIndexX(prev, prev !== null ? prev - 1 : 40));
                return;
            }

            if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
                setSelectedCellIndex((prev) => updateIndexX(prev, prev !== null ? prev + 1 : 40));
                return;
            }

            if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
                setSelectedCellIndex((prev) => updateIndexY(prev !== null ? prev - 9 : 40));
                return;
            }

            if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
                setSelectedCellIndex((prev) => updateIndexY(prev !== null ? prev + 9 : 40));
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

    return { board, selectedCellIndex, setSelectedCellIndex, noteModeActive, setNoteModeActive, livesLeft, startTime, endTime, win, isHost, handleInput, handleClear, restartGame }
}

