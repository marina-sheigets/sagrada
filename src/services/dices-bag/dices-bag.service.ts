import { singleton } from 'tsyringe';
import { Dice } from '../../types/dice';
import { DICE_COLOR } from '../../constants/dice-colors';
import { getRandomElementsFromArray } from '../../utils/get-random-elements-from-array';
import { generateId } from '../../utils/generate-id';
import { Color } from '../../types/color';

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
		for (const color of Object.values(Color)) {
			for (let value = 1; value <= this.maxDiceValue; value++) {
				const hexColor = DICE_COLOR[color];
				const oppositeFaceValue = 7 - value;

				this.allDices.push(
					{ id: generateId(), value, color: hexColor, oppositeFaceValue },
					{ id: generateId(), value, color: hexColor, oppositeFaceValue },
					{ id: generateId(), value, color: hexColor, oppositeFaceValue },
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
