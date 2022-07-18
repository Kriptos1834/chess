import { Cell } from './../Cell';
import { Colors } from './../Colors';
import { ChessPieceTypes, Piece } from './Piece';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';

export class Pawn extends Piece {

    constructor(color: Colors) {
        super(color)
        this.type = ChessPieceTypes.PAWN
        this.icon = faChessPawn
    }

    canAttack(cell: Cell, target: Cell): boolean {
        const direction = cell.piece?.color === Colors.BLACK ? 1 : -1

        if (target.y === cell.y + direction
            && (target.x === cell.x + 1 || target.x === cell.x - 1)) {
            return true
        }

        return false
    }

    canMove(cell: Cell, target: Cell): boolean {
        if (!super.canMove(cell, target))
            return false

        const direction = cell.piece?.color === Colors.BLACK ? 1 : -1
        const firstStepDirection = cell.piece?.color === Colors.BLACK ? 2 : -2

        if (target.x === cell.x && target.isEmpty()) {

            if (target.y === cell.y + direction) {
                return true
            }
            if (!this.wasMoved && target.y === cell.y + firstStepDirection && cell.board.getCell(target.x, cell.y + direction).isEmpty()) {
                return true
            }
        }

        if (this.canAttack(cell, target) && cell.isEnemy(target)) {
            return true
        }

        return false
    }

}