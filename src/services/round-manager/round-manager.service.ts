import { singleton } from 'tsyringe';
import { Informer } from '../informer/informer.service';
import { PlayerService } from '../player/player.service';
import { TurnManagerService } from './../turn-manager/turn-manager.service';

@singleton()
export class RoundManagerService {
	private readonly AMOUNT_OF_ROUNDS = 10;

	private activePlayerIndex = 0;
	private currentRound = 1;

	public onGameFinished = new Informer();
	public onCurrentRoundFinished = new Informer();

	constructor(
		private turnManagerService: TurnManagerService,
		private playersService: PlayerService,
	) {
		this.turnManagerService.onTurnFinished.subscribe(this.handlePrepareNextTurn.bind(this));

		this.turnManagerService.onRoundFinished.subscribe(this.handleRoundFinished.bind(this));
	}

	startRound() {
		const activePlayer = this.getActivePlayer();

		this.turnManagerService.startRound(this.playersService.getAllPlayers(), activePlayer);
	}

	getActivePlayer() {
		const players = this.playersService.getAllPlayers();
		return players[this.activePlayerIndex % players.length];
	}

	handlePrepareNextTurn() {
		this.activePlayerIndex++;

		this.turnManagerService.startRound(
			this.playersService.getAllPlayers(),
			this.getActivePlayer(),
		);
	}

	handleRoundFinished() {
		this.onCurrentRoundFinished.inform();
		this.currentRound++;

		if (this.currentRound > this.AMOUNT_OF_ROUNDS) {
			this.onGameFinished.inform();
		}
	}
}
