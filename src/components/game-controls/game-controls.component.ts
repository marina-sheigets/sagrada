import { singleton } from "tsyringe";
import { BaseComponent } from "../../shared/base-component/base-component";

import * as styles from './game-controls.component.css';
import { ButtonComponent } from "../../shared/button/button.component";
import { MessengerService } from "../../services/messenger/messenger.service";
import { Messages } from "../../constants/messages";
import { Informer } from "../../services/informer/informer.service";

@singleton()
export class GameControlsComponent extends BaseComponent {
    private readonly numberOfPlayersRange = document.createElement("input");
    private readonly showLegalMovesToggle = document.createElement("input");
    private readonly difficultyDropdown = document.createElement("select");
    private readonly advancedRulesToggle = document.createElement("input");
    private readonly undoEnabledToggle = document.createElement("input");
    private readonly timePerTurnInput = document.createElement("input");


    onGameStart = new Informer();

    constructor(
        protected startGameButton: ButtonComponent,
        protected messenger: MessengerService
    ) {
        super(styles);

        this.numberOfPlayersRange.type = "range";

        this.showLegalMovesToggle.type = "checkbox";
        this.advancedRulesToggle.type = "checkbox";
        this.undoEnabledToggle.type = "checkbox";

        this.timePerTurnInput.type = "number";

        this.startGameButton.addButtonLabel("Start Game")
        this.startGameButton.rootElement.classList.add(styles.startGameButton);

        this.rootElement.append(
            this.createLabeledControl("Number of players", this.numberOfPlayersRange),
            this.createLabeledControl("Show legal moves", this.showLegalMovesToggle),
            this.createLabeledControl("Difficulty", this.difficultyDropdown),
            this.createLabeledControl("Advanced rules", this.advancedRulesToggle),
            this.createLabeledControl("Undo enabled", this.undoEnabledToggle),
            this.createLabeledControl("Time per turn (seconds)", this.timePerTurnInput),
            this.startGameButton.rootElement
        );

        this.startGameButton.onClick.subscribe(this.handleStartGame.bind(this))
    }

    private createLabeledControl(text: string, control: HTMLElement): HTMLLabelElement {
        const label = document.createElement("label");
        label.textContent = text;
        label.append(control);

        return label;
    }

    private handleStartGame() {
        this.messenger.send(Messages.StartGame);
        this.onGameStart.inform();
    }
}