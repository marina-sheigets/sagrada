import { singleton } from "tsyringe";
import { Dice } from "../../types/dice";
import { COLORS } from "../../constants/dice-colors";

@singleton()
export class DicesBagService {
    private readonly maxDiceValue = 6;

    private allDices: Dice[] = [];
    private usedDices: Dice[] = [];
    private unusedDices: Dice[] = [];

    initAllDices() {
        for (const color of COLORS) {
            for (let value = 1; value <= this.maxDiceValue; value++) {
                this.allDices.push(
                    { value, color, oppositeFaceValue: 7 - value },
                    { value, color, oppositeFaceValue: 7 - value },
                    { value, color, oppositeFaceValue: 7 - value },
                );
            }
        }

        this.unusedDices = [...this.allDices];
    }
}