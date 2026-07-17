import { GameBoardService } from '../../services/game-board/game-board.service';
import { Informer } from '../../services/informer/informer.service';
import { BaseComponent } from '../../shared/base-component/base-component';
import { BoardCell } from '../../types/board-cell';

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

		const board = this.gameBoardService.createBoard();

		this.render(board);

		this.cellsContainer.classList.add(styles.cellsContainer);
	}

	private render(board: BoardCell[]) {
		for (const boardCell of board) {
			const cell = document.createElement('div');

			cell.id = boardCell.id;

			cell.classList.add(styles.boardCell);

			if (boardCell.constantColor) {
				cell.style.background = boardCell.constantColor;
			}

			if (boardCell.constantValue) {
				cell.textContent = String(boardCell.constantValue);
			}

			cell.addEventListener('click', () => {
				//this.gameBoardService.validate(boardCell.id);
			});

			this.cellsContainer.append(cell);
		}
	}
}
