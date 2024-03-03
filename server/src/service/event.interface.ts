import {SportEvent} from "../model/sportEvent";

export interface IEventService {

  // Returns a deep copy of the current list of events
  getEvents(): Promise<SportEvent[]>

   // Adds a new event with the given name, organizer and date and returns a copy of that event
  addEvent(name : string, organizer : string, date : Date) :Promise<SportEvent>

  // Removes an event with the given id and returns a deep copy of the new list of events
  deleteEvent(id : number) :Promise<SportEvent[]>

  // Returns the events that are within the date interval startDate-endDate.
  filterEvents(startDate : Date, endDate : Date) : Promise<SportEvent[]>
 }