import { SportEvent } from "../model/sportEvent";
import { IEventService } from "./event.interface";
import { eventModel } from "../db/event.db";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";

export class EventDBService implements IEventService {
  async getVolunteers(eventID: string): Promise<string[]> {
    const em: Model<SportEvent> = await eventModel;
    const event = await em.findOne({ id: eventID });

    if (event === null) {
      throw "No event with id " + eventID;
    }
    return event.volunteers;
  }

  async addVolunteer(eventID: string, userName: string): Promise<void> {
    try {
      const em: Model<SportEvent> = await eventModel;
      const event = await em.findOne({ id: eventID });
      if (!event) {
        throw new Error("Event not found");
      }
  
      const updatedEvent = await em.findByIdAndUpdate(
        event._id,
        { $addToSet: { volunteers: userName } },
        { new: true, safe: true }
      );
  
      if (!updatedEvent) {
        throw new Error("Failed to update event");
      }
    } catch (error) {
      console.error("Error adding username:", error);
    }
  }

  async removeVolunteer(eventID: string, userName: string): Promise<void> {
    const em: Model<SportEvent> = await eventModel;
    const event = await em.findOne({ id: eventID });

    if (event === null) {
      throw new Error("No user with id " + eventID);
    }
    const index = event.volunteers.indexOf(userName);
    if (index !== -1) {
      event.volunteers.splice(index, 1);
    }
    await event.save();
  }

  async getEvents(): Promise<SportEvent[]>{
    return (await eventModel).find();
  }

  async addEvent(name : string, organizer : string, date : Date) :Promise<SportEvent>{
    const em: Model<SportEvent> = await eventModel;

    return await em.create({
      id: new ObjectId().toString(),
      name : name,
      organizer : organizer, 
      date : date,
      volunteers : []
    });
  }


  async deleteEvent(id : string) :Promise<void>{
    const em = await eventModel;
    await em.deleteOne(
      {id:id}
    );
  }

  async filterEvents(startDate : Date, endDate : Date) : Promise<SportEvent[]> {
    const em = await eventModel;

    if(startDate > endDate){
      throw new Error("No filtering, the start date is later than the end date.");
    }

    const events = await em.find({
      date: {$gte : startDate, $lte :endDate}
    }).exec();

    return events;
  }

}