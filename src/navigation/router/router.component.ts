import { singleton } from "tsyringe";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { PlayingFieldComponent } from "../../pages/playing-field/playing-field.component";
import { MessengerService } from "../../services/messenger/messenger.service";
import { Messages } from "../../constants/messages";

@singleton()
export class Router {
    private isGameStarted = false;

    constructor(
        private readonly dashboardPage: DashboardComponent,
        private readonly playingFieldPage: PlayingFieldComponent,
        private readonly messenger: MessengerService,
    ) { }

    private readonly root = document.getElementById("root")!;

    start() {
        window.addEventListener("popstate", () => this.render());

        this.messenger.subscribe(Messages.StartGame, () => {
            this.isGameStarted = true;
            this.navigate("/game");
        });

        this.render();
    }

    navigate(path: string) {
        history.pushState({}, "", path);
        this.render();
    }

    private render() {
        this.root.replaceChildren();

        const path = location.pathname;

        if (path.startsWith("/game") && !this.isGameStarted) {
            history.replaceState({}, "", "/");
            this.root.append(this.dashboardPage.rootElement);
            return;
        }

        if (path === "/") {
            this.root.append(this.dashboardPage.rootElement);
        }
        else if (path.startsWith("/game")) {
            this.root.append(this.playingFieldPage.rootElement);
        }
    }
}