import React, { useContext, useEffect, useState } from 'react'
import { MatchContext } from '../context';
import { Board } from '../models/Board'
import { Cell } from '../models/Cell';
import { Bishop } from '../models/chess_pieces/Bishop';
import { Knight } from '../models/chess_pieces/Knight';
import { ChessPieceTypes } from '../models/chess_pieces/Piece';
import { Queen } from '../models/chess_pieces/Queen';
import { Rook } from '../models/chess_pieces/Rook';
import { Colors } from '../models/Colors';
import CellComponent from './CellComponent'
import PawnTransformWindow from './PawnTransformWindow'

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    swapPlayer: () => void
}

const BoardComponent: React.FC<BoardProps> = ({ board, setBoard, swapPlayer }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [isTransformationVisible, setTransformationVisibility] = useState<boolean>(true)
    const [pawnOnTheEdgeCell, setPawnOnTheEdgeCell] = useState<Cell | null>(null)
    const matchContext = useContext(MatchContext);

    function click(target: Cell) {
        if (target.piece?.color === matchContext?.currentPlayer?.color) {
            setSelectedCell(target)
        }
        else if (selectedCell && selectedCell !== target) {
            if (selectedCell.piece?.canMove(selectedCell, target) && board.isMoveLegal(selectedCell, target)) {
                selectedCell.movePiece(target)
                if (target.piece?.type === ChessPieceTypes.PAWN && ((target.y === 0 && target.piece?.color === Colors.WHITE) || (target.y === 7 && target.piece?.color === Colors.BLACK))) {
                    setPawnOnTheEdgeCell(target)
                    setTransformationVisibility(true)
                }
                endTurn()
            }
            if (selectedCell.piece?.canCastle(selectedCell, target)) {
                board.castle(selectedCell, target.x > selectedCell.x ? 'short' : 'long')
                endTurn()
            }

        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function endTurn() {
        setSelectedCell(null)
        swapPlayer()
    }

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    function transformPawn(piece: Queen | Rook | Bishop | Knight) {
        if (pawnOnTheEdgeCell)
            board.transformPawn(pawnOnTheEdgeCell, piece)
            updateBoard()
    }

    return (
        <div className='board'>
            {isTransformationVisible && pawnOnTheEdgeCell
                ? <PawnTransformWindow
                    cell={pawnOnTheEdgeCell}
                    select={(piece: Queen | Rook | Bishop | Knight) => {
                        transformPawn(piece)
                        setTransformationVisibility(false)
                        setPawnOnTheEdgeCell(null)
                    }}
                />
                : ''
            }
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent
                            cell={cell}
                            key={cell.x + cell.y.toString()}
                            isSelected={cell.x === selectedCell?.x && cell.y === selectedCell.y ? true : false}
                            click={click}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}

export default BoardComponent