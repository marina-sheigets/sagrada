import { singleton } from 'tsyringe';
import { MessengerService } from '../messenger/messenger.service';
import { Messages } from '../../constants/messages';
import { GameSettingsService } from '../game-settings/game-settings.service';
import { DicesBagService } from '../dices-bag/dices-bag.service';
import { GameBoardService } from '../game-board/game-board.service';
import { BoardCell } from '../../types/board-cell';

/**
 * Main class for keeping all game variables and controlling all the process
 */
@singleton()
export class GameControllerService {
	boards: BoardCell[][] = [];
	constructor(
		protected gameSettingsService: GameSettingsService,
		protected messenger: MessengerService,
		protected dicesBagService: DicesBagService,
		protected gameBoardService: GameBoardService,
	) {
		this.messenger.subscribe(Messages.StartGame, this.startGame.bind(this));
	}

	private startGame() {
		this.createInitialDicesBag();

		this.createDicesPerRound();

		this.createBoards();
	}

	private createInitialDicesBag() {
		this.dicesBagService.initAllDices();
	}

	private createDicesPerRound() {
		this.dicesBagService.initDicesPerRound();

		this.messenger.send(Messages.InitCurrentDices, this.dicesBagService.getDicesPerRound());
	}

	private createBoards() {
		const numberOfPlayers = this.gameSettingsService.getNumberOfPlayers();

		this.boards = Array.from({ length: numberOfPlayers }, () =>
			this.gameBoardService.createBoard(),
		);

		this.messenger.send(Messages.InitBoards, this.boards);
	}
}
