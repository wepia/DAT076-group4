export interface Event {
    id: number;
    name: string;
    //TODO change to "start", "end" instead of just "date"
    date: Date;
    organizer: string;
    shifts: Shift[];
}
  
export interface Shift {
    id: number;
    start: Date;
    end: Date;
    assignedVolunteers: number; //number of scheduled user accounts
    requiredVolunteers: number;
}
