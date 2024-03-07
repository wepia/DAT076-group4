import { IEventService } from "./event.interface";
import { EventDBService } from "./event.db";
import { SportEvent } from "../model/sportEvent";

jest.mock("../db/conn");

/*
test("If an event is created, then it should be added to the list of all events", async() => {
    const name = "Football";
    const organizer = "Local football club";
    const date = new Date("2024-03-10");

    const eventService : EventService = new EventService();

    await eventService.addEvent(name, organizer, date);

    const events = await eventService.getEvents();

    expect(events.some((event) => event.name === name && event.organizer === organizer && new Date(event.date).getTime() === date.getTime())).toBeTruthy();

})

test("If an event is deleted, then it should be deleted from the list of all events", async() => {
    const name = "Football";
    const organizer = "Local football club";
    const date = new Date("2024-03-10");

    const eventService : EventService = new EventService();

    await eventService.addEvent(name, organizer, date);

    let events = await eventService.getEvents();

    await eventService.deleteEvent(events[events.length-1].id)

    events = await eventService.getEvents();

    expect(events.some((event) => event.name === name && event.organizer === organizer && event.date === date)).toBeFalsy();

})
*/