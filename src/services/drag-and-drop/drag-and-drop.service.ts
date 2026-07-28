// drag-drop.service.ts
import { singleton } from 'tsyringe';
import { Dice } from '../../types/dice';
import { MessengerService } from '../messenger/messenger.service';
import { Messages } from '../../constants/messages';
import { IsPositionValidProps } from '../../types/is-position-valid';

@singleton()
export class DragDropService {
	private dropZoneSelector = '[data-drop-zone-id]';
	private isValid?: IsPositionValidProps;

	private draggedElement: HTMLElement | null = null;
	private ghostElement: HTMLElement | null = null;
	private selectedDicePayload: { id: string; payload: Dice } | null = null;

	constructor(protected messenger: MessengerService) {}
	configure(isValid: IsPositionValidProps) {
		this.isValid = isValid;
	}

	makeDraggable(element: HTMLElement, payload: Dice, id: string) {
		element.style.touchAction = 'none'; // stops the page from scrolling while dragging on touch
		element.addEventListener('pointerdown', (e) => this.onPointerDown(e, element, payload, id));
	}

	private onPointerDown(e: PointerEvent, element: HTMLElement, payload: Dice, id: string) {
		e.preventDefault();

		this.selectedDicePayload = { id, payload };
		this.draggedElement = element;
		this.ghostElement = this.createGhost(element);

		const onMove = (moveEvent: PointerEvent) => this.onPointerMove(moveEvent);

		const onUp = (upEvent: PointerEvent) => {
			this.onPointerUp(upEvent);

			document.removeEventListener('pointermove', onMove);
			document.removeEventListener('pointerup', onUp);
		};

		document.addEventListener('pointermove', onMove);
		document.addEventListener('pointerup', onUp);
	}

	private createGhost(element: HTMLElement): HTMLElement {
		const ghost = element.cloneNode(true) as HTMLElement;
		const rect = element.getBoundingClientRect();

		Object.assign(ghost.style, {
			position: 'fixed', // stop scrolling on page
			left: `${rect.left}px`,
			top: `${rect.top}px`,
			width: `${rect.width}px`,
			height: `${rect.height}px`,
			pointerEvents: 'none',
			zIndex: '1000',
			opacity: '0.85',
		});

		const rootContainer = document.getElementById('root');
		rootContainer?.append(ghost);
		element.style.opacity = '0.3';

		return ghost;
	}

	private onPointerMove(e: PointerEvent) {
		if (!this.ghostElement) {
			return;
		}

		const rect = this.ghostElement.getBoundingClientRect();

		this.ghostElement.style.left = `${e.clientX - rect.width / 2}px`;
		this.ghostElement.style.top = `${e.clientY - rect.height / 2}px`;
	}

	private onPointerUp(e: PointerEvent) {
		const draggableDice = document.elementFromPoint(e.clientX, e.clientY);
		const zoneElement = draggableDice?.closest<HTMLElement>(this.dropZoneSelector);
		const boardId = zoneElement?.closest('[data-role=board]')?.id!;

		debugger;

		if (zoneElement && this.selectedDicePayload) {
			const zoneId = zoneElement.dataset.dropZoneId!;

			const isPositionValid = this.isValid
				? this.isValid({
						payload: this.selectedDicePayload.payload,
						zoneId,
						zoneElement,
						boardId,
					})
				: false;

			if (isPositionValid) {
				debugger;
				this.messenger.send(Messages.PlaceDice, {
					payload: this.selectedDicePayload.payload,
					dropZoneId: zoneId,
					dropZoneElement: zoneElement,
					boardId: boardId,
				});
			}
		}

		this.cleanup();
	}

	private cleanup() {
		this.ghostElement?.remove();
		this.ghostElement = null;

		if (this.draggedElement) {
			this.draggedElement.style.opacity = '1';
			this.draggedElement = null;
		}

		this.selectedDicePayload = null;
	}
}
