import { Account } from "../model/account";
import { IAccountService } from "./account.interface";
import { accountModel } from "../db/account.db";
import { Model } from "mongoose";
import { SportEvent } from "../model/sportEvent";
import { eventModel } from "../db/event.db";

export class AccountDBService implements IAccountService {
  async addEvent(userName: string, eventID: number): Promise<boolean> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName });

    if (user === null) {
      return false;
    }

    const index = user.eventIDs.indexOf(eventID);
    if (index !== -1) {
      user.eventIDs.splice(index, 1);
    }

    // Save the updated user object back to the database
    await user.save();

    return true;
  }
  async removeEvent(userName: string, eventID: number): Promise<boolean> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName });

    if (user === null) {
      throw new Error("No user with username " + userName);
    }
    const index = user.eventIDs.indexOf(eventID);
    if (index !== -1) {
      user.eventIDs.splice(index, 1);
    }
    await user.save();

    return true;
  }
  async getAccountEvents(userName: string): Promise<number[]> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName });

    if (user === null) {
      throw "No user with username " + userName;
    }
    const events = await eventModel.find({ id: { $in: user.eventIDs } });    
  }
  async changeEmail(
    userName: string,
    password: string,
    newEmail: string
  ): Promise<boolean> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName, password: password });

    if (user === null) {
      return false;
    }

    user.email = userName;
    return true;
  }
  async accessAccount(userName: string, password: string): Promise<Account> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName, password: password });

    if (user === null) {
      throw "Password don't match with the username";
    }

    user.email = userName;
    return user;
  }

  async registerAccounts(
    userName: string,
    password: string,
    email: string,
    gender: string,
    birth: Date
  ): Promise<Account> {
    const am: Model<Account> = await accountModel;
    return await am.create({
      userName: userName,
      password: password,
      email: email,
      gender: gender,
      birth: birth,
      eventIDs: [],
    });
  }

  async findAccount(username: string, password: string): Promise<boolean> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: username });
    if (user?.password === password) {
      return true;
    } else {
      return false;
    }
  }
}
