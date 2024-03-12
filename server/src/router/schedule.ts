import express, { Router, Request, Response } from "express";
import { EventDBService } from "../service/event.db";
import { SportEvent } from "../model/sportEvent";
import { Account } from "../model/account";
import { AccountDBService } from "../service/account.db";
import { IAccountService } from "../service/account.interface";
import { IEventService } from "../service/event.interface";

const accountService: IAccountService = new AccountDBService();
const eventService : IEventService = new EventDBService();


export const scheduleRouter: Router = express.Router();

// Adds a user to the SportEvents list of volunteers
// and adds the SportEvent to the Accounts list of events.
// At success it sends a response with status 200 and
// body "ok"
// sends back a response with status 401 and with body
// "Need to be logged in" if the user is not logged in.
scheduleRouter.put("/", async(
    req : Request,
    res : Response
) =>{

    try{
        if (!req.session.user) {
            res.status(401).send("Need to be logged in");
        } else {
            const user  = req.session.user;
            const eventID : string = req.body.data.id;

            await eventService.addVolunteer(eventID, user);
            await accountService.addEvent(user, eventID)

            res.status(200).send("ok");
        } 
        
    }catch (e:any) {
        res.status(500).send(e.message);
    }
})

// Removes the Account from the SportEvents field "volunteers"
// and removes the SportEvent from the Accounts field "events".
// At success it will send a response with status 401 and
// body "ok"
// if the user is not logged in, a response with status
// 401 and body "Need to be logged in" will be sent.
scheduleRouter.delete("/", async(
    req : Request,
    res : Response,
) => {
    try {

        if(req.session.user === undefined) {
            res.status(401).send("Need to be logged in");
        } else {

            const user = req.session.user;

            const eventID : string = req.body.id;

            await eventService.removeVolunteer(eventID,user);
            await accountService.removeEvent(user, eventID);

            res.status(200).send("ok");
        }
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})

