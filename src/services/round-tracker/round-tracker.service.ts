import { singleton } from 'tsyringe';
import { AMOUNT_OF_ROUNDS } from '../../constants/amount-of-rounds';
import { Messages } from '../../constants/messages';
import { Dice } from '../../types/dice';
import { RoundCell } from '../../types/round-cell';
import { Informer } from '../informer/informer.service';
import { MessengerService } from '../messenger/messenger.service';

@singleton()
export class RoundTrackerService {
	private roundCellsData: RoundCell[] = [];

	public onRoundTrackerRender = new Informer();

	constructor(private messenger: MessengerService) {
		this.messenger.subscribe(
			Messages.PlaceLastRoundDice,
			this.insertDiceOnRoundTracker.bind(this),
		);
	}

	init() {
		for (let roundIndex = 0; roundIndex < AMOUNT_OF_ROUNDS; roundIndex++) {
			const roundCellObj: RoundCell = {
				id: roundIndex + 1,
				label: roundIndex + 1,
				value: '',
				isLast: roundIndex === AMOUNT_OF_ROUNDS - 1,
			};

			this.roundCellsData.push(roundCellObj);
		}

		this.onRoundTrackerRender.inform();
	}

	insertDiceOnRoundTracker(dice: Dice) {
		const cellToPlaceDice = this.roundCellsData.find((cell) => !cell.dice);

		this.roundCellsData = this.roundCellsData.map((cell) => {
			if (cell.id === cellToPlaceDice?.id) {
				return { ...cell, dice };
			}

			return cell;
		});

		this.onRoundTrackerRender.inform();
	}

	get cellsData() {
		return this.roundCellsData;
	}
}
