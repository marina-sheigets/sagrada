import { injectable } from "tsyringe";
import { BaseComponent } from "../base-component/base-component";
import * as styles from './button.component.css';
// import { Informer } from "../../services/informer/informer.service";

@injectable()
export class ButtonComponent extends BaseComponent {
    buttonIconWrapper = document.createElement('div');
    buttonLabel = document.createElement('span');
    button = document.createElement('button');
    //onClick = new Informer<any>();

    constructor(
    ) {
        super(styles);

        this.button.addEventListener('mousedown', (e: Event) => {
            e.stopPropagation();
            //this.onClick.inform(e)
        });
        this.button.append(this.buttonIconWrapper, this.buttonLabel);
        this.rootElement.append(
            this.button
        );
    }

    addButtonLabel(label: string) {
        this.buttonLabel.textContent = label;
    }

    addButtonValue(value: string) {
        this.button.value = value;
    }

    disable() {
        this.button.disabled = true;
        this.rootElement.classList.add(styles.disabled);
    }

    enable() {
        this.button.disabled = false;
        this.rootElement.classList.remove(styles.disabled);
    }

    show() {
        this.rootElement.classList.remove(styles.hidden);
    }

    hide() {
        this.rootElement.classList.add(styles.hidden);
    }

    setSize(size: 'small' | 'medium' | 'large') {
        this.button.classList.remove(styles.small, styles.medium, styles.large);
        this.button.classList.add(styles[size]);
    }
}