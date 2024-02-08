import { Timeslot } from "./timeslot";

export interface Scheduleable {
  id: number;
  //timeslots :Timeslot[]; //private should not be in interface?
  schedule: (newTime: Timeslot)=>Promise<Timeslot[]>; 
  unSchedule: (timeID: number)=>Promise<Timeslot[]>;
}

export class Volunteer implements Scheduleable {
  id: number;
  name: string;
  private timeslots: Timeslot[] = [];
  constructor(name: string){
    this.id = Date.now();
    this.name = name;
  }
  async schedule(newTime: Timeslot){
    if(! this.timeslots.some((t)=> {if(t.start <= newTime.start){
                              return (t.end >= newTime.start);
                            }else{return (t.end >= newTime.end)}})){
      this.timeslots.push(newTime);
    }//TODO something should happen if the volunteer is NOT scheduled... Maybe the model should actually not care for collisions?
    return JSON.parse(JSON.stringify(this.timeslots)); 
  }
  async unSchedule(timeID: number){
    let i = this.timeslots.findIndex(t => t.id === timeID);
    if(i !== -1){
      const removed = this.timeslots.splice(i,1);
      let i2 = removed[0].volunteers.findIndex(v => v.id === this.id);
      removed[0].volunteers.splice(i2,1);
    }
    return JSON.parse(JSON.stringify(this.timeslots)); 
  }
}

export class Event implements Scheduleable{
  id: number;
  name: string;
  start: Date;
  end: Date;
  organizer: string;
  private timeslots: Timeslot[] = [];
  constructor(name: string, start: Date, end: Date, organizer: string){
    this.id = Date.now();
    this.name = name;
    this.start = start;
    this.end = end;
    this.organizer = organizer;
  }
  async schedule(newTime: Timeslot){
    if(! this.timeslots.some((t)=> t.id === newTime.id)){
      this.timeslots.push(newTime);
    }//TODO something should happen if the volunteer is NOT scheduled... Maybe the model should actually not care for collisions?
    return JSON.parse(JSON.stringify(this.timeslots)); 
  }
  async unSchedule(timeID: number){
    let i = this.timeslots.findIndex(t => t.id === timeID);
    if(i !== -1){
      const removed = this.timeslots.splice(i,1);
      removed[0].eventID = -1; //timeslot os no longer connected to an event
      removed[0].volunteers.forEach(v => {
        v.unSchedule(removed[0].id);
      });
    }
    return JSON.parse(JSON.stringify(this.timeslots)); 
  }
}