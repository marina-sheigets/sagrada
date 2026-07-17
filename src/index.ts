
import "reflect-metadata";
import { container, singleton } from "tsyringe";
import { Router } from "./navigation/router/router.component";

import "./index.css";

@singleton()
class Entry {
    constructor(
        private readonly router: Router
    ) {
        this.router.start();

    }


}

container.resolve(Entry)