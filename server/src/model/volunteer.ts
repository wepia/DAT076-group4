export interface Volunteer {
  id: number;
  name: string;
  shifts: Shift[];
  /* Attributes from Account class to include later?:
    userName : string;
    email : string;
    password : string;
    gender : string;
    birth : string;

    other potential useful attributes:
    availableTime[]
  */
}

export interface Shift {
  eventID: number;
  shiftID: number;
}

//maybe make an "organizer interface" extending volunteer?