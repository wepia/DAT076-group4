export interface Event {
    id: number;
    name: string;
    //TODO change to type Date (including time) and "start", "end" instead of just "date"
    date: string;
    organizer: string;
    shifts: Shift[];
}
  
export interface Shift {
    id: number;
    start: Date;
    end: Date;
    volunteerIDs: number[]; //id's of the scheduled user accounts
    reqNoVolunteers: number;
}

/*
export class Event {
    public id: number;
    public name: string = "";
    public organizer: string = "";
    public date: string = "";

    constructor(name: string, organizer: string, date: string) {
        this.id = Date.now()
        this.name = name;
        this.organizer = organizer;
        this.date = date;
    }
}
*/