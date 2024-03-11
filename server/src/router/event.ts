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
        if(req.session.user === undefined) {
            return res.status(401);
        }
        const name : string = req.body.name;
        const organizer : string = req.body.organizer;
        const date : Date = req.body.date;

        const event = await eventService.addEvent(name,organizer,date, req.session.user);

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

    if(req.session.user === undefined) {
        return res.status(401).send("Not logged in");
    }
    const id : string = req.body.id;
    
    await eventService.deleteEvent(id, req.session.user);
        
    res.status(200).send();
} catch (e:any) {

    if(e.message === 'Not the owner of the event'){
        res.status(401).send("You must be the owner of the event to delete it")
    } else {

    res.status(400).send(e.message);
    }
}
});

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

export async function schedule(user:string, eventID:string): Promise<void> {
    try {
        console.log("shedule in eventRouter");
        await eventService.addVolunteer(eventID, user);
      } catch (e:any) {
        console.log("Error in event-schedule: " + e.message);
        throw e;
      }
}

export async function unschedule(user:string, eventID:string): Promise<void> {
    try {
        console.log("unshedule in eventRouter");
        await eventService.removeVolunteer(eventID, user);
      } catch (e:any) {
        console.log("Error in event-unschedule: " + e.message);
        throw e;
      }
}

/*
eventRouter.put("/schedule", async ( 
    req: Request,
    res: Response
) => {
    try {
        console.log("just entered the router");
        if (req.session.user === undefined) {
            console.log("user is undefined")
            res.status(401).send("Need to be logged in");
        } else {

            const eventID : string = req.body.id;
            console.log(`eventID in router for adding a volunteer: ${eventID}`)
            await eventService.addVolunteer(eventID, req.session.user);
        }
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})

eventRouter.delete("/schedule", async (
    req : Request,
    res: Response
) => {
    try {
    if(req.session.user === undefined) {
        res.status(401).send("You need to be logged in");
    } else {

    const eventID : string = req.body.id;
    console.log("eventID: " + eventID)
    await eventService.removeVolunteer(eventID, req.session.user);
    }
} catch(e:any){
    res.status(500).send(e.message);
}
})
*/