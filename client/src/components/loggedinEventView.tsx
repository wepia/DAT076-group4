import '../css/main.css';
import { Container, Row, Col} from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import EventView from '../components/eventView';

function Profile() {
    return (
        <div>
          <Container>
              <Row className="justify-content-center">
                <Col>
                  <h1 className="text-center">Welcome to Athlete Assist</h1>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={10}>
                  <p className="mb-5 text-center">Profile</p>
                </Col>
              </Row>
          </Container>
          <Container>
            <Row className="justify-content-center text-center">
              <h2 className="mt-5">Available Events</h2>
            </Row>
          </Container>
          <Container>
           
                
          </Container>
         
        </div>
      );
}