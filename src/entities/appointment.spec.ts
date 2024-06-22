import { expect, test } from "vitest";
import Appointment from "./appointment";
import { getFutureDate } from "../tests/utils/get-future-date";

test("create an appointment", () => {
  const appointment = new Appointment({
    id: "asd",
    customer: "John Doe",
    startsAt: new Date("2024-07-15T10:00:00Z"),
    endsAt: new Date("2024-07-15T11:00:00Z"),
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
  expect(appointment.startsAt).toBeInstanceOf(Date);
  expect(appointment.endsAt).toBeInstanceOf(Date);
});

test("cannot create appointment with end date before start date", () => {
  const startsAt = getFutureDate("2024-06-22");
  const endsAt = getFutureDate("2024-06-21");

  expect(() => {
    return new Appointment({
      id: "asd",
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  }).toThrowError("Appointment cannot have an end date before the start date");
});

test("cannot create appointment with end date before now", () => {
  const now = new Date();
  const oneHourAgo = new Date(now.setHours(now.getHours() - 1));

  expect(() => {
    return new Appointment({
      id: "asd",
      customer: "John Doe",
      startsAt: oneHourAgo,
      endsAt: new Date("2024-07-15T09:00:00Z"),
    });
  }).toThrowError("Appointment cannot have a start date before now");
});
