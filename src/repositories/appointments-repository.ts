import type Appointment from "../entities/appointment";

export interface AppointmentsRepository {
  create(appointment: Appointment): Promise<void>;
  findById(id: string): Promise<Appointment | undefined>;
  findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | undefined>;
}
