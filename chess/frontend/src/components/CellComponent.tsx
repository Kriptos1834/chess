import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Cell } from '../models/Cell'
import { Colors } from '../models/Colors'

interface CellProps {
    cell: Cell;
    isSelected: boolean;
    click: (cell: Cell) => void;
}

const CellComponent: React.FC<CellProps> = ({ cell, isSelected, click }) => {
    return (
        <div
            className={[
                'cell', cell.color,
                isSelected ? 'selected' : null,
                cell.turnAvailable ? 'available' : null,
                cell.turnAvailable && cell.piece ? 'enemy-piece' : null,
                cell.isCheck() ? 'check' : null,
                cell.overflow ? 'overflow' : null,
            ].join(' ')}
            onClick={() => click(cell)}
        >
            {cell.piece?.icon
                && <div className={`piece ${cell.piece.color === Colors.BLACK ? 'black' : 'white'}`}>
                    <FontAwesomeIcon icon={cell.piece?.icon} />
                </div>
            }
        </div>
    )
}

export default CellComponent