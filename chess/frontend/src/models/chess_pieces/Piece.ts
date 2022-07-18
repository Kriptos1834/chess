import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export enum ChessPieceTypes {
    PIECE = "piece",
    KING = "king",
    QUEEN = "ueen",
    KNIGHT = "knigt",
    BISHOP = "bishop",
    ROOK = "rook",
    PAWN = "pawn",
}

export class Piece {
    readonly color: Colors;
    type: ChessPieceTypes;
    icon: IconDefinition | null; // css class for fonts-awesome, depends on piece type
    wasMoved: boolean | null;
    id: number;


    constructor(color: Colors) {
        this.color = color;
        this.icon = null;
        this.type = ChessPieceTypes.PIECE;
        this.id = Math.random()
        this.wasMoved = false
    }

    movementPattern(cell: Cell, target: Cell): boolean {
        return true
    }
    
    canCastle(cell: Cell, target: Cell): boolean {
        return false
    }

    canMove(cell: Cell, target: Cell): boolean {
        if (target.piece?.color === this.color) {
            return false
        }
        if (target.piece?.type === ChessPieceTypes.KING) {
            return false
        }

        return this.movementPattern(cell, target);
    }

    canAttack(cell: Cell, target: Cell): boolean {
        if (target.piece?.color === this.color) {
            return false;
        }
        return this.movementPattern(cell, target);
    }
}