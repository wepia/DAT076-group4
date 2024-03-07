import { SportEvent } from "../model/sportEvent";
import { IEventService } from "./event.interface";
import { eventModel } from "../db/event.db";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { accountModel } from "../db/account.db";
import { Account } from "../model/account";


export class EventDBService implements IEventService {
  async addVolunteer(eventID: string, userName: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  async removeVolunteer(eventID: string, userName: string): Promise<Boolean> {
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


  async deleteEvent(id : string) :Promise<void>{
    const em = await eventModel;
    await em.deleteOne(
      {id:id}
    );
  }

  async filterEvents(startDate : Date, endDate : Date) : Promise<SportEvent[]> {
    const em = await eventModel;
    const events = await em.find({
      date: {$gte : startDate, $lte :endDate}
    }).exec();

    return events;
  }

}