import Appointment from "../entities/appointment.js";
import type { AppointmentsRepository } from "../repositories/appointments-repository";

export interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

export type CreateAppointmentResponse = Appointment;

class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt
      );

    if (overlappingAppointment) {
      throw new Error(
        "Cannot create appointments with overlapping dates, choose another timeframe."
      );
    }

    const randomId = Math.random().toString(36).substring(7);
    const appointment = new Appointment({
      id: randomId,
      customer,
      startsAt,
      endsAt,
    });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}

export default CreateAppointment;
