import { singleton } from 'tsyringe';
import { Dice } from '../../types/dice';
import { COLORS } from '../../constants/dice-colors';
import { getRandomElementsFromArray } from '../../utils/get-random-elements-from-array';
import { generateId } from '../../utils/generate-id';

@singleton()
export class DicesBagService {
	private readonly maxDiceValue = 6;
	private PLAYERS_NUMBER = 2;
	private DICES_PER_ROUND = this.PLAYERS_NUMBER * 2 + 1;

	private allDices: Dice[] = [];
	private usedDices: Dice[] = [];
	private unusedDices: Dice[] = [];

	private currentDices: Dice[] = [];

	initAllDices() {
		for (const color of COLORS) {
			for (let value = 1; value <= this.maxDiceValue; value++) {
				this.allDices.push(
					{ id: generateId(), value, color, oppositeFaceValue: 7 - value },
					{ id: generateId(), value, color, oppositeFaceValue: 7 - value },
					{ id: generateId(), value, color, oppositeFaceValue: 7 - value },
				);
			}
		}

		this.unusedDices = [...this.allDices];
	}

	getDicesPerRound() {
		this.currentDices = getRandomElementsFromArray(this.unusedDices, this.DICES_PER_ROUND);

		this.unusedDices = this.unusedDices.filter(
			(el) => !this.currentDices.some((currentDice) => currentDice.id === el.id),
		);

		this.usedDices = this.usedDices.concat(this.currentDices);

		return this.currentDices;
	}
}
