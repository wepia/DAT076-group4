import { SportEvent } from "../model/sportEvent";
import { IEventService } from "./event.interface";
import { eventModel } from "../db/event.db";
import { Model } from "mongoose";
import { accountModel } from "../db/account.db";
import { Account } from "../model/account";


export class EventDBService implements IEventService {
  getFilteredEvents(filter: { ids: number[]; from: Date; to: Date; organizer: string; }): Promise<SportEvent[]> {
    throw new Error("Method not implemented.");
  }
  addVolunteer(eventID: number, userName: string): Boolean {
    throw new Error("Method not implemented.");
  }
  removeVolunteer(eventID: number, userName: string): Boolean {
    throw new Error("Method not implemented.");
  }
  async getEvents(): Promise<SportEvent[]>{
    
    return (await eventModel).find();
  }

  async addEvent(name : string, organizer : string, date : Date) :Promise<SportEvent>{
    return (await eventModel).create({
      id : Date.now(),
      name : name,
      organizer : organizer, 
      date : date,
      volunteers : []
    })
  }


  async deleteEvent(id : number) :Promise<SportEvent[]>{
    const em = await eventModel;
    await em.deleteOne(
      {id:id}
    );
    return em.find();
  }

  async filterEvents(startDate : Date, endDate : Date) : Promise<SportEvent[]> {
    const em = await eventModel;
    const events = await em.find({
      date: {$gte : startDate, $lte :endDate}
    }).exec();

    return events;
  }

}