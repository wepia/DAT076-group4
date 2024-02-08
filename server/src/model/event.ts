export interface Event {
  id: number;
  name: string;
  start: Date;
  end: Date;
  organizer: string;
  shifts: Shift[];
}

export interface Shift {
  id: number;
  start: Date;
  end: Date;
  volunteerIDs: number[];
  reqNoVolunteers: number;
}