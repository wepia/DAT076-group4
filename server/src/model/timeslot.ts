export interface Timeslot {
  id :number;
  start :Date;
  end :Date;
  eventID :number;
  volunteerIDs :number[];
  reqNoVolunteers :number;
}