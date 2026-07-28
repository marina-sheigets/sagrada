import { singleton } from 'tsyringe';
import { RoundTrackerComponent } from '../../components/round-tracker/round-tracker.component';
import { DicesBagService } from '../../services/dices-bag/dices-bag.service';
import { BaseComponent } from '../../shared/base-component/base-component';
import { BoardsFactoryService } from '../../services/boards-factory/boards-factory.service';
import { CurrentDicesComponent } from '../../components/current-dices/current-dices.component';
import { MessengerService } from '../../services/messenger/messenger.service';
import { Messages } from '../../constants/messages';
import { BoardCell } from '../../types/board-cell';

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
		protected messenger: MessengerService,
	) {
		super(styles);

		this.rootElement.append(
			this.roundTracker.rootElement,
			this.currentDices.rootElement,
			this.playersBoardsContainer,
		);

		this.playersBoardsContainer.classList.add(styles.playersBoardsContainer);

		this.messenger.subscribe(Messages.InitBoards, this.initPlayingField.bind(this));
	}

	private initPlayingField(boardsObjects: { [boardId: string]: BoardCell[] }) {
		const boardsComponent: DocumentFragment = this.boardsFactory.init(boardsObjects);

		this.playersBoardsContainer.append(boardsComponent);
	}
}
