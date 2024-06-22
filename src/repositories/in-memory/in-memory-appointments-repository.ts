import { areIntervalsOverlapping } from "date-fns";

import type Appointment from "../../entities/appointment";
import type { AppointmentsRepository } from "../appointments-repository";

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public appointments: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | undefined> {
    const overlappingAppointment = this.appointments.find((appointment) => {
      return areIntervalsOverlapping(
        {
          start: startsAt,
          end: endsAt,
        },
        {
          start: appointment.startsAt,
          end: appointment.endsAt,
        },
        {
          inclusive: true,
        }
      );
    });

    if (!overlappingAppointment) return undefined;

    return Promise.resolve(overlappingAppointment);
  }

  async findById(id: string): Promise<Appointment | undefined> {
    const appointmentById = this.appointments.find(
      (appointment) => appointment.id === id
    );

    return appointmentById;
  }
}
