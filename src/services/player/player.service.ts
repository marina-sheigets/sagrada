import { singleton } from 'tsyringe';
import { Player } from '../../types/player';

@singleton()
export class PlayerService {
	private PLAYERS: Player[] = [
		{
			id: '1',
			nickname: 'John',
		},
		{
			id: '2',
			nickname: 'Anna',
		},
	];

	getAllPlayers() {
		return this.PLAYERS;
	}

	getPlayerById(playerId: string) {
		return this.PLAYERS.find((player) => player.id === playerId);
	}
}
