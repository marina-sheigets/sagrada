import { singleton } from "tsyringe";
import { MessengerService } from "../../services/messenger/messenger.service";
import { Messages } from "../../constants/messages";
import { BaseComponent } from "../../shared/base-component/base-component";
import { GameControlsComponent } from "../game-controls/game-controls.component";

import * as styles from './game-settings.component.css';

@singleton()
export class GameSettingsComponents extends BaseComponent {
    private readonly title = document.createElement("h1");

    private readonly content = document.createElement("div");


    constructor(
        protected messenger: MessengerService,
        protected gameControlsComponent: GameControlsComponent
    ) {
        super(styles);

        this.title.textContent = "Game Settings";

        this.messenger.subscribe(Messages.ShowGameSettings, () => {
            this.show();
        })

        this.content.classList.add(styles.content);

        this.content.append(
            this.title,
            this.gameControlsComponent.rootElement
        );

        this.rootElement.append(
            this.content
        );

        this.gameControlsComponent.onGameStart.subscribe(() => {
            this.hide();
        });


        this.hide();
    }


    show() {
        this.rootElement.classList.remove(styles.hidden);
    }

    hide() {
        this.rootElement.classList.add(styles.hidden);
    }
}