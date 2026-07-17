import { GameBoardService } from '../../services/game-board/game-board.service';
import { Informer } from '../../services/informer/informer.service';
import { BaseComponent } from '../../shared/base-component/base-component';
import { generateId } from '../../utils/generate-id';

import * as styles from './game-board.component.css';

interface Player {
	id: string;
	nickname: string;
}

export class GameBoard extends BaseComponent {
	private readonly xCells = 5;
	private readonly yCells = 4;

	onCellClick = new Informer();
	private cellsContainer = document.createElement('div');
	private boardTitle = document.createElement('h2');
	constructor(
		protected gameBoardService: GameBoardService,
		//protected player: Player,
		protected player: number,
	) {
		super(styles);

		this.boardTitle.textContent = 'Player ' + (player + 1);

		this.rootElement.append(this.boardTitle, this.cellsContainer);

		this.initBoard();

		this.cellsContainer.classList.add(styles.cellsContainer);
	}

	initBoard() {
		this.drawLayout();
		// this.addRandomValues();
		// this.addColors();
	}

	drawLayout() {
		for (let x = 0; x < this.xCells; x++) {
			for (let y = 0; y < this.yCells; y++) {
				const cell = document.createElement('div');

				const cellId = generateId(8);
				cell.id = cellId;

				cell.classList.add(styles.boardCell, styles.empty);

				cell.addEventListener('click', (e: MouseEvent) => {
					//this.gameBoardService.validate(e.target.id);
				});

				this.cellsContainer.append(cell);
			}
		}
	}
}
