import { Cell } from './../Cell';
import { Colors } from './../Colors';
import { ChessPieceTypes, Piece } from './Piece';
import { faChessQueen } from '@fortawesome/free-solid-svg-icons';

export class Queen extends Piece {

    constructor(color: Colors) {
        super(color)
        this.type = ChessPieceTypes.QUEEN
        this.icon = faChessQueen
    }

    movementPattern(cell: Cell, target: Cell): boolean {
        return cell.isEmptyDiagonal(target) || cell.isEmptyHorizontal(target) || cell.isEmptyVertical(target)
    }

}
