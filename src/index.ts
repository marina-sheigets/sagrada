
import "reflect-metadata";
import { container, singleton } from "tsyringe";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import "./index.css";

@singleton()
class Entry {
    constructor(
        protected dashboardComponent: DashboardComponent
    ) {
        const rootContainer = document.getElementById("root");
        if (!rootContainer) {
            alert("Critical error: Game cannot be initialized");
            return;
        }

        rootContainer.appendChild(this.dashboardComponent.rootElement);
        // Game Dashboard
        // - Play button

        // Show config window

        // - number of players (maximum 4)
        // - numbers of rounds (maximum 10)
        // -  hints
        // difficulty (easy, medium, hard)

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