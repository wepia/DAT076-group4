import React from "react";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import axios, { AxiosStatic } from "axios";
import EventView from "./eventView";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

export interface Event {
    id: string;
    name: string;
    organizer: string;
    date: Date;
}

test("Fetches an event from the API and displays it", async () => {
    // Mock event data
    
    const events: Event[] = [
        {
            id: "1",
            name: "testname",
            organizer: "testorg",
            date: new Date("2024-03-20"),
        }
    ];

    mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: events})
    );
    render(<EventView page={"home"} receiver={"event"} />);     
    
    // An event should be rendered after the get request
    const items = await screen.findAllByText("testname");

    expect(items).toHaveLength(1);
})



