import { injectable } from 'tsyringe';
import { GameBoard } from '../../components/game-boards/game-board.component';
import { GameBoardService } from '../game-board/game-board.service';

@injectable()
export class BoardsFactoryService {
	constructor(protected gameBoardService: GameBoardService) {}

	init(amountOfPlayers: number) {
		const fragment = document.createDocumentFragment();

		for (let player = 0; player < amountOfPlayers; player++) {
			const newBoard = new GameBoard(this.gameBoardService, player);

			// newBoard.onCellClick((cellObj)=>{
			//     // validate turn
			// })

			fragment.append(newBoard.rootElement);
		}

		return fragment;
	}
}
