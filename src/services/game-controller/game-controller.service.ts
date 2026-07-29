import { singleton } from 'tsyringe';
import { MessengerService } from '../messenger/messenger.service';
import { Messages } from '../../constants/messages';
import { GameSettingsService } from '../game-settings/game-settings.service';
import { DicesBagService } from '../dices-bag/dices-bag.service';
import { GameBoardService } from '../game-board/game-board.service';
import { BoardCell } from '../../types/board-cell';
import { DragDropService } from '../drag-and-drop/drag-and-drop.service';
import { RoundManagerService } from '../round-manager/round-manager.service';

/**
 * Main class for keeping all game variables and controlling all the process
 */
@singleton()
export class GameControllerService {
	constructor(
		protected gameSettingsService: GameSettingsService,
		protected messenger: MessengerService,
		protected dicesBagService: DicesBagService,
		protected gameBoardService: GameBoardService,
		protected dragDropService: DragDropService,
		protected roundManagerService: RoundManagerService,
	) {
		this.messenger.subscribe(Messages.StartGame, this.startGame.bind(this));

		this.dragDropService.configure((data) => this.gameBoardService.canPlaceDice(data));

		this.roundManagerService.onCurrentRoundFinished.subscribe(() => {
			this.dicesBagService.setLastDiceOnRoundTracker();
			// this.dicesBagService.initDicesPerRound();
			// this.startRounds();
		});

		this.roundManagerService.onGameFinished.subscribe(() => {});
	}

	private startGame() {
		this.createInitialDicesBag();

		this.createDicesPerRound();

		this.createBoards();

		this.startRounds();
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
		const boards = this.gameBoardService.getBoards();

		for (let i = 0; i < numberOfPlayers; i++) {
			const { boardId, board } = this.gameBoardService.createBoard();

			boards[boardId] = board;
		}

		this.messenger.send(Messages.InitBoards, boards);
	}

	private startRounds() {
		this.roundManagerService.startRound();
	}
}
