import { Difficulty } from './difficulty';

export interface GameSettings {
	numberOfPlayers: number;
	showLegalMoves: boolean;
	difficulty: Difficulty;
	advancedRulesEnables: boolean;
	undoEnabled: boolean;
	timePerTurn: number;
}
