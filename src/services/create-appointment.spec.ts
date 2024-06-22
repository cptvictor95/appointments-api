import { describe, it, expect } from "vitest";
import CreateAppointment from "./create-appointment";
import Appointment from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: new Date("2024-07-15T10:00:00Z"),
        endsAt: new Date("2024-07-15T11:00:00Z"),
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not create appointment with end date before start date", () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate("2024-06-22");
    const endsAt = getFutureDate("2024-06-21");

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).rejects.toThrowError(
      "Appointment cannot have an end date before the start date"
    );
  });

  it("should not be able to create appointment overlapping dates", async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate("2024-06-23");
    const endsAt = getFutureDate("2024-06-25");

    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2024-06-24"),
        endsAt: getFutureDate("2024-06-26"),
      })
    ).rejects.toThrowError(
      "Cannot create appointments with overlapping dates, choose another timeframe."
    );

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2024-06-22"),
        endsAt: getFutureDate("2024-06-24"),
      })
    ).rejects.toThrowError(
      "Cannot create appointments with overlapping dates, choose another timeframe."
    );

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2024-06-23"),
        endsAt: getFutureDate("2024-06-24"),
      })
    ).rejects.toThrowError(
      "Cannot create appointments with overlapping dates, choose another timeframe."
    );
  });
});
