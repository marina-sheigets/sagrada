import { injectable } from 'tsyringe';
import { Dice } from '../../types/dice';
import { DiceComponent } from '../../components/dice/dice.component';

@injectable()
export class DicesFactoryService {
	constructor() {}

	createDices(dices: Dice[]) {
		const fragment = document.createDocumentFragment();
		dices.forEach((dice) => {
			const component = this.createDiceComponent(dice);
			fragment.append(component.rootElement);
		});
		return fragment;
	}

	protected createDiceComponent(dice: Dice): DiceComponent {
		const component = new DiceComponent();
		component.initFace(dice);

		return component;
	}
}
