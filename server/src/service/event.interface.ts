import { Account } from "../model/account";
import {SportEvent} from "../model/sportEvent";

export interface IEventService {

  //Returns a deep copy of the current list of events
  getEvents(): Promise<SportEvent[]>

  //Add a new event with the given name, organizer and date 
  //returns a copy of that event
  addEvent(name : string, organizer : string, date : Date, owner : string) :Promise<SportEvent>

  // Removes an event with the given id
  deleteEvent(id : string, owner : string): Promise<void>

  //Returns the list of volunteers assigned to this event
  getVolunteers(eventID : string): Promise<Account[]>

  //Try adding an account to the list of volunteers 
  //returns a boolean indicating if the account was added (true) or not (false)
  addVolunteer(eventID : string, userName : string): Promise<void>

  //Remove an account from the list of volunteers
  //Returns a boolean indicating if the account was removed (true) 
  //or if there was no such account to remove from the list (false)
  removeVolunteer(eventID : string, userName : string): Promise<void>

  // Returns the events that are within the date interval startDate-endDate.
  filterEvents(startDate : Date, endDate : Date) : Promise<SportEvent[]>
 }