import { Dice } from './dice';

export interface RoundCell {
	id: number;
	label: number;
	value: string;
	isLast: boolean;
	dice?: Dice;
}
