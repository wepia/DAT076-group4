import { SportEvent } from "../model/sportEvent";

export class EventService {
    private events : SportEvent[] = [];

    async getEvents(): Promise<SportEvent[]> {
        return JSON.parse(JSON.stringify(this.events));
    }
}
