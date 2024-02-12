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
        
        const events = await eventService.deleteEvent(id);
            
        res.status(201).send(events);
    } catch (e:any) {
        res.status(400).send(e.message);
    }   
})
