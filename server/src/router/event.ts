import express, { Request, Response } from "express";
import { EventDBService } from "../service/event.db";
import { SportEvent } from "../model/sportEvent";
import { IEventService } from "../service/event.interface";

const eventService : IEventService = new EventDBService();

export const eventRouter = express.Router();

eventRouter.get("/", async (
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


eventRouter.post("/", async(
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

eventRouter.delete("/", async (
    req : Request,
    res : Response
) => {
    try {
    const id : string = req.body.id;
    
    await eventService.deleteEvent(id);
        
    res.status(200).send();
} catch (e:any) {
    res.status(400).send(e.message);
}
})

eventRouter.put("/", async (
    req : Request,
    res : Response<SportEvent[]>
) => {
    try {
    const startDate : Date = req.body.startDate;
    const endDate : Date = req.body.endDate;
    const events = await eventService.filterEvents(startDate,endDate);

    res.status(200).send(events);

    } catch(e:any) {
        res.status(400).send(e.message);
    }
})
