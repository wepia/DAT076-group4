import { Connection, createConnection } from "mongoose";

export async function makeConnection() : Promise<Connection> {
   return createConnection("mongodb+srv://andze:Zetterqvist5110@cluster0.ocm2oft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");   
} 

export const conn : Promise<Connection> = makeConnection();