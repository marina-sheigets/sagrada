import { BaseComponent } from "../../shared/base-component/base-component";

export class PlayingFieldComponent extends BaseComponent {

    constructor() {
        super();

        const title = document.createElement("h2");
        title.textContent = "Game in progress";
        this.rootElement.append(title);
    }
}