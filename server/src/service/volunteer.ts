import { Volunteer, Shift } from "../model/volunteer";

export class VolunteerService {
  private volunteers: Volunteer[] = [];
  
  private async accessVolunteer(volunteerID : number):Promise<Volunteer>{
    let volIndex : number = this.volunteers.findIndex(v => v.id === volunteerID);
    if(volIndex === -1){
      throw new Error("Requested volunteerID does not exist.");
    }
    return this.volunteers[volIndex];
  }
  private shiftIndex(volunteer:Volunteer, shift:Shift):Promise<number> {

  }


  async getVolunteers(): Promise<Volunteer[]>{
    return JSON.parse(JSON.stringify(this.volunteers));
  }

  async registerVolunteer(name : string): Promise<Volunteer>{
    if(this.volunteers.some((v)=> v.name === name)){ //check so the name is unique, may not be the way to do it later, but for now
      throw new Error("Name is already taken!");
    }

    let newVol : Volunteer = {
      id: Date.now(),
      name: name,
      shifts: []
    }

    this.volunteers.push(newVol);
    
    return JSON.parse(JSON.stringify(newVol));
  }

  async scheduleShift(volunteerID: number, eventID: number, shiftID: number){
    let volunteer = this.accessVolunteer(volunteerID);
    let newShift : Shift = {
      eventID: eventID,
      shiftID: shiftID
    };
    if()
    (await volunteer).shifts.push(newShift);
    return JSON.parse(JSON.stringify(volunteer));
  }

  async unscheduleShift(volunteerID: number, eventID: number, shiftID: number){

  }
}





/*
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
*/