import { singleton } from 'tsyringe';
import { Color } from '../../types/color';
import { Dice } from '../../types/dice';

interface BoardCell {
	id: string;
	constantColor?: Color; // initial random value, could be undefined - not set
	constantValue?: number; // initial random color, could be undefined - not set
	isEdgeCell: boolean;
	row: number;
	column: number;
	dice?: Dice;
}

@singleton()
export class GameBoardService {
	private gameBoard: BoardCell[] = [];

	constructor() {}

	validate(cellId: string) {}
}
