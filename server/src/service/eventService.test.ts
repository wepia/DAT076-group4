import { IEventService } from "./event.interface";
import { EventDBService } from "./event.db";
import { SportEvent } from "../model/sportEvent";

jest.mock("../db/conn");

let eventService: IEventService;

beforeAll(async () => {
    eventService = new EventDBService();
    //await accountService.registerAccounts(testuserName, testpassword, testemail, testgender, testbirth);
});

test("If an event is created, then it should be added to the list of all events", async() => {
    const name = "Football";
    const organizer = "Local football club";
    const date = new Date("2024-03-10");

    const event :SportEvent = await eventService.addEvent(name, organizer, date);
    expect(new Date(event.date)).toEqual(date);
    expect(event.name).toEqual(name);
    expect(event.organizer).toEqual(organizer);
    const events :SportEvent[] = await eventService.getEvents();
    expect(events).toContain(event);
})

test("If an event is deleted, then it should be deleted from the list of all events", async() => {
    const name = "Swimming";
    const organizer = "Swimmers United";
    const date = new Date("2025-05-13");

    const event :SportEvent = await eventService.addEvent(name, organizer, date);
    const events1 = await eventService.getEvents();
    await eventService.deleteEvent(event.id);
    const events2 = await eventService.getEvents();
    expect(events1.length).toEqual(events2.length +1);
    expect(events2.some((event) => event.name === name && event.organizer === organizer && event.date === date)).toBeFalsy();

})