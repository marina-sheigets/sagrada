import { singleton } from 'tsyringe';
import { generateId } from '../../utils/generate-id';
import { Difficulty } from '../../types/difficulty';
import { BoardCell } from '../../types/board-cell';
import { VALUES } from '../../constants/dice-values';
import { DICE_COLOR } from '../../constants/dice-colors';
import { Dice } from '../../types/dice';
import { MessengerService } from '../messenger/messenger.service';
import { Messages } from '../../constants/messages';
import { PlaceDataPayload } from '../../types/place-dice-payload';

@singleton()
export class GameBoardService {
	private difficulty: Difficulty = 6;
	private readonly rows = 4;
	private readonly columns = 5;

	private boards: { [boardId: string]: BoardCell[] } = {};

	private readonly restrictionChance: Record<Difficulty, number> = {
		[Difficulty.Light]: 0.1,
		[Difficulty.Easy]: 0.25,
		[Difficulty.Medium]: 0.45,
		[Difficulty.Hard]: 0.65,
		[Difficulty.SuperHard]: 0.8,
	};

	constructor(protected messenger: MessengerService) {
		this.messenger.subscribe(Messages.PlaceDice, this.handlePlaceDice.bind(this));
	}

	createBoard(): { boardId: string; board: BoardCell[] } {
		const board: BoardCell[] = [];
		const boardId = generateId();

		for (let row = 0; row < this.rows; row++) {
			for (let column = 0; column < this.columns; column++) {
				const cell: BoardCell = {
					id: generateId(8),
					row,
					column,
					isEdgeCell:
						row === 0 ||
						row === this.rows - 1 ||
						column === 0 ||
						column === this.columns - 1,
				};

				this.assignRestriction(board, cell);

				board.push(cell);
			}
		}
		this.boards[boardId] = board;

		return { boardId, board };
	}

	private assignRestriction(board: BoardCell[], cell: BoardCell) {
		if (Math.random() > this.restrictionChance[this.difficulty]) {
			return;
		}

		if (Math.random() < 0.5) {
			cell.constantColor = this.generateOption(
				board,
				cell,
				Object.values(DICE_COLOR),
				(c) => c.constantColor,
			);
		} else {
			cell.constantValue = this.generateOption(board, cell, VALUES, (c) => c.constantValue);
		}
	}

	private generateOption<T>(
		board: BoardCell[],
		cell: BoardCell,
		options: readonly T[],
		selector: (cell: BoardCell) => T | undefined,
	): T | undefined {
		const forbidden = new Set<T>();

		const left = this.getCell(board, cell.row, cell.column - 1);
		const top = this.getCell(board, cell.row - 1, cell.column);

		if (left) {
			const value = selector(left);
			if (value !== undefined) forbidden.add(value);
		}

		if (top) {
			const value = selector(top);
			if (value !== undefined) forbidden.add(value);
		}

		const available = options.filter((option) => !forbidden.has(option));

		if (available.length === 0) {
			return;
		}

		return available[Math.floor(Math.random() * available.length)];
	}

	private getCell(board: BoardCell[], row: number, column: number): BoardCell | undefined {
		return board.find((c) => c.row === row && c.column === column);
	}

	canPlaceDice({ boardId, payload, cellId }: PlaceDataPayload): boolean {
		const board = this.findBoardById(boardId);
		if (!board) return false;

		const cellObject = this.getCellById(board, cellId);
		if (!cellObject) return false;
		if (cellObject.dice) return false;

		if (cellObject.constantColor && cellObject.constantColor !== payload.color) return false;
		if (cellObject.constantValue && cellObject.constantValue !== payload.value) return false;

		const isAnyDicePlaced = board.some((cell) => cell.dice);
		if (!isAnyDicePlaced) return cellObject.isEdgeCell;

		if (!this.checkPosition(board, cellObject)) return false;
		return this.checkCompatibilityWithNeighbors(board, cellObject, payload);
	}

	private findBoardById(boardId: string): BoardCell[] | undefined {
		return this.boards[boardId];
	}

	private checkPosition(board: BoardCell[], cellObject: BoardCell) {
		const allNeighbors = this.getAllNeighbors(board, cellObject);
		const hasAdjacentDice = allNeighbors.some((n) => n.dice);

		if (!hasAdjacentDice) return false; // must touch at least one placed dice, any direction
	}

	private checkCompatibilityWithNeighbors(board: BoardCell[], cellObject: BoardCell, dice: Dice) {
		const orthogonalNeighbors = this.getOrthogonalNeighbors(board, cellObject);
		const conflictsWithNeighbor = orthogonalNeighbors.some(
			(n) => n.dice && (n.dice.color === dice.color || n.dice.value === dice.value),
		);
		return !conflictsWithNeighbor;
	}

	private getCellById(board: BoardCell[], id: string): BoardCell | undefined {
		return board.find((c) => c.id === id);
	}

	private getAllNeighbors(board: BoardCell[], cell: BoardCell): BoardCell[] {
		return [
			this.getCell(board, cell.row - 1, cell.column),
			this.getCell(board, cell.row + 1, cell.column),
			this.getCell(board, cell.row, cell.column - 1),
			this.getCell(board, cell.row, cell.column + 1),
			this.getCell(board, cell.row - 1, cell.column - 1),
			this.getCell(board, cell.row - 1, cell.column + 1),
			this.getCell(board, cell.row + 1, cell.column - 1),
			this.getCell(board, cell.row + 1, cell.column + 1),
		].filter((c): c is BoardCell => c !== undefined);
	}

	private getOrthogonalNeighbors(board: BoardCell[], cell: BoardCell): BoardCell[] {
		return [
			this.getCell(board, cell.row - 1, cell.column),
			this.getCell(board, cell.row + 1, cell.column),
			this.getCell(board, cell.row, cell.column - 1),
			this.getCell(board, cell.row, cell.column + 1),
		].filter((c): c is BoardCell => c !== undefined);
	}

	private handlePlaceDice({ cellId, payload, boardId }: PlaceDataPayload) {
		debugger;
		this.boards[boardId] = this.boards[boardId].map((cell) => {
			if (cell.id === cellId) {
				return {
					...cell,
					dice: payload,
				};
			}
			return cell;
		});

		this.messenger.send(Messages.InitBoards, this.boards);
	}
}
