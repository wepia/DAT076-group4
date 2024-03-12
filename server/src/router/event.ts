import express, { Request, Response } from "express";
import { EventDBService } from "../service/event.db";
import { SportEvent } from "../model/sportEvent";
import { IEventService } from "../service/event.interface";

const eventService : IEventService = new EventDBService();

export const eventRouter = express.Router();

// Returns a response with status 200 and the
// body is all the registered events.
// If an error occur in the server, 
// it will send a response with status 500.
eventRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<SportEvent[]>
) => {
    try {
        const events = await eventService.getEvents();
        res.status(201).send(events);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// Registers a new event.
// If successfull, returns status code 200 and the
// body is hte newly registered event.
// If the user is not logged in it send back a status code 401.
// At internal server error, send back a response with code 500.
eventRouter.post("/", async(
    req : Request,
    res : Response<SportEvent | string>
) => {
    try {
        if(req.session.user === undefined) {
            return res.status(401).send("need to be logged in");
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

// Deletes the event with the specified id.
// At success, sends back a response with status code 200
// and body "ok".
// If user is not logged in, it will send back a 
// response with status code 401 and the body will be "Not logged in"
// Response with status 401 will also be sent if the suer is not the owner of the 
// event that are to be deleted.
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
        
    res.status(200).send("Ok");
} catch (e:any) {

    if(e.message === 'Not the owner of the event'){
        res.status(401).send("You must be the owner of the event to delete it")
    } else {

    res.status(400).send(e.message);
    }
}
});

// Filters all the registered events that are
// within the given date interval.
// At success, sends a response with status 200
// and body will be all the filtered events.
// Errors from the server will result in a 
// response with status 500 and body will be 
// the error message.
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
        res.status(500).send(e.message);
    }
})
