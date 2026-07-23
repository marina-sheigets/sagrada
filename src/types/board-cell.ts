import { Dice } from './dice';

export interface BoardCell {
	id: string;
	constantColor?: string;
	constantValue?: number;
	isEdgeCell: boolean;
	row: number;
	column: number;
	dice?: Dice;
}
