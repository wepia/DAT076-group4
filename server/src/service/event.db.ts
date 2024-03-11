import { SportEvent } from "../model/sportEvent";
import { IEventService } from "./event.interface";
import { eventModel } from "../db/event.db";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { Account } from "../model/account";
import { accountModel } from "../db/account.db";

export class EventDBService implements IEventService {

  async getVolunteers(eventID: string): Promise<Account[]> {
    const em : Model<SportEvent> =  await eventModel;

    const event = await em.findOne({id:eventID}).populate("volunteers");
    
    if(event) {
      
      return event.volunteers;
    }

    throw("Couldn't find event");
  }

  async addVolunteer(eventID: string, userName: string): Promise<void> {
    const em: Model<SportEvent> = await eventModel;
    const am: Model<Account> = await accountModel;

    const event = await em.findOne({ id: eventID });
    if (!event) {
        throw new Error("Couldn't find event");
    }

    const account = await am.findOne({ userName: userName });
    if (!account) {
        throw new Error("Couldn't find user");
    }

    const updatedEvent = await em.findByIdAndUpdate(
        event._id,
        { $addToSet: { volunteers: account._id } },
        { new: true, safe: true }
    );

    if (!updatedEvent) {
        throw new Error("Failed to update event");
    }
  }

  async removeVolunteer(eventID: string, userName: string): Promise<void> {
    const em : Model<SportEvent> = await eventModel;
    

    const event = await em.findOne({id:eventID}).populate("volunteers");
    console.log("event in service to remove volunteer: " + event)
    if(event === null) {
      throw("Couldn't find the event");
    }
    const index = event.volunteers.findIndex((volunteer : Account) => volunteer.userName === userName);
        
    if (index !== -1) {
        event.volunteers.splice(index, 1);
        await event.save();
        
        return; 
    } else {
        throw(`Volunteer with username ${userName} is not signed up for this event`);
    }

  }

  async getEvents(): Promise<SportEvent[]>{
    const em : Model<SportEvent> = await eventModel;
    const events : SportEvent[] = await em.find();
    return events;
  }

  async addEvent(name : string, organizer : string, date : Date, owner : string) :Promise<SportEvent>{
    const em: Model<SportEvent> = await eventModel;

    return await em.create({
      id: new ObjectId().toString(),
      name : name,
      organizer : organizer, 
      date : date,
      volunteers : [],
      owner : owner
    });
  }


  async deleteEvent(id : string, owner : string) :Promise<void>{
    const em : Model<SportEvent> =  await eventModel;
    
    const event = await em.findOne({ id: id, owner: owner });
    if(event){
    await em.deleteOne(
      {id:id, owner:owner}
    );
    } else {
      throw new Error("Not the owner of the event");
    }
  }

  async filterEvents(startDate : Date, endDate : Date) : Promise<SportEvent[]> {
    const em : Model<SportEvent> =  await eventModel;

    if(startDate > endDate){
      throw new Error("No filtering, the start date is later than the end date.");
    }

    const events = await em.find({
      date: {$gte : startDate, $lte :endDate}
    }).exec();

    return events;
  }

}