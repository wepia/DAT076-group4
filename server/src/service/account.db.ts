import { Account } from "../model/account";
import { IAccountService } from "./account.interface";
import { accountModel } from "../db/account.db";
import { Model } from "mongoose";

export class AccountDBService implements IAccountService {
  async addEvent(userName: string, eventID: string): Promise<void> {
    try {
      const am: Model<Account> = await accountModel;
      const user = await am.findOne({ userName: userName });
      if (!user) {
        throw new Error("User not found");
      }
  
      const updatedUser = await am.findByIdAndUpdate(
        user._id,
        { $addToSet: { eventIDs: eventID } },
        { new: true, safe: true }
      );
  
      if (!updatedUser) {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error adding event ID:", error);
    }
  }
  
  async removeEvent(userName: string, eventID: string): Promise<void> {
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
  }

  async getAccountEvents(userName: string): Promise<string[]> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName });

    if (user === null) {
      throw "No user with username " + userName;
    }
    return user.eventIDs;    
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

    user.email = newEmail;
    await user.save();

    return true;
  }

  async accessAccount(userName: string, password: string): Promise<Account> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName, password: password });

    if (user === null) {
      throw new Error("Password don't match with the username");
    }

    //user.email = userName; //Guessing this is not supposed to be here?
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

    // Check if an account with the same userName already exists
    const existingAccount = am.findOne({ userName });
    if (await existingAccount) {
        throw new Error("An account with the same userName already exists");
    }

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
