import { singleton } from "tsyringe";
import { BaseComponent } from "../../shared/base-component/base-component";
import { MessengerService } from "../../services/messenger/messenger.service";
import { ButtonComponent } from "../../shared/button/button.component";
import { Messages } from "../../constants/messages";

import * as styles from "./dashboard.component.css";

@singleton()
export class DashboardComponent extends BaseComponent {
    private backgroundImageContainer = document.createElement("div");

    private gameInfoContainer = document.createElement("div");
    private gameTitle = document.createElement("h1");
    private gameDescription = document.createElement("p");


    constructor(
        protected playButtonComponent: ButtonComponent,
        protected messenger: MessengerService
    ) {
        super(styles);

        this.addTitle();
        this.addDescription();
        this.addPlayButton();

        this.gameInfoContainer.append(
            this.gameTitle,
            this.gameDescription,
            this.playButtonComponent.rootElement
        );

        this.rootElement.append(
            this.backgroundImageContainer,
            this.gameInfoContainer
        )

        this.backgroundImageContainer.classList.add(styles.backgroundImageContainer);
        this.gameInfoContainer.classList.add(styles.gameInfoContainer);

    }

    private addTitle() {
        this.gameTitle.textContent = "Sagrada"
    }

    private addDescription() {
        this.gameDescription.textContent = "Craft the best stained-glass windows by carefully placing colorful translucent dice"
    }

    private addPlayButton() {
        this.playButtonComponent.setSize("large");
        this.playButtonComponent.addButtonLabel("Play");
        this.playButtonComponent.addButtonValue("Play");

        this.playButtonComponent.onClick.subscribe(() => {
            this.messenger.send(Messages.ShowGameSettings)
        })
    }
}