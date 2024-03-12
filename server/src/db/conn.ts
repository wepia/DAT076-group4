import { Connection, createConnection } from "mongoose";
import * as fs from 'fs'

export async function makeConnection() : Promise<Connection> {
   const password = fs.readFileSync('./src/db/password.txt', 'utf-8')
   return createConnection("mongodb+srv://andze:"+password+"@cluster0.ocm2oft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");   
} 

export const conn : Promise<Connection> = makeConnection();