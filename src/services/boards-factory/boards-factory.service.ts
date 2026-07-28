import { injectable } from 'tsyringe';
import { GameBoard } from '../../components/game-boards/game-board.component';
import { GameBoardService } from '../game-board/game-board.service';
import { BoardCell } from '../../types/board-cell';

@injectable()
export class BoardsFactoryService {
	constructor(protected gameBoardService: GameBoardService) {}

	init(boardsObjects: { [player: string]: BoardCell[] }) {
		const fragment = document.createDocumentFragment();
		const amountOfBoards = Object.keys(boardsObjects).length;

		for (let player = 0; player < amountOfBoards; player++) {
			const board = boardsObjects[player];
			const newBoard = new GameBoard(this.gameBoardService, player, board);

			// newBoard.onCellClick((cellObj)=>{
			//     // validate turn
			// })

			fragment.append(newBoard.rootElement);
		}

		return fragment;
	}
}
