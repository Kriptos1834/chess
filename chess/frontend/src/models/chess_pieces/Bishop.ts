import { faChessBishop } from '@fortawesome/free-solid-svg-icons';
import { Cell } from './../Cell';
import { Colors } from './../Colors';
import { ChessPieceTypes, Piece } from './Piece';

export class Bishop extends Piece {

    constructor(color: Colors) {
        super(color)
        this.type = ChessPieceTypes.BISHOP
        this.icon = faChessBishop
    }

    movementPattern(cell: Cell, target: Cell): boolean {
        return cell.isEmptyDiagonal(target)
    }

}