import { SportEvent } from "../model/sportEvent";

export class EventService {
    private events : SportEvent[] = [
        new SportEvent('Marathon', 'City Sports Club', '2024-04-21'),
        new SportEvent('Triathlon', 'National Sports Organization', '2024-06-15'),
        new SportEvent('Cycling Race', 'Cyclists Federation', '2024-07-03'),
    ];
    
    async getEvents(): Promise<SportEvent[]> {
        return JSON.parse(JSON.stringify(this.events));
    }

    async addEvent(name : string, organizer : string, date : string) {
        let newEvent : SportEvent = {
            id : Date.now(),
            name : name,
            organizer : organizer, 
            date : date
        }

        this.events.push(newEvent);
    }

    async deleteEvent(id : number) {
      const newEventList = this.events.filter(event => event.id !== id);
    
      this.events = newEventList;
    }
}

