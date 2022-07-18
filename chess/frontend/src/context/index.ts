import { Player } from './../models/Player';
import { createContext } from "react";

interface MatchContextInterface {
	whoseTurn: Player | null;
}

export const MatchContext = createContext<MatchContextInterface | null>(null)