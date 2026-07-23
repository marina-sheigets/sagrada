import { Informer } from '../../services/informer/informer.service';
import { BaseComponent } from '../../shared/base-component/base-component';
import { Dice } from '../../types/dice';

import * as styles from './dice.component.css';
import html from './dice.component.html';

export class DiceComponent extends BaseComponent {
	private diceElement: HTMLElement | null = null;

	public onDiceSelect = new Informer();

	constructor() {
		super(styles);

		this.diceElement = this.htmlToElement(html);
		this.diceElement.classList.add(styles.dice, styles.diceTemplate);
		this.diceElement
			.querySelectorAll<HTMLElement>('.pip')
			.forEach((pip) => pip.classList.add(styles.pip));

		this.diceElement.addEventListener('click', () => {
			this.onDiceSelect.inform();
		});

		this.rootElement.append(this.diceElement);
	}

	initFace(dice: Dice) {
		if (!this.diceElement) {
			return;
		}

		this.diceElement.dataset.face = String(dice.value);
		this.diceElement.style.background = dice.color;
	}
}
