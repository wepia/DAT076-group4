import { IAccountService } from "./account.interface";
import { AccountDBService } from "./account.db";
import { Account } from "../model/account";
import * as SuperTest from "supertest";
import { Response } from "supertest";
import { ObjectId } from "mongodb";

jest.mock("../db/conn");

//test-account-settings
const testuserName : string = "testname";
const testpassword : string = "testpassword";
const testemail : string = "test@mail.mock";
const testgender : string = "testgender";
const testbirth : Date = new Date('2013-06-08');

let accountService: IAccountService;

// Use beforeAll hook to create the account before running all tests
beforeAll(async () => {
    accountService = new AccountDBService();
    await accountService.registerAccounts(testuserName, testpassword, testemail, testgender, testbirth);
});

//tests
test("If an account is created, it should only be possible to access it using username and password", async() =>{
    const account : Account = await accountService.accessAccount(testuserName, testpassword);
    expect(account.userName).toEqual(testuserName);
    expect(account.password).toEqual(testpassword);
    expect(account.email).toEqual(testemail);
    expect(account.gender).toEqual(testgender);
    expect(account.birth).toEqual(testbirth);
    try {
        await accountService.accessAccount(testuserName, "wrongPassword");
        // Fail the test if the above line doesn't throw an error
        fail("Expected accessAccount to throw an error but it didn't.");
    } catch (error : any) {
        // Verify that the error is as expected
        expect(error.message).toEqual("Password don't match with the username");
    }

})

test("It should be possible to change email of an account using the correct username and password", async() =>{
    const newemail : string = "new@mail.mock";

    expect(await accountService.changeEmail(testuserName, "wrongPassword", newemail)).toBeFalsy();
    const noChange : Account = await accountService.accessAccount(testuserName, testpassword);
    expect(noChange.email).toEqual(testemail);
    expect(await accountService.changeEmail(testuserName, testpassword, newemail)).toBeTruthy();
    const changed : Account = await accountService.accessAccount(testuserName, testpassword);
    expect(changed.email).toEqual(newemail);
})

test("An event should only be possible to add to the account's event-list once", async() =>{
    const eventID : string = new ObjectId().toString();

    const events1 : string[] = await accountService.getAccountEvents(testuserName);
    await accountService.addEvent(testuserName, eventID);
    const events2 : string[] = await accountService.getAccountEvents(testuserName);
    expect(events1.length + 1).toEqual(events2.length);
    await accountService.addEvent(testuserName, eventID);
    const events3 : string[] = await accountService.getAccountEvents(testuserName);
    expect(events2.length).toEqual(events3.length);
})

test("An eventID should be possible to removed if it is in the list", async() =>{
    const eventID : string = new ObjectId().toString();

    await accountService.addEvent(testuserName, eventID);
    const events1 : string[] = await accountService.getAccountEvents(testuserName);
    await accountService.removeEvent(testuserName, eventID);
    const events2 : string[] = await accountService.getAccountEvents(testuserName);
    accountService.removeEvent(testuserName, eventID);
    const events3 : string[] = await accountService.getAccountEvents(testuserName);
    expect(events2.length).toEqual(events3.length);
    expect(events1.length).toEqual(events2.length +1);
})

test("If an eventID is added to an account, it should appear in the eventID-list", async() =>{
    const eventID : string = new ObjectId().toString();

    const events1 : string[] = await accountService.getAccountEvents(testuserName);
    await accountService.addEvent(testuserName, eventID);
    const events2 : string[] = await accountService.getAccountEvents(testuserName);
    expect(events2).toContain(eventID);
    expect(events1.length + 1).toEqual(events2.length);
})
