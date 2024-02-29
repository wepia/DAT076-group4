import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { CloseButton, ListGroup } from "react-bootstrap";

interface Event {
  id: number;
  name: string;
  organizer: string;
  date: Date;
}

function EventList() {
  const [eventList, setEventList] = useState<Event[]>([]);

  async function updateEvents() {
    try {
      const response = await axios.get<Event[]>("http://localhost:8080/event");
      const newEvents: Event[] = response.data;
      newEvents.forEach((event : Event) => {
        event.date = new Date(event.date);
        if (typeof(event.id) !== "number" || typeof(event.name) !== "string" || typeof(event.organizer) !== "string") {
          console.log("Invalid response from server: " + event);
        }
      })
      setEventList(newEvents);
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.status);
      } else if (err.request) {
        console.log("No response from server")
      } else {
        console.log(err);
      }
    }
  }

  
  useEffect(() => {
    updateEvents()
  },[]);
  
  return (
    <ListGroup>
      {eventList.map((event: Event) => 
        <EventItem 
          e = {event} 
          eventDeleted={() => updateEvents()}
          />
        )}
    </ListGroup>
  );
}


export function EventItem({e, eventDeleted} : {e: Event, eventDeleted : () => void}) {

  async function deleteEvent() {
    try{
      await axios.delete('http://localhost:8080/event',
          {data: {id: e.id}}
        );
      eventDeleted(); //TODO only update
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.status);
      } else if (err.request) {
        console.log("No response from server")
      } else {
        console.log(err);
      }
    }
  }

  return (<ListGroup.Item key={e.id}>
          <div><h5>{e.name}</h5>
              <small>{e.date.toLocaleString()}</small>
              <CloseButton onClick = 
              {ev =>{ev.preventDefault(); deleteEvent()}}/>
          </div>
          <p className="mb-1">{e.organizer}</p>
        </ListGroup.Item>)
}

export default EventList;
