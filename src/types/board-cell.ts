import { Color } from './color';
import { Dice } from './dice';

export interface BoardCell {
	id: string;
	constantColor?: Color;
	constantValue?: number;
	isEdgeCell: boolean;
	row: number;
	column: number;
	dice?: Dice;
}
