import { faChessKnight } from '@fortawesome/free-solid-svg-icons';
import { Cell } from './../Cell';
import { Colors } from './../Colors';
import { ChessPieceTypes, Piece } from './Piece';

export class Knight extends Piece {

    constructor(color: Colors) {
        super(color)
        this.type = ChessPieceTypes.KNIGHT
        this.icon = faChessKnight
    }

    movementPattern(cell: Cell, target: Cell): boolean {

        const dx = Math.abs(cell.x - target.x)
        const dy = Math.abs(cell.y - target.y)

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)

    }

}