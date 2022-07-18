import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import { MatchContext } from './context';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {
	const [board, setBoard] = useState(new Board())
	const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
	const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
	const [whoseTurn, setWhoseTurn] = useState<Player | null>(null)

	useEffect(() => {
		restart()
	}, [])


	function restart() {
		const newBoard = new Board();
		newBoard.placePieces()
		setBoard(newBoard)
		setWhoseTurn(whitePlayer)
	}

	function swapPlayer() {
		setWhoseTurn(whoseTurn?.color === Colors.WHITE ? blackPlayer : whitePlayer)
	}

	return (
		<div className='app'>
			<MatchContext.Provider value={{
				whoseTurn,
			}}>
				<BoardComponent		
					board={board}
					setBoard={setBoard}
					swapPlayer={swapPlayer}
				/>
			</MatchContext.Provider>
		</div>
	);
}

export default App;
