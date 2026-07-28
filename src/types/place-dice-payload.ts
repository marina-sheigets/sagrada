import { Dice } from './dice';

export interface PlaceDataPayload {
	payload: Dice;
	zoneId: string;
	zoneElement: HTMLElement;
	boardId: string;
}
