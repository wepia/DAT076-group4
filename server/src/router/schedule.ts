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

