import { EventService } from "./event";

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

    expect(events.some((event) => event.name === name && event.organizer === organizer && new Date(event.date).getTime() === date.getTime())).toBeTruthy();

    await eventService.deleteEvent(events[events.length-1].id)

    events = await eventService.getEvents();

    expect(events.some((event) => event.name === name && event.organizer === organizer && new Date(event.date).getTime() === date.getTime())).toBeFalsy();

})

test("It should be possible to add and remove workshifts from an existing event without changing the event list length", async() => {
    const eventService : EventService = new EventService();
    await eventService.addEvent('Marathon', 'City Sports Club', new Date('2024-04-21'));
    await eventService.addEvent('Triathlon', 'National Sports Organization', new Date('2024-06-15'));
    //await eventService.addEvent('Cycling Race', 'Cyclists Federation', new Date('2024-07-03'));
    //await eventService.addEvent("Football", "Local football club", new Date("2024-03-10"));
    let events = await eventService.getEvents();
    const e0 :number = events[0].id;
    const e1 :number = events[1].id;
    const e0s0 :number = events[0].shifts.length;
    const e1s0 :number = events[1].shifts.length;
    const noEvents = events.length;
    const desc :string = "shift 1";
    const start :Date = new Date('2024-07-03T15:00');
    const end :Date = new Date('2024-07-03T15:30');
    const noVolunteers :number = 4;

    await eventService.scheduleShift(e0, desc, start, end, noVolunteers);
    await eventService.scheduleShift(e0, "shift 2", new Date('2024-07-03T15:00'), new Date('2024-07-03T17:30'), 5);
    events = await eventService.getEvents();
    let e0i :number = events.findIndex(e => (e.id === e0));
    let e1i :number = events.findIndex(e => (e.id === e1));
    let shifts = events[e0i].shifts;
    const e0s1 :number = shifts.length;
    const e1s1 :number = events[e1i].shifts.length;
    expect(shifts.some((s) => s.description === desc && new Date(s.start).getTime() === start.getTime() && new Date(s.end).getTime() === end.getTime())).toBeTruthy();
    expect(e0s0 === (e0s1-2)).toBeTruthy();
    expect(e1s0 === e1s1).toBeTruthy();
    expect(events.length === noEvents).toBeTruthy();
    
    const shift1 = shifts[shifts.findIndex(s => s.description === desc)].id;
    await eventService.unscheduleShift(e0, shift1);
    await eventService.unscheduleShift(e0, shift1);
    events = await eventService.getEvents();
    e0i = events.findIndex(e => (e.id === e0));
    e1i = events.findIndex(e => (e.id === e1));
    shifts = events[e0i].shifts;
    const e0s2 = shifts.length;
    const e1s2 = events[e1i].shifts.length;
    expect(shifts.some((s) => s.description === desc && new Date(s.start).getTime() === start.getTime() && new Date(s.end).getTime() === end.getTime())).toBeFalsy();
    expect(e0s0 === (e0s2-1) && e1s0 === e1s2 && events.length === noEvents).toBeTruthy();
})
