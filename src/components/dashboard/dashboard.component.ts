import { singleton } from "tsyringe";
import { BaseComponent } from "../../shared/base-component/base-component";
import * as styles from "./dashboard.component.css";
import { ButtonComponent } from "../../shared/button/button.component";

@singleton()
export class DashboardComponent extends BaseComponent {
    private backgroundImageContainer = document.createElement("div");

    private gameInfoContainer = document.createElement("div");
    private gameTitle = document.createElement("h1");
    private gameDescription = document.createElement("p");


    constructor(
        protected playButtonComponent: ButtonComponent
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
        this.playButtonComponent.addButtonLabel("Start the game");
        this.playButtonComponent.addButtonValue("Start the game");
    }
}