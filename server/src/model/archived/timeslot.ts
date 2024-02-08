import { Volunteer } from "./scheduleable";

export interface Timeslot {
  id: number;
  start: Date;
  end: Date;
  eventID: number;
  volunteers: Volunteer[];
  reqNoVolunteers: number;
}