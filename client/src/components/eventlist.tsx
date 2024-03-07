import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { EventItem } from './eventItem';
import { Event } from './eventView'


export default function EventList({events, receiver, update} : {events: Event[], receiver: string, update: () => void}){
  return (
    <ListGroup>
      {events.map((e: Event) => 
        <EventItem 
          key = {e.id}
          event = {e}
          receiver = {receiver} 
          eventDeleted = {() => update()}
          />
        )}
    </ListGroup>
  );
}
