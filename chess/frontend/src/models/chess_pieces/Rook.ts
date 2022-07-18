import { faChessRook } from '@fortawesome/free-solid-svg-icons';
import { Cell } from './../Cell';
import { Colors } from './../Colors';
import { ChessPieceTypes, Piece } from './Piece';

export class Rook extends Piece {

    wasMoved: boolean

    constructor(color: Colors) {
        super(color)
        this.type = ChessPieceTypes.ROOK
        this.icon = faChessRook
        this.wasMoved = false
    }

    movementPattern(cell: Cell, target: Cell): boolean {
        return cell.isEmptyHorizontal(target) || cell.isEmptyVertical(target)
    }

}