import type { Dispatch, SetStateAction } from "react";
import type { BoardCell } from "~/api/api";

type GameBoardCellProps = {
    cell: BoardCell;
    index: number;
    selectedValue: number | null;
    selectedCellIndex: number | null;
    setSelectedCellIndex: Dispatch<SetStateAction<number | null>>;
}

export const GameBoardCell = ({ cell, index, selectedValue, selectedCellIndex, setSelectedCellIndex }: GameBoardCellProps) => {
    const selectedCellIndexRow = selectedCellIndex !== null ? Math.floor(selectedCellIndex / 9) : null;
    const selectedCellIndexCol = selectedCellIndex !== null ? selectedCellIndex % 9 : null;

    const rowIndex = Math.floor(index / 9);
    const colIndex = index % 9;

    let sameQuadrant;
    if (selectedCellIndexCol === null || selectedCellIndexRow === null) sameQuadrant = null;
    else sameQuadrant = Math.floor(selectedCellIndexCol / 3) == Math.floor(colIndex / 3) && Math.floor(selectedCellIndexRow / 3) === Math.floor(rowIndex / 3);
    const highlight = selectedCellIndexRow === rowIndex || selectedCellIndexCol === colIndex || sameQuadrant;

    let sameNumber = selectedValue !== 0 && selectedValue === cell.cellValue;

    const thickBorderRight = (colIndex + 1) % 3 === 0 && colIndex !== 8;
    const thickBorderBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;
    return (
        <div
            className={`
                ${!cell.isCorrect && cell.cellValue !== 0 && "bg-(--game-board-cell-error)"}
                ${(cell.isCorrect || cell.cellValue === 0) && selectedCellIndex === index && "bg-(--game-board-cell-hover)"}
                ${(cell.isCorrect || cell.cellValue === 0) && selectedCellIndex !== index && !sameNumber && highlight && "bg-(--game-board-cell-hover-secondary)"}
                ${(cell.isCorrect || cell.cellValue === 0) && selectedCellIndex !== index && sameNumber && "bg-(--game-board-cell-same-number)"}
                aspect-square
                flex items-center justify-center
                text-xl sm:text-2xl font-light
                cursor-pointer border-gray-500
                transition-colors 
                ${(cell.isCorrect || cell.cellValue === 0) && "hover:bg-(--game-board-cell-hover)"}
                ${thickBorderRight ? "border-r-2 border-r-(--thick-board-border)" : "border-r border-r-slate-500"} ${thickBorderBottom ? "border-b-2 border-b-(--thick-board-border)" : "border-b border-b-slate-500"}
                ${colIndex === 8 ? "border-r-0" : ""}
                ${rowIndex === 8 ? "border-b-0" : ""}
            `}
            onClick={() => {
                setSelectedCellIndex(index);
            }}
        >
            <span className="font-bold">{cell.cellValue !== 0 && cell.cellValue}</span>
            {cell.cellValue === 0 && (
                <div className="w-full h-full grid grid-cols-3 text-[0.5rem] sm:text-sm">
                    {cell.cellNotes.map((noteValue, noteIndex) => (
                        <div
                            key={`${index}-${noteIndex}`}
                            className={`flex justify-center items-center aspect-square rounded-md ${selectedCellIndex !== null && selectedValue !== 0 && noteValue === selectedValue && "bg-(--primary)"}`}
                        >
                            {noteValue !== 0 && noteValue}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
