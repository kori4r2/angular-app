import { Event } from "./event";

export const DEFAULT_EVENT: Event = new Event(-1, "Novo evento", new Date(), new Date());

export const EVENTS: Event[] = [
	new Event(1, "bandeco", new Date(2020, 2, 2, 11, 0), new Date(2020, 2, 2, 11, 45)),
	new Event(2, "aula redes neuras", new Date(2020, 2, 5, 8, 0), new Date(2020, 2, 5, 12, 0)),
	new Event(3, "supermercado", new Date(2020, 2, 3, 12, 30), new Date(2020, 2, 3, 12, 50)),
	new Event(4, "treino hema", new Date(2020, 2, 2, 19, 0), new Date(2020, 2, 2, 21, 0)),
	new Event(5, "bandeco", new Date(2020, 2, 2, 17, 0), new Date(2020, 2, 2, 18, 0)),
	new Event(6, "bandeco", new Date(2020, 2, 3, 11, 0), new Date(2020, 2, 3, 11, 45)),
	new Event(7, "farmacia", new Date(2020, 2, 3, 19, 0), new Date(2020, 2, 3, 19, 30)),
	new Event(8, "reunião fog", new Date(2020, 2, 2, 18, 0), new Date(2020, 2, 2, 19, 0))
];
