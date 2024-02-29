import Card from 'react-bootstrap/Card';


function EventCard(props: any) {
  return (
    <Card
      bg="white"
      text="black"
      style={{ width: '80rem' }}
      className="mb-4"
    >
          <Card.Header style={{backgroundColor:'lightblue'}}>{props.Name}</Card.Header>
          <Card.Body>
            <Card.Title>{props.date}  </Card.Title>
            <Card.Text>
              {props.organizer}
          </Card.Text>
          </Card.Body>
        </Card>
      );
}

export default EventCard;
