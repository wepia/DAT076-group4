import { Event } from "../model/event";

export class EventService {
    private events : Event[] = [
        { id : Date.now(), name : 'Marathon', organizer : 'City Sports Club',  date : '2024-04-21', shifts : [] },
        { id : Date.now(), name : 'Triathlon', organizer : 'National Sports Organization',  date : '2024-06-15', shifts : [] },
        { id : Date.now(), name : 'Cycling Race', organizer : 'Cyclists Federation',  date : '2024-07-03', shifts : [] }
    ];
    
    async getEvents(): Promise<Event[]> {
        return JSON.parse(JSON.stringify(this.events));
    }

    async addEvent(name : string, organizer : string, date : string) {
        let newEvent : Event = {
            id : Date.now(),
            name : name,
            organizer : organizer, 
            date : date,
            shifts : []
        }

        this.events.push(newEvent);
    }

    async deleteEvent(id : number) {
      const newEventList = this.events.filter(event => event.id !== id);
    
      this.events = newEventList;
    }
}

