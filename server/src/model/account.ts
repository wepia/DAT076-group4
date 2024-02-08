export interface Account{
    id : number;
    userName : string;
    email : string;
    password : string;
    gender : string;
    birth : string;
    shifts: Shift[];
    /* Potential useful attributes to add later:
        availableTime[]
        events[] (events the user is organizing)
     */
}

export interface Shift {
    eventID: number;
    shiftID: number;
}

//possibly add an extended "organizer account"?