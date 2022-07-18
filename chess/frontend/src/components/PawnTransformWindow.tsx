import React from 'react'
import { faChessQueen, faChessRook, faChessBishop, faChessKnight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Cell } from '../models/Cell';
import { Queen } from '../models/chess_pieces/Queen';
import { Colors } from '../models/Colors';
import { Rook } from '../models/chess_pieces/Rook';
import { Bishop } from '../models/chess_pieces/Bishop';
import { Knight } from '../models/chess_pieces/Knight';

interface TransformWindowProps {
    cell: Cell;
	select: Function;
}

const PawnTransformWindow: React.FC<TransformWindowProps> = ({ cell, select }) => {
	cell.overflow = true
	return (
		<div className='pawn-transformation'>
			<div className="selection"
			style={{
				marginTop: cell.piece?.color === Colors.BLACK ? 'auto' : '',
				flexDirection: cell.piece?.color === Colors.BLACK ? 'column-reverse' : 'column',
				marginLeft: `${12.5 * cell.x}%`,
			}}>
				<button className='piece-select' onClick={() => {select(new Queen(cell.piece?.color ? cell.piece.color : Colors.BLACK))}}>
					<FontAwesomeIcon icon={faChessQueen} />
				</button>
				<button className='piece-select' onClick={() => {select(new Rook(cell.piece?.color ? cell.piece.color : Colors.BLACK))}}>
					<FontAwesomeIcon icon={faChessRook} />
				</button>
				<button className='piece-select' onClick={() => {select(new Bishop(cell.piece?.color ? cell.piece.color : Colors.BLACK))}}>
					<FontAwesomeIcon icon={faChessBishop} />
				</button>
				<button className='piece-select' onClick={() => {select(new Knight(cell.piece?.color ? cell.piece.color : Colors.BLACK))}}>
					<FontAwesomeIcon icon={faChessKnight} />
				</button>
			</div>
		</div>
	)
}

export default PawnTransformWindow