import { injectable } from 'tsyringe';
import { Dice } from '../../types/dice';
import { DiceComponent } from '../../components/dice/dice.component';

@injectable()
export class DicesFactoryService {
	constructor() {}

	createDices(dices: Dice[]) {
		const documentFragment = document.createDocumentFragment();

		dices.forEach((dice) => {
			const newDiceComponent = new DiceComponent();

			newDiceComponent.initFace(dice);

			newDiceComponent.onDiceSelect.subscribe(() => {
				// send message to show available position on board
				// show drag and drop move
			});

			documentFragment.append(newDiceComponent.rootElement);
		});

		return documentFragment;
	}
}
