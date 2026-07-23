import { Color } from './color';

export interface Dice {
	id: string;
	value: number;
	oppositeFaceValue: number;
	color: Color;
}
