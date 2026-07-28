import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import { Router } from './navigation/router/router.component';
import { GameControllerService } from './services/game-controller/game-controller.service';

import './index.css';

@singleton()
class Entry {
	constructor(
		private readonly router: Router,
		private readonly gameController: GameControllerService,
	) {
		this.router.start();
	}
}

container.resolve(Entry);
