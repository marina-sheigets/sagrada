import { injectable } from 'tsyringe';
import { GameBoard } from '../../components/game-boards/game-board.component';
import { GameBoardService } from '../game-board/game-board.service';
import { BoardCell } from '../../types/board-cell';
import { DragDropService } from '../drag-and-drop/drag-and-drop.service';

@injectable()
export class BoardsFactoryService {
	constructor(
		protected gameBoardService: GameBoardService,
		protected dragDropService: DragDropService,
	) {}

	init(boardsObjects: { [boardId: string]: BoardCell[] }) {
		const fragment = document.createDocumentFragment();

		for (let boardId in boardsObjects) {
			const board = boardsObjects[boardId];
			let playerIndex = 1;

			const newBoard = new GameBoard(
				this.gameBoardService,
				this.dragDropService,
				boardId,
				board,
				playerIndex,
			);

			fragment.append(newBoard.rootElement);
		}

		return fragment;
	}
}
