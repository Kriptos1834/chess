import { Colors } from './Colors';
import { Board } from './Board';
import { ChessPieceTypes, Piece } from './chess_pieces/Piece';


export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    piece: Piece | null;
    board: Board;
    turnAvailable: boolean; // can piece move on this cell
    overflow: boolean;

    constructor(board: Board, x: number, y: number, color: Colors, piece: Piece | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.piece = piece;
        this.board = board;
        this.turnAvailable = false;
        this.overflow = false;
    }

    isAttacked(allyColor: Colors) {
        for (let i = 0; i < this.board.cells.length; i++) {
            const row = this.board.cells[i]
            const enemyColor = allyColor === Colors.BLACK ? Colors.WHITE : Colors.BLACK
            for (let j = 0; j < row.length; j++) {
                if (row[j].piece?.color === enemyColor && row[j].piece?.canAttack(row[j], this)) {
                    return true
                }
            }
        }
        return false
    }

    isCheck() {
        return this.piece?.type === ChessPieceTypes.KING && this.isAttacked(this.piece?.color)
    }

    isEmpty() {
        return this.piece === null
    }

    isEnemy(target: Cell): boolean {
        if (target.piece)
            return this.piece?.color !== target.piece?.color
        return false
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x)
            return false

        const min = Math.min(this.y, target.y)
        const max = Math.max(this.y, target.y)
        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }
        return true
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y)
            return false

        const min = Math.min(this.x, target.x)
        const max = Math.max(this.x, target.x)
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }
        return true
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)
        if (absX !== absY)
            return false

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
                return false
        }

        return true
    }

    movePiece(target: Cell) {
        if (this.piece)
            if (!this.piece.wasMoved) {
                this.piece.wasMoved = true
            }
            target.piece = this.piece
            this.piece = null
    }
}