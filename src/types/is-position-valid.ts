import { Dice } from './dice';

export type IsPositionValidProps = ({
	payload,
	zoneElement,
	zoneId,
	boardId,
}: {
	payload: Dice;
	zoneId: string;
	zoneElement: HTMLElement;
	boardId: string;
}) => boolean;
