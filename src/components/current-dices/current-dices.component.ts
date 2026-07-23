import { singleton } from 'tsyringe';
import { DicesBagService } from '../../services/dices-bag/dices-bag.service';
import { DicesFactoryService } from '../../services/dices-factory/dices-factory.service';
import { BaseComponent } from '../../shared/base-component/base-component';

import * as styles from './current-dices.component.css';
import { MessengerService } from '../../services/messenger/messenger.service';
import { Messages } from '../../constants/messages';

@singleton()
export class CurrentDicesComponent extends BaseComponent {
	constructor(
		protected dicesBagService: DicesBagService,
		protected dicesFactory: DicesFactoryService,
		protected messenger: MessengerService,
	) {
		super(styles);

		this.messenger.subscribe(Messages.StartGame, this.shuffle.bind(this));
	}

	shuffle() {
		const currentDices = this.dicesBagService.getDicesPerRound();
		console.log('currentDices', currentDices);
		this.rootElement.append(this.dicesFactory.createDices(currentDices));
	}
}
