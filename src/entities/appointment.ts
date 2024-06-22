export interface AppointmentProps {
  id: string;
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

class Appointment {
  private props: AppointmentProps;

  set endsAt(date: Date) {
    this.endsAt = date;
  }

  get id() {
    return this.props.id;
  }

  get customer() {
    return this.props.customer;
  }

  get startsAt() {
    return this.props.startsAt;
  }

  get endsAt() {
    return this.props.endsAt;
  }

  constructor(props: AppointmentProps) {
    const { startsAt, endsAt } = props;

    if (startsAt <= new Date()) {
      throw new Error("Appointment cannot have a start date before now");
    }
    if (endsAt <= startsAt) {
      throw new Error(
        "Appointment cannot have an end date before the start date"
      );
    }

    this.props = props;
  }
}

export default Appointment;
