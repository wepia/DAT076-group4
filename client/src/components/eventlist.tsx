import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { EventItem } from './eventItem';
import { Event } from './eventView'


export default function EventList({events, receiver, page, update} : {events: Event[], receiver: string, page: string, update: () => void}){
 
 if(page === 'profile') {
  return (
    <ListGroup>
      {events.map((e: Event) => 
        <EventItem 
          key = {e.id}
          event = {e}
          receiver = {receiver}
          page = {page}
          update = {() => update()}
          />
        )}
    </ListGroup>
  );
      } else {
        return(
          <ListGroup>
          {events.map((e: Event) => 
            <EventItem 
              key = {e.id}
              event = {e}
              receiver = {receiver} 
              page = {page}
              update = {() => update()}
              />
            )}
        </ListGroup>
        );
      }
}
