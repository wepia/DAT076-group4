import { SportEvent } from "../model/sportEvent";

export class EventService {
    private events : SportEvent[] = [
        new SportEvent('1', 'Marathon', 'City Sports Club', '2024-04-21'),
        new SportEvent('2', 'Triathlon', 'National Sports Organization', '2024-06-15'),
        new SportEvent('3', 'Cycling Race', 'Cyclists Federation', '2024-07-03'),
    ];
    
    async getEvents(): Promise<SportEvent[]> {
        return JSON.parse(JSON.stringify(this.events));
    }
}
