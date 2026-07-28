import { singleton } from 'tsyringe';
import { DiceComponent } from '../../components/dice/dice.component';
import { Dice } from '../../types/dice';
import { DicesFactoryService } from './dices-factory.service';
import { DragDropService } from '../drag-and-drop/drag-and-drop.service';

@singleton()
export class CurrentDicesFactoryService extends DicesFactoryService {
	constructor(protected dragDropService: DragDropService) {
		super();
	}

	protected createDiceComponent(dice: Dice): DiceComponent {
		const component = super.createDiceComponent(dice);
		this.dragDropService.makeDraggable(component.rootElement, dice, dice.id);
		return component;
	}
}
