import { singleton } from 'tsyringe';
import { GameSettings } from './../../types/game-settings';
import { Difficulty } from '../../types/difficulty';

@singleton()
export class GameSettingsService {
	private gameSettings: GameSettings = {
		numberOfPlayers: 2,
		showLegalMoves: true,
		difficulty: Difficulty.Medium,
		advancedRulesEnables: false,
		undoEnabled: false,
		timePerTurn: 30 * 1000, // 30s
	};

	getSettings() {
		return this.gameSettings;
	}

	getNumberOfPlayers() {
		return this.gameSettings.numberOfPlayers;
	}
}
