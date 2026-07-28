import { injectable } from 'tsyringe';
import { GameBoardService } from '../../services/game-board/game-board.service';
import { Informer } from '../../services/informer/informer.service';
import { BaseComponent } from '../../shared/base-component/base-component';
import { BoardCell } from '../../types/board-cell';
import { DragDropService } from '../../services/drag-and-drop/drag-and-drop.service';
import { DiceComponent } from '../dice/dice.component';

import html from '../dice/dice.component.html';

import * as styles from './game-board.component.css';
import * as diceStyles from '../dice/dice.component.css';

@injectable()
export class GameBoard extends BaseComponent {
	onCellClick = new Informer();
	private cellsContainer = document.createElement('div');
	private boardTitle = document.createElement('h2');

	constructor(
		protected gameBoardService: GameBoardService,
		protected dragDropService: DragDropService,
		protected boardId: string,
		protected board: BoardCell[],
		protected playerIndex: number,
	) {
		super(styles);

		this.boardTitle.textContent = 'Player ' + playerIndex;

		this.rootElement.append(this.boardTitle, this.cellsContainer);

		this.render(board);

		this.cellsContainer.classList.add(styles.cellsContainer);
		this.cellsContainer.dataset.role = 'board';
		this.cellsContainer.id = boardId;
	}

	public render(board: BoardCell[]) {
		//this.rootElement.textContent = '';
		this.cellsContainer.textContent = '';

		for (const boardCell of board) {
			const cell = this.htmlToElement(html);

			cell.querySelectorAll<HTMLElement>('.pip').forEach((pip) =>
				pip.classList.add(diceStyles.pip),
			);

			cell.id = boardCell.id;
			cell.dataset.dropZoneId = boardCell.id;
			cell.classList.add(styles.boardCell);

			if (boardCell.dice) {
				const diceComponent = new DiceComponent();
				diceComponent.initFace(boardCell.dice);

				cell.textContent = '';
				cell.append(diceComponent.rootElement);
			} else {
				cell.classList.add(diceStyles.diceTemplate);
				if (boardCell.constantColor) {
					cell.style.background = boardCell.constantColor;
				}

				if (boardCell.constantValue) {
					cell.dataset.face = String(boardCell.constantValue);
				}
			}

			this.cellsContainer.append(cell);
		}
	}
}
