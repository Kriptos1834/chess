import { Knight } from './chess_pieces/Knight';
import { Rook } from './chess_pieces/Rook';
import { Bishop } from './chess_pieces/Bishop';
import { King } from './chess_pieces/King';
import { Pawn } from './chess_pieces/Pawn';
import { Queen } from './chess_pieces/Queen';
import { Colors } from './Colors';
import { Cell } from './Cell';
import { ChessPieceTypes } from './chess_pieces/Piece';
import { deepClone } from '../utils/deepClone';


export class Board {
    cells: Cell[][] = [];

    constructor() {
        this.initCells()

    }

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) // black
                }
                else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) // white
                }
            }
            this.cells.push(row)
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    public getKingPosition(color: Colors | undefined) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                if (target.piece?.type === ChessPieceTypes.KING && target.piece?.color === color)
                    return target
            }
        }
    }

    public isMoveLegal(cell: Cell, target: Cell) {
        const virtualBoard = deepClone(cell.board)
        const virtualBoardCell = virtualBoard.getCell(cell.x, cell.y)
        virtualBoard.getCell(target.x, target.y).piece = virtualBoardCell.piece
        virtualBoardCell.piece = null
        return !virtualBoard.getKingPosition(cell.piece?.color).isCheck()
    }


    private placePawns() {
        for (let i = 0; i < 8; i++) {
            this.getCell(i, 1).piece = new Pawn(Colors.BLACK)
            this.getCell(i, 6).piece = new Pawn(Colors.WHITE)
        }
    }

    private placeKings() {
        this.getCell(4, 7).piece = new King(Colors.WHITE);
        this.getCell(4, 0).piece = new King(Colors.BLACK);
    }

    private placeQueens() {
        this.getCell(3, 7).piece = new Queen(Colors.WHITE)
        this.getCell(3, 0).piece = new Queen(Colors.BLACK)
    }

    private placeKnights() {
        this.getCell(1, 7).piece = new Knight(Colors.WHITE)
        this.getCell(6, 7).piece = new Knight(Colors.WHITE)

        this.getCell(1, 0).piece = new Knight(Colors.BLACK)
        this.getCell(6, 0).piece = new Knight(Colors.BLACK)
    }

    private placeBishops() {
        this.getCell(2, 7).piece = new Bishop(Colors.WHITE)
        this.getCell(5, 7).piece = new Bishop(Colors.WHITE)

        this.getCell(2, 0).piece = new Bishop(Colors.BLACK)
        this.getCell(5, 0).piece = new Bishop(Colors.BLACK)
    }

    private placeRooks() {
        this.getCell(0, 7).piece = new Rook(Colors.WHITE)
        this.getCell(7, 7).piece = new Rook(Colors.WHITE)

        this.getCell(0, 0).piece = new Rook(Colors.BLACK)
        this.getCell(7, 0).piece = new Rook(Colors.BLACK)
    }

    public placePieces() {
        this.placeKings()
        this.placePawns()
        this.placeQueens()
        this.placeBishops()
        this.placeKnights()
        this.placeRooks()
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.turnAvailable = selectedCell?.piece?.type !== ChessPieceTypes.KING
                    ? !!(selectedCell?.piece?.canMove(selectedCell, target) && this.isMoveLegal(selectedCell, target))
                    : !!((selectedCell?.piece?.canMove(selectedCell, target) && this.isMoveLegal(selectedCell, target)) || selectedCell?.piece?.canCastle(selectedCell, target))
            }
        }
    }

    public transformPawn(pawnCell: Cell, piece: Queen | Rook | Bishop | Knight) {
        this.cells[pawnCell.y][pawnCell.x].piece = piece
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard;
    }

    public castle(cell: Cell, side: 'long' | 'short') {
        // if (cell.piece.type === ChessPieceTypes.KING) {
        const axisY = cell.piece?.color === Colors.BLACK ? 0 : 7
        let rookCell
        let rookTargetCell
        let kingTargetCell
        if (side === 'short') {
            rookCell = this.getCell(7, axisY)
            kingTargetCell = this.getCell(cell.x + 2, axisY)
            rookTargetCell = this.getCell(kingTargetCell.x - 1, axisY)
            console.log(cell)
            console.log(kingTargetCell)
            
        }
        else {
            rookCell = this.getCell(0, axisY)
            kingTargetCell = this.getCell(cell.x - 2, axisY)
            rookTargetCell = this.getCell(kingTargetCell.x + 1, axisY)
        }
        this.movePiece(cell, kingTargetCell)
        this.movePiece(rookCell, rookTargetCell)
        // }
    }

    public movePiece(from: Cell, to: Cell) {
        from.movePiece(to)
    }
}