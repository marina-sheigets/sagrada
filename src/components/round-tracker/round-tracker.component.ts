import { singleton } from 'tsyringe';
import { BaseComponent } from '../../shared/base-component/base-component';

import * as styles from './round-tracker.component.css';
import { RoundTrackerService } from '../../services/round-tracker/round-tracker.service';
import { DiceComponent } from '../dice/dice.component';

@singleton()
export class RoundTrackerComponent extends BaseComponent {
	private readonly roundCellsContainer = document.createElement('div');

	constructor(private roundTrackerService: RoundTrackerService) {
		super(styles);

		this.roundCellsContainer.classList.add(styles.roundCellsContainer);
		this.rootElement.append(this.roundCellsContainer);

		this.roundTrackerService.onRoundTrackerRender.subscribe(this.renderRoundTracker.bind(this));
		this.roundTrackerService.init();
	}

	renderRoundTracker() {
		this.clear();

		const fragment = document.createDocumentFragment();
		const cellsData = this.roundTrackerService.cellsData;

		for (let [index, cell] of Object.entries(cellsData)) {
			const roundCell = document.createElement('div');

			roundCell.classList.add(styles.roundCell);

			if (cell.dice) {
				const newDice = new DiceComponent();
				newDice.initFace(cell.dice);
				roundCell.append(newDice.rootElement);
			} else {
				roundCell.textContent = String(+index + 1);
			}

			roundCell.id = String(index + 1);

			fragment.append(roundCell);
		}

		this.roundCellsContainer.append(fragment);
	}

	private clear() {
		this.roundCellsContainer.textContent = '';
	}
}
