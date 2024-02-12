import express, { Request, Response } from "express";
import { EventService } from "../service/event";
import { Event } from "../model/event";

const eventService = new EventService();

export const eventApi = express.Router();

eventApi.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Event[]>
) => {
    try {
        const events = await eventService.getEvents();
        res.status(201).send(events);
    } catch (e: any) {
        res.status(400).send(e.message);
    }
});


eventApi.post("/", async(
    req : Request,
    res : Response<Event[]>
) => {
    try {
        const name : string = req.body.name;
        const organizer : string = req.body.organizer;
        const date : Date = req.body.date;

        const events = await eventService.addEvent(name,organizer,date);

        res.status(201).send(events);
    } catch (e: any) {
        res.status(400).send(e.message);        
    }
})

eventApi.delete("/", async (
    req : Request,
    res : Response<Event[]>
) => {
    try {
        const id : number = req.body.id;
        
        const events : Event[] = await eventService.deleteEvent(id);
            
        res.status(201).send(events);
    } catch (e:any) {
        res.status(400).send(e.message);
    }   
})

eventApi.post("/shift", async (
    req : Request, 
    res : Response<Event | string >
) => {
    try {
        const eventID: number = req.body.eventID; 
        const description: string = req.body.description;
        const start: Date = req.body.start;
        const end: Date = req.body.end;
        const requiredVolunteers: number = req.body.requiredVolunteers;
        
        const updatedEvent : Event = await eventService.scheduleShift(eventID, description, start, end, requiredVolunteers);
        res.status(200).send(updatedEvent);
    } catch(e : any){
        res.status(500).send(e.message);
    }
})

eventApi.delete("/shift", async (
    req : Request, 
    res : Response<Event | string >
) => {
    try {
        const eventID: number = req.body.eventID; 
        const shiftID: number = req.body.shiftID;

        const updatedEvent = await eventService.unscheduleShift(eventID, shiftID);
        res.status(200).send(updatedEvent);
    } catch(e : any){
        res.status(500).send(e.message);
    }
})

//TODO put (schedule/unschedule) volonteer(account) 