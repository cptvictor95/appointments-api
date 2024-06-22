import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository.js";
import CreateAppointment, {
  type CreateAppointmentRequest,
} from "./../services/create-appointment.js";
import type { Request, Response } from "express";

export const createAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { customer, startsAt, endsAt } = req.body;

    if (!customer || !startsAt || !endsAt) {
      return res.status(400).send("Missing required fields");
    }

    if (typeof customer !== "string" || customer.length === 0) {
      return res.status(400).send("Customer ID cannot be empty");
    }

    const appointmentsRepository = new InMemoryAppointmentsRepository();

    const createAppointment = new CreateAppointment(appointmentsRepository);

    const appointmentData: CreateAppointmentRequest = {
      customer,
      startsAt,
      endsAt,
    };

    const appointment = await createAppointment.execute(appointmentData);

    return res.status(200).send(appointment);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).send({ error: error.message });
    }
  }
};
