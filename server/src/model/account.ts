import {SportEvent} from './sportEvent'

export interface Account{
    userName : string;
    email : string;
    password : string;
    gender : string;
    birth : Date;
    events : [SportEvent]
}