import { Dice } from './dice';

export interface PlaceDataPayload {
	payload: Dice;
	cellId: string;
	cellElement: HTMLElement;
	boardId: string;
}
