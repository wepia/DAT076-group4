import express, { Request, Response } from "express";
import { EventDBService } from "../service/evendDBservice";
import { SportEvent } from "../model/sportEvent";
import { IEventService } from "../model/event.interface";

const eventService : IEventService = new EventDBService();

export const eventApi = express.Router();

eventApi.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<SportEvent[]>
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
    res : Response<SportEvent>
) => {
    try {
        const name : string = req.body.name;
        const organizer : string = req.body.organizer;
        const date : Date = req.body.date;

        const event = await eventService.addEvent(name,organizer,date);

        res.status(201).send(event);
    } catch (e: any) {
        res.status(400).send(e.message);        
    }
})

eventApi.delete("/", async (
    req : Request,
    res : Response<SportEvent[]>
) => {
    try {
    const id : number = req.body.id;
    
    const events = await eventService.deleteEvent(id);
        
    res.status(200).send(events);
} catch (e:any) {
    res.status(400).send(e.message);
}
})
