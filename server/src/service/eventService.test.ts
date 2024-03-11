import { IEventService } from "./event.interface";
import { EventDBService } from "./event.db";
import { SportEvent } from "../model/sportEvent";

jest.mock("../db/conn");

let eventService: IEventService;
const volunteerNames :string[] = ["Andreas", "Gustaf", "Razan", "Pia", "Emma", "Lennart"];

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
    
    const createdEvent: SportEvent | undefined = events.find(e => 
        e.name === event.name && 
        e.organizer === event.organizer && 
        e.date.getTime() === event.date.getTime() &&
        e.id === event.id
    );

    // Assert that the created event exists in the list of events
    expect(createdEvent).toBeDefined();
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
    expect(events2.some((e) => e.id===event.id)).toBeFalsy();
})

test("Calling filterEvents should return a list of all events between(and including) startDate and endDate without manipulating the data", async() =>{
    //filter properties
    const start :Date = new Date(2020,3,4); 
    const end :Date = new Date(2020,7,1);
    //5 dates/events in frame
    const datesInFrame :Date[] = [start, end, new Date(2020,5,10), new Date(2020,3,23), new Date(2020,6,12)];
    const eventsInFrame :SportEvent[] =[]; 
    let counter :number = 0;
    await Promise.all(datesInFrame.map(async d => {
        let nString = (counter++).toString();
        let event = await eventService.addEvent("evt" + nString, "org" + nString, d);
        eventsInFrame.push(event);
    }));
    //6 dates out of frame
    const datesOutOfFrame :Date[] = [new Date(2012,3,4), new Date(2020,1,10), new Date(2027,5,10), new Date(2020,7,10), new Date(2020,7,10), new Date(2030,1,19)];
    const eventsOutOfFrame :SportEvent[] =[];
    await Promise.all(datesOutOfFrame.map(async d => {
        let nString = (counter++).toString();
        let event = await eventService.addEvent("evt" + nString, "org" + nString, d);
        eventsOutOfFrame.push(event);
    }));
    const all1 :SportEvent[] = await eventService.getEvents();
    const filtered :SportEvent[] = await eventService.filterEvents(start, end);
    const all2 :SportEvent[] = await eventService.getEvents();

    //the eventlist was not manipulated
    expect(all1).toEqual(all2);
    
    //the filtered list is of reasonable length
    expect(filtered.length).toBeGreaterThanOrEqual(4);
    expect(all1.length - filtered.length).toBeGreaterThanOrEqual(6);

    // Check that the filtered list contains all the right events and not the others
    eventsInFrame.forEach(expectedEvent => {
        const foundEvent = filtered.find(event =>
            event.name === expectedEvent.name &&
            event.organizer === expectedEvent.organizer &&
            event.date.getTime() === expectedEvent.date.getTime()
        );
        expect(foundEvent).toBeDefined();
    });

    eventsOutOfFrame.forEach(unexpectedEvent => {
        const foundEvent = filtered.find(event =>
            event.name === unexpectedEvent.name &&
            event.organizer === unexpectedEvent.organizer &&
            event.date.getTime() === unexpectedEvent.date.getTime()
        );
        expect(foundEvent).toBeUndefined();
    });

   // eventsInFrame.map(e => expect(filtered).toContain(e));
   // eventsOutOfFrame.map(e => expect(filtered).not.toContain(e));
})

test("Calling filterEvents should throw an error if startDate is after endDate", async() =>{
    //filter properties in the wrong order
    const start :Date = new Date(2020,7,1);
    const end :Date = new Date(2000,3,4); 

    try {
        await eventService.filterEvents(start, end);
        // Fail the test if the above line doesn't throw an error
        fail("Expected filterEvent to throw an error but it didn't.");
    } catch (error : any) {
        // Verify that the error is as expected
        expect(error.message).toEqual("No filtering, the start date is later than the end date.");
    }
})

test("When an event is created, it's list of volunteers is empty", async() =>{
    const name = "SomeSport";
    const organizer = "SomeOrganizer";
    const date = new Date("2025-04-11");

    const event :SportEvent = await eventService.addEvent(name, organizer, date);
    const volunteerlist :string[] = await eventService.getVolunteers(event.id);
    expect(volunteerlist).toHaveLength(0);
})

test("Adding a new volunteer to an event should add that name to the list of volunteers in that event", async() =>{
    const name = "Hockey";
    const organizer = "Local hockey club";
    const date = new Date("2025-04-11");

    const event :SportEvent = await eventService.addEvent(name, organizer, date);
    await Promise.all(volunteerNames.map(async(n) => {await eventService.addVolunteer(event.id,n);}));
    const volunteerlist:string[] = await eventService.getVolunteers(event.id);

    expect(volunteerlist).toHaveLength(volunteerNames.length);
    volunteerNames.map(n => expect(volunteerlist).toContain(n));
})

test("Adding a volunteer to an event twice should only add the name to the list once", async() =>{
    const name = "Horse racing";
    const organizer = "Local jockey club";
    const date = new Date("2028-01-11");
    const userName = "Lasse";

    const event :SportEvent = await eventService.addEvent(name, organizer, date);
    await eventService.addVolunteer(event.id,userName);
    const volunteerlist1:string[] = await eventService.getVolunteers(event.id);
    await eventService.addVolunteer(event.id,userName);
    const volunteerlist2:string[] = await eventService.getVolunteers(event.id);

    expect(volunteerlist1).toEqual(volunteerlist2);
})

test("Removing volunteer from an event should remove that name from the list of volunteers in that event", async() =>{
    const name = "Orientation";
    const organizer = "Maps r us";
    const date = new Date("2020-12-21");
    const userName = "Lotta";

    const event :SportEvent = await eventService.addEvent(name, organizer, date);
    await eventService.addVolunteer(event.id,userName);
    await eventService.removeVolunteer(event.id,userName);
    const volunteerlist:string[] = await eventService.getVolunteers(event.id);

    expect(volunteerlist).toHaveLength(0);
})

test("Trying to remove a volunteer that is not in an events list should do nothing", async() =>{
    const name = "Boring event noone wants";
    const organizer = "No fun foundation";
    const date = new Date("2023-10-27");
    const userName = "EgonIsNotInTheList";

    const event :SportEvent = await eventService.addEvent(name, organizer, date);
    await Promise.all(volunteerNames.map(async(n) => {await eventService.addVolunteer(event.id,n);}));
    const volunteerlist1:string[] = await eventService.getVolunteers(event.id);
    await eventService.removeVolunteer(event.id,userName);
    const volunteerlist2:string[] = await eventService.getVolunteers(event.id);

    expect(volunteerlist1).toEqual(volunteerlist2);
})
