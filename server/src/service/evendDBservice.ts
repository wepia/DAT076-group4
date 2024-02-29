import { SportEvent } from "../model/sportEvent";
import { IEventService } from "../model/event.interface";
import { eventModel } from "../../db/event.db";


export class EventDBService implements IEventService {


  async getEvents(): Promise<SportEvent[]>{
    return (await eventModel).find();
  }

  async addEvent(name : string, organizer : string, date : Date) :Promise<SportEvent>{
    return (await eventModel).create({
      id : Date.now(),
      name : name,
      organizer : organizer, 
      date : date
    })
  }


  async deleteEvent(id : number) :Promise<SportEvent[]>{
    const em = await eventModel;
    await em.deleteOne(
      {id:id}
    );
    return em.find();
  }

}