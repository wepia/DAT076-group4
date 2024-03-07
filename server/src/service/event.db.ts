import { SportEvent } from "../model/sportEvent";
import { IEventService } from "./event.interface";
import { eventModel } from "../db/event.db";
import { ObjectId } from "mongodb";


export class EventDBService implements IEventService {
  getFilteredEvents(filter: { ids: string[]; from: Date; to: Date; organizer: string; }): Promise<SportEvent[]> {
    throw new Error("Method not implemented.");
  }
  addVolunteer(eventID: string, userName: string): Boolean {
    throw new Error("Method not implemented.");
  }
  removeVolunteer(eventID: string, userName: string): Boolean {
    throw new Error("Method not implemented.");
  }
  async getEvents(): Promise<SportEvent[]>{
    return (await eventModel).find();
  }

  async addEvent(name : string, organizer : string, date : Date) :Promise<SportEvent>{
    return (await eventModel).create({
      id: new ObjectId().toString(),
      name : name,
      organizer : organizer, 
      date : date,
      volunteers : []
    })
  }


  async deleteEvent(id : string) :Promise<SportEvent[]>{
    const em = await eventModel;
    await em.deleteOne(
      {id:id}
    );
    return em.find();
  }

}