import { singleton } from 'tsyringe';
import { BaseComponent } from '../../shared/base-component/base-component';

import * as styles from './round-tracker.component.css';

interface RoundCell {
	id: number;
	label: number;
	value: string;
	isLast: boolean;
}

@singleton()
export class RoundTrackerComponent extends BaseComponent {
	private readonly AMOUNT_OF_ROUNDS = 10;
	private roundCellsData: RoundCell[] = [];

	private readonly roundCellsContainer = document.createElement('div');
	constructor() {
		super(styles);

		this.renderRoundTracker();

		this.roundCellsContainer.classList.add(styles.roundCellsContainer);

		this.rootElement.append(this.roundCellsContainer);
	}

	renderRoundTracker() {
		const fragment = document.createDocumentFragment();

		for (let roundIndex = 0; roundIndex < this.AMOUNT_OF_ROUNDS; roundIndex++) {
			const roundCell = document.createElement('div');

			const roundCellObj: RoundCell = {
				id: roundIndex + 1,
				label: roundIndex + 1,
				value: '',
				isLast: roundIndex === this.AMOUNT_OF_ROUNDS - 1,
			};

			roundCell.classList.add(styles.roundCell);
			roundCell.textContent = String(roundIndex + 1);
			roundCell.id = String(roundIndex + 1);

			fragment.append(roundCell);

			this.roundCellsData.push(roundCellObj);
		}

		this.roundCellsContainer.append(fragment);
	}
}
