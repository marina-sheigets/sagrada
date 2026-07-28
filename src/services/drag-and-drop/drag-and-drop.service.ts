// drag-drop.service.ts
import { singleton } from 'tsyringe';
import { Informer } from '../informer/informer.service';

export interface DropZone {
	id: string;
	element: HTMLElement;
	canAccept?: (payload: unknown) => boolean;
}

@singleton()
export class DragDropService {
	onDrop = new Informer<{ draggableId: string; payload: unknown; dropZoneId: string }>();

	private dropZones = new Map<string, DropZone>();
	private draggedElement: HTMLElement | null = null;
	private ghostElement: HTMLElement | null = null;
	private currentPayload: { id: string; payload: unknown } | null = null;

	registerDropZone(zone: DropZone) {
		this.dropZones.set(zone.id, zone);
	}

	unregisterDropZone(id: string) {
		this.dropZones.delete(id);
	}

	makeDraggable(element: HTMLElement, payload: unknown, id: string) {
		element.style.touchAction = 'none'; // stops the page from scrolling while dragging on touch
		element.addEventListener('pointerdown', (e) => this.onPointerDown(e, element, payload, id));
	}

	private onPointerDown(e: PointerEvent, element: HTMLElement, payload: unknown, id: string) {
		e.preventDefault();

		this.currentPayload = { id, payload };
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
			position: 'fixed',
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
		const dropZone = this.findDropZoneAtPoint(e.clientX, e.clientY);
		const accepted =
			dropZone &&
			this.currentPayload &&
			(!dropZone.canAccept || dropZone.canAccept(this.currentPayload.payload));

		if (accepted && dropZone && this.currentPayload) {
			this.onDrop.inform({
				draggableId: this.currentPayload.id,
				payload: this.currentPayload.payload,
				dropZoneId: dropZone.id,
			});
		}
		// if not accepted, ghost just disappears and the dice snaps back — see cleanup()

		this.cleanup();
	}

	private findDropZoneAtPoint(x: number, y: number): DropZone | undefined {
		for (const zone of this.dropZones.values()) {
			const rect = zone.element.getBoundingClientRect();
			if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
				return zone;
			}
		}
		return undefined;
	}

	private cleanup() {
		this.ghostElement?.remove();
		this.ghostElement = null;

		if (this.draggedElement) {
			this.draggedElement.style.opacity = '1';
			this.draggedElement = null;
		}

		this.currentPayload = null;
	}
}
