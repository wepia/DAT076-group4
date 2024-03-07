import {Schema, Model} from "mongoose";
import {SportEvent} from "../model/sportEvent";
import { conn } from "./conn";

const eventSchema : Schema = new Schema({
 id : {
 type : String,
 required : true,
 unique: true
 },

 name : {
 type : String,
 required : true
 },
 
 organizer : {
  type : String,
  required : true
  },

 date : {
 type : Date,
 required : true
 },

 volunteers : {
  type : [String],
  required : true
 }
})


async function makeModel() : Promise<Model<SportEvent>> {
  return (await conn).model<SportEvent>("Events", eventSchema);
}

export const eventModel : Promise<Model<SportEvent>> = makeModel();
