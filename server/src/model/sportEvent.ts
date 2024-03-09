import { Account } from "./account";

export interface SportEvent {
    id: string;
    name: string;
    organizer: string;
    date: Date;
    volunteers: [Account];
    owner: string;
}