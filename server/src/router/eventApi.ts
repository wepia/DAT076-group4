import express, { Request, Response } from "express";
import { EventService } from "../service/archived/eventService";
import { SportEvent } from "../model/archived/sportEvent";

const eventService = new EventService();

export const eventApi = express.Router();

eventApi.get("/getevents", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<SportEvent> | String>
) => {
    try {
        const events = await eventService.getEvents();
        res.status(200).send(events);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


eventApi.post("/", async(
    req : Request,
    res : Response<SportEvent | string>
) => {
    try {
        const name : string = req.body.name;
        const organizer : string = req.body.organizer;
        const date : string = req.body.date;

        await eventService.addEvent(name,organizer,date);

        res.status(200).send();

    } catch (e: any) {
        res.status(500).send(e.message);        
    }
})

eventApi.delete("/", async (
    req : Request,
    res : Response
) => {
    try {
    const id : number = req.body.id;
    
    let deletedEvent = await eventService.deleteEvent(id);
        
    res.status(200);
} catch (e:any) {
    res.status(500).send(e.message);
}
})
