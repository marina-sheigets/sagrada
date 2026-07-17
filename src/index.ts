
import "reflect-metadata";
import { container, singleton } from "tsyringe";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import "./index.css";
import { GameSettingsComponents } from "./components/game-settings/game-settings.component";

@singleton()
class Entry {
    constructor(
        protected dashboardComponent: DashboardComponent,
        protected gameSettingsComponent: GameSettingsComponents
    ) {
        const rootContainer = document.getElementById("root");
        if (!rootContainer) {
            alert("Critical error: Game cannot be initialized");
            return;
        }

        rootContainer.append(
            this.dashboardComponent.rootElement,
            this.gameSettingsComponent.rootElement
        );
        // Game Dashboard
        // - Play button

        // Show config window

        // - number of players (maximum 4)
        // -  Show legal placements
        //  First die must be placed on edge
        // difficulty (easy, medium, hard)
        // advanced rules
        // undo enabled - if on, player can undo his turn and re-select dice, and only after that finish his turn
        // - do the logic of timer per player to restrict spent much time per turn

        // Game Initialization
        //  - initialize dices  (90 - 4 colors, 6 faces)
        // - initialize players (name, color)
        // - initialize round tracker (rounds, current round)
        // - initialize boards
        // - create unique game id and save it to the server


        // Start game
        // -  add round-tracker
        // - add boards
        // - automatically select hidden targets for each player and save them to the server

        // Each round 
        // - roll dices (number of players * 2 + 1)
        // - show dices to players
        // - - make the round system (1 -> 4, 4 -> 1)
        // - last dice on round tracker
        // - save current round to server

        // End of the game
        // - calculate scores
        // - show hidden targets of each player
        // - show final scores
        // - play animation for the winner
        // - remove game from the server
    }


}

container.resolve(Entry)