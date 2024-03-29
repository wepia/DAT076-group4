import { SportEvent } from "../model/sportEvent";
import { IEventService } from "./event.interface";
import { eventModel } from "../db/event.db";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { accountModel } from "../db/account.db";
import { Account } from "../model/account";


export class EventDBService implements IEventService {

  // Returns a list of accounts that are in the SportEvents "volunteers" field.
  // Throws an error if no SportEvents matches the given eventID.
  async getVolunteers(eventID: string): Promise<Account[]> {
    const em : Model<SportEvent> =  await eventModel;

    const event = await em.findOne({id:eventID}).populate("volunteers");
    if(event) {
      return event.volunteers;
    }

    throw("Couldn't find event");
  }

  // Adds an account to the SportEvents "volunteer" field.
  // Throws an error if either eventID or userName
  // doesn't match with an SportEvents or account respectively.
  async addVolunteer(eventID: string, userName: string): Promise<void> {
    const em : Model<SportEvent> =  await eventModel;
    const am : Model<Account> = await accountModel;

    const event = await em.findOne({id:eventID});
    if (!event) {
      throw new Error("Couldn't find event");
    }

    const account = await am.findOne({userName:userName});
    if(!account) {
      throw("Couldn't find user");
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

  // Removes a volunteer from the SportEvents "volunteer" field.
  // Throws an error if the eventID doesn't match with
  // an registered SportEvent.
  async removeVolunteer(eventID: string, userName: string): Promise<void> {
    const em : Model<SportEvent> = await eventModel;
    

    const event = await em.findOne({id:eventID}).populate("volunteers");
    if(!event) {
      throw("Couldn't find the event");
    }

    const index = event.volunteers.findIndex((volunteer : Account) => volunteer.userName === userName);       
    if (index !== -1) {
        event.volunteers.splice(index, 1);
    } 
    await event.save();
  }

  // Returns all the registered SportEvents. 
  async getEvents(): Promise<SportEvent[]>{
    const em : Model<SportEvent> = await eventModel;
    const events : SportEvent[] = await em.find();
    return events;
  }

  // Creates a new SportEvent
  async addEvent(name : string, organizer : string, date : Date, owner : string) :Promise<SportEvent>{
    return (await eventModel).create({
      id: new ObjectId().toString(),
      name : name,
      organizer : organizer, 
      date : date,
      volunteers : [],
      owner : owner
    })
  }

  // Deletes a SportEvent
  // Throws an error if the input "owner" does not match
  // with the SportEvents field "owner"
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

  // Returns a list of all the registered SportEvents
  // that are within the dates startDate and endDate.
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