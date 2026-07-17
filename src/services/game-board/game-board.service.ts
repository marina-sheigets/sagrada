import { singleton } from 'tsyringe';
import { Color } from '../../types/color';
import { Dice } from '../../types/dice';
import { generateId } from '../../utils/generate-id';
import { COLORS } from '../../constants/dice-colors';
import { Difficulty } from '../../types/difficulty';
import { BoardCell } from '../../types/board-cell';
import { VALUES } from '../../constants/dice-values';

@singleton()
export class GameBoardService {
	private difficulty: Difficulty = 6;
	private readonly rows = 4;
	private readonly columns = 5;

	private gameBoard: BoardCell[] = [];

	private readonly restrictionChance: Record<Difficulty, number> = {
		[Difficulty.Light]: 0.1,
		[Difficulty.Easy]: 0.25,
		[Difficulty.Medium]: 0.45,
		[Difficulty.Hard]: 0.65,
		[Difficulty.SuperHard]: 0.8,
	};

	createBoard(): BoardCell[] {
		this.gameBoard = [];

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

				this.assignRestriction(cell);

				this.gameBoard.push(cell);
			}
		}

		return this.gameBoard;
	}

	private assignRestriction(cell: BoardCell) {
		if (Math.random() > this.restrictionChance[this.difficulty]) {
			return;
		}

		if (Math.random() < 0.5) {
			cell.constantColor = this.generateOption(cell, COLORS, (c) => c.constantColor);
		} else {
			cell.constantValue = this.generateOption(cell, VALUES, (c) => c.constantValue);
		}
	}

	private generateOption<T>(
		cell: BoardCell,
		options: readonly T[],
		selector: (cell: BoardCell) => T | undefined,
	): T {
		const forbidden = new Set<T>();

		const left = this.getCell(cell.row, cell.column - 1);
		const top = this.getCell(cell.row - 1, cell.column);

		if (left) {
			const value = selector(left);
			if (value !== undefined) forbidden.add(value);
		}

		if (top) {
			const value = selector(top);
			if (value !== undefined) forbidden.add(value);
		}

		const available = options.filter((option) => !forbidden.has(option));

		return available[Math.floor(Math.random() * available.length)];
	}

	private getCell(row: number, column: number): BoardCell | undefined {
		return this.gameBoard.find((c) => c.row === row && c.column === column);
	}
}
