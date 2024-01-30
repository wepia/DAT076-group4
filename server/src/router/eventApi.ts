import express, { Request, Response } from "express";
import { EventService } from "../service/eventService";
import { SportEvent } from "../model/sportEvent";

const eventService = new EventService();

export const eventApi = express.Router();

eventApi.get("/getevent", async (
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

