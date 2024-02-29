import { SportEvent } from "../model/sportEvent";
import { IEventService } from "../model/event.interface";

export class EventService implements IEventService {
    private events : SportEvent[] = [];
    
    async getEvents(): Promise<SportEvent[]> {
        return JSON.parse(JSON.stringify(this.events));
    }

    async addEvent(name : string, organizer : string, date : Date) :Promise<SportEvent>{
        let newEvent : SportEvent = {
            id : Date.now(),
            name : name,
            organizer : organizer, 
            date : date
        }

        this.events.push(newEvent);
        return JSON.parse(JSON.stringify(newEvent));
    }

    async deleteEvent(id : number) :Promise<SportEvent[]>{
      const newEventList = this.events.filter(event => event.id !== id);
    
      this.events = newEventList;
      return JSON.parse(JSON.stringify(this.events));
    }
}

