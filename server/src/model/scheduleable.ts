import { Timeslot } from "./timeslot";

export interface Scheduleable {
  id : number;
  //timeslots :Timeslot[]; //private should not be in interface?
  schedule :(newTime :Timeslot)=>Promise<Timeslot[]>; 
  unSchedule :(timeID :number)=>Promise<Timeslot[]>;
}

export class Volunteer implements Scheduleable {
  id : number = Date.now();
  name : string;
  private timeslots : Timeslot[] = [];
  constructor(name :string){
    this.name = name;
  }
  async schedule(newTime :Timeslot){
    if(! this.timeslots.some((t)=> {if(t.start <= newTime.start){
                              return (t.end >= newTime.start);
                            }else{return (t.end >= newTime.end)}})){
      this.timeslots.push(newTime);
    }//TODO something should happen if the volunteer is NOT scheduled... Maybe the model should actually not care for collisions?
    return JSON.parse(JSON.stringify(this.timeslots)); 
  }
  async unSchedule(timeID :number){
    let i = this.timeslots.findIndex(t => t.id === timeID);
    if(i !== -1){
      const removed = this.timeslots.splice(i,1);
      let i2 = removed[0].volunteerIDs.findIndex(v => v === this.id);
      removed[0].volunteerIDs.splice(i2,1);
    }
    return JSON.parse(JSON.stringify(this.timeslots)); 
  }


}