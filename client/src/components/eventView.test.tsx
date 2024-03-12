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

    render(<EventView />);

    // An event should be rendered after the get request
    const items = await screen.findAllByText("testname");

    expect(items).toHaveLength(1);
})

test("Adding an event will update the event list", async () => {
    // Mock event data
    let events: Event[] = [
        {
            id: "1",
            name: "testname",
            organizer: "testorg",
            date: new Date("2024-03-20"),
        }
    ];

    mockedAxios.get.mockImplementation(() =>
        Promise.resolve({ data: events })
    );

    render(<EventView />);

    // Open the form Modal
    const addEventButton = screen.getByText("Add event ➕");
    await act(async () => {
        fireEvent.click(addEventButton)
    });

    // Test if Modal is visible
    expect(screen.getByText("Add New Event")).toBeInTheDocument();

    const eventNameField = screen.getByLabelText("Event Name");
    fireEvent.change(eventNameField, { target: { value: "testname" } });
  
    const orgNameField = screen.getByLabelText("Organizer");
    fireEvent.change(orgNameField, { target: { value: "testorg" } });
  
    const dateField = screen.getByLabelText("Date");
    fireEvent.change(dateField, { target: { value: "2024-03-20" } });

    // Add new a new event to the mock data
    events.push({
                id: "2",
                name: "testname",
                organizer: "testorg",
                date: new Date("2024-03-20"),
                });

    const submitFormButton = screen.getByText("Ok");
    await act(async () => {
        fireEvent.click(submitFormButton)
    });

    // Test if a post request is sent with the expected data
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/event', { 
                                                                name : "testname",
                                                                organizer : "testorg",
                                                                date : "2024-03-20"
                                                              });

    // Test if the newly added event is rendered
    const items = await screen.findAllByText("testname")

    expect(items).toHaveLength(2);
})