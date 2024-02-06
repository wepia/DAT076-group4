import { SportEvent } from "../model/sportEvent";

export class EventService {
    private events : SportEvent[] = [];
    
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
          return {...newEvent};
    }

    async deleteEvent(id : number) {
      const newEventList = this.events.filter(event => event.id !== id);
    
      this.events = newEventList;
}
}