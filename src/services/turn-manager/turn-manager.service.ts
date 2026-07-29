import { Informer } from '../informer/informer.service';
import { Player } from '../../types/player';
import { MessengerService } from '../messenger/messenger.service';
import { Messages } from '../../constants/messages';
import { singleton } from 'tsyringe';

@singleton()
export class TurnManagerService {
	private turns: Player[] = [];
	private turn = 0;

	public onRoundFinished = new Informer();
	public onTurnFinished = new Informer();

	constructor(protected messenger: MessengerService) {
		this.reset();

		this.messenger.subscribe(Messages.NextTurn, this.nextTurn.bind(this));
	}

	startRound(players: Player[], startPlayer: Player) {
		if (this.isFirstTurn()) {
			this.createTurns(players, startPlayer);
		}

		this.messenger.send(Messages.StartTurn, this.currentPlayer);
	}

	private isFirstTurn() {
		return this.turn === 0;
	}

	createTurns(players: Player[], startPlayer: Player) {
		const startPlayerIndex = players.findIndex((value) => value.id === startPlayer.id);

		const ordered = [...players.slice(startPlayerIndex), ...players.slice(0, startPlayerIndex)];
		this.turns = [...ordered, ...ordered.slice().reverse()];
	}

	nextTurn() {
		this.turn++;

		if (this.isRoundFinished()) {
			this.onRoundFinished.inform();
		} else {
			this.onTurnFinished.inform();
		}
	}

	get currentPlayer() {
		return this.turns[this.turn];
	}

	private isRoundFinished() {
		return this.turn >= this.turns.length;
	}

	reset() {
		this.turn = 0;
		this.turns = [];
	}
}
