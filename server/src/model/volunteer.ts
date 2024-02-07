import { Timeslot } from "./timeslot";

export class Volunteer {
  id : number;
  name : string;
  timeslots : Timeslot[] = []

  constructor(name :string){
    this.id = Date.now();
    this.name = name;
  }
}