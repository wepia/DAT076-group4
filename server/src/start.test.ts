import * as SuperTest from "supertest";
import express, { Router, Request, Response } from "express";
import {app} from "./start";
import {Account} from "./model/account";
var session = require('supertest-session');

var testSession: { post: (arg0: string) => { (): any; new(): any; send: { (arg0: { username: string; password: string; }): any; new(): any; }; }; get: (arg0: string) => any; };

beforeEach(function () {
  testSession = session(app);
});

jest.mock("./db/conn");
const request = SuperTest.default(app);

const testuserName: string = "testname";
const testemail: string = "test@e.mail";
const testpassword: string = "testPassword";
const testgender: string = "testGender";
const testbirth: Date = new Date("1970-01-20");

beforeAll(async () => {
    //Register a test account
    await request.post("/account").send({userName : testuserName, password : testpassword, email : testemail, gender : testgender, birth : testbirth});
    //Create a test event

});

test("create account", async() =>{
    const testuserName2: string = "testname2";
    const testemail2: string = "test@e2.mail";
    const testpassword2: string = "testPassword2";
    const testgender2: string = "testGender2";
    const testbirth2: Date = new Date("2000-04-23");

    const res1 = await request.post("/account").send({userName : testuserName2, password : testpassword2, email : testemail2, gender : testgender2, birth : testbirth2});

    expect(res1.statusCode).toEqual(200);
    expect(res1.text).toEqual("ok");

    //Register same username
    const res2 = await request.post("/account").send({userName : testuserName2, password : testpassword2, email : testemail2, gender : testgender2, birth : testbirth2});
    expect(res2.statusCode).toEqual(500);
})

test("login/out account", async()=>{
    //login with wrong username or password
    const res2 = await request.post("/account/login").send({username : "notausername", password : testpassword});
    const res3 = await request.post("/account/login").send({username : testuserName, password : "wrongpassword"});
    expect(res2.statusCode).toEqual(401);
    expect(res3.statusCode).toEqual(401);
    expect(res2.text).toEqual("Username or password is incorrect");
    expect(res3.text).toEqual("Username or password is incorrect");

    //login with correct username and password
    const res4 = await request.post("/account/login").send({username : testuserName, password : testpassword});
    expect(res4.statusCode).toEqual(200);
    expect(res4.text).toEqual("Login success");

    //logout
    const res7 = await request.post("/account/logout");
    expect(res7.statusCode).toEqual(200);
    expect(res7.text).toEqual("successfull logout");
})

test("Session access functions", async()=>{
    await testSession.post("/account/login").send({username : testuserName, password : testpassword});
    
    //Get account information
    const res5 = await testSession.get("/account/account");
    expect(res5.statusCode).toEqual(200);
    expect(res5.body.userName).toEqual(testuserName);
    expect(res5.body.email).toEqual(testemail);
    expect(res5.body.gender).toEqual(testgender);
    expect(new Date(res5.body.birth)).toEqual(testbirth);

    //Get eventlist (should be empty)
    const res6 = await testSession.get("/account");
    expect(res6.statusCode).toEqual(200);
    expect(res6.body).toEqual([]);

    testSession.post("/account/logout");

    //Try to access functions logged out
    const res8 = await testSession.get("/account/account");
    expect(res8.statusCode).toEqual(401);
    const res9 = await testSession.get("/account");
    expect(res9.statusCode).toEqual(401);
});
