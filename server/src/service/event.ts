import { Event, Shift } from "../model/event";

export class EventService {
    private events : Event[] = [];
    private nextEventID : number = 1; //saving 0 if we want to implement a "trashcan id"
    private nextShiftID : number = 1; //saving 0 if we want to implement a "trashcan id"
    //TODO this is copypaste from account. maybe fix reusable function instead?
    private async accessEvent(eventID : number):Promise<Event>{
        let eIndex : number = this.events.findIndex(v => v.id === eventID);
        if(eIndex === -1){
          throw new Error("Requested eventID does not exist.");
        }
        return this.events[eIndex];
    }
    
    async getEvents(): Promise<Event[]> {
        return JSON.parse(JSON.stringify(this.events));
    }

    async addEvent(name : string, organizer : string, date : Date) :Promise<Event[]>{
        let newEvent : Event = {
            id : this.nextEventID++,
            name : name,
            organizer : organizer, 
            date : date,
            shifts : []
        }

        this.events.push(newEvent);
        return JSON.parse(JSON.stringify(this.events));
    }

    async deleteEvent(id : number) :Promise<Event[]>{
      const newEventList = this.events.filter(event => event.id !== id);
    
      this.events = newEventList;
      return JSON.parse(JSON.stringify(this.events));
    }

    async scheduleShift(eventID : number, description : string, start : Date, end : Date, requiredVolunteers : number) :Promise<Event>{
        let event : Event = await this.accessEvent(eventID);
        let newShift : Shift = {
            id : this.nextShiftID++,
            description : description,
            start: start,
            end: end,
            assignedVolunteers: 0, 
            requiredVolunteers: requiredVolunteers
        };
        event.shifts.push(newShift);
        return JSON.parse(JSON.stringify(event));
    }

    async unscheduleShift(eventID: number, shiftID: number) :Promise<Event>{
        let event : Event = await this.accessEvent(eventID);
        let shiftIndex = event.shifts.findIndex(s => (s.id === shiftID));
        if(shiftIndex > -1){
            event.shifts.splice(shiftIndex, 1);
        }
        return JSON.parse(JSON.stringify(event));
    }
        //TODO schedule/unschedule volunteer + should we call accounts from here to make sure to scedule/unschedule the accounts?
    
}
