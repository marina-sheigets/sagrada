import { singleton } from 'tsyringe';
import { RoundTrackerComponent } from '../../components/round-tracker/round-tracker.component';
import { DicesBagService } from '../../services/dices-bag/dices-bag.service';
import { BaseComponent } from '../../shared/base-component/base-component';
import { BoardsFactoryService } from '../../services/boards-factory/boards-factory.service';
import { CurrentDicesComponent } from '../../components/current-dices/current-dices.component';

import * as styles from './playing-field.component.css';

@singleton()
export class PlayingFieldComponent extends BaseComponent {
	readonly AMOUNT_OF_PLAYERS = 2;

	private playersBoardsContainer = document.createElement('div');
	constructor(
		protected roundTracker: RoundTrackerComponent,
		protected boardsFactory: BoardsFactoryService,
		protected currentDices: CurrentDicesComponent,
		protected dicesBagService: DicesBagService,
	) {
		super(styles);

		this.playersBoardsContainer.append(this.boardsFactory.init(this.AMOUNT_OF_PLAYERS));

		this.init();

		this.rootElement.append(
			this.roundTracker.rootElement,
			this.currentDices.rootElement,
			this.playersBoardsContainer,
		);

		this.playersBoardsContainer.classList.add(styles.playersBoardsContainer);
	}

	init() {
		this.dicesBagService.initAllDices();
	}
}
