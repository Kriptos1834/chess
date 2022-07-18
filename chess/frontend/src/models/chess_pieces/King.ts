import { faChessKing } from '@fortawesome/free-solid-svg-icons';
import { range } from '../../utils/numbers';
import { Cell } from './../Cell';
import { Colors } from './../Colors';
import { ChessPieceTypes, Piece } from './Piece';

export class King extends Piece {

    wasMoved: boolean;

    constructor(color: Colors) {
        super(color)
        this.type = ChessPieceTypes.KING
        this.icon = faChessKing
        this.wasMoved = false
    }

    isCheck(cell: Cell) {
        return cell.isAttacked(this.color)
    }

    canCastle(cell: Cell, target: Cell): boolean {
        if (!this.isCheck(cell) && cell.piece) {
            const board = cell.board
            const axisY = this.color === Colors.BLACK ? 0 : 7
            let rookCell
            if (!this.wasMoved) {
                if (target.y === axisY) {
                    if (target.x === 6) {
                        rookCell = board.getCell(7, axisY)
                    }
                    if (target.x === 2) {
                        rookCell = board.getCell(0, axisY)
                    }
                    if (rookCell) {
                        for (let i of cell.x < rookCell.x ? range(cell.x + 1, rookCell.x - 1) : range(rookCell.x + 1, cell.x - 1)) {
                            const gapCell = board.getCell(i, axisY)
                            if (gapCell.piece || gapCell.isAttacked(cell.piece.color)){
                                return false
                            }
                        } 
                        return (rookCell?.piece?.type === ChessPieceTypes.ROOK && !rookCell?.piece?.wasMoved)
                    }
                }
            }
        }
        return false
    }

    movementPattern(cell: Cell, target: Cell): boolean {
        const dx = Math.abs(cell.x - target.x)
        const dy = Math.abs(cell.y - target.y)

        if (cell.x === target.x) {
            if (dy === 1 && !target.isAttacked(this.color)) {
                return true
            }
        }

        if (cell.y === target.y) {
            if (dx === 1 && !target.isAttacked(this.color)) {
                return true
            }
        }

        if (dx === 1 && dy === 1 && !target.isAttacked(this.color)) {
            return true
        }

        return false
    }
}