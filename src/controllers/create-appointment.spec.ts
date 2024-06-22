/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { createAppointmentController } from "../controllers/create-appointment";

import type { Request, Response } from "express";

describe("Create Appointment Controller", () => {
  it("should return 400 if required fields are missing", async () => {
    const req = {
      body: {},
    } as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any as Response;

    await createAppointmentController(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith("Missing required fields");
  });

  it("should return 500 if an error occurs", async () => {
    const req = {
      body: {
        customer: "John Doe",
        startsAt: new Date("2024-07-15T11:00:00Z"),
        endsAt: new Date("2024-07-15T11:00:00Z"),
      },
    } as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any as Response;

    await createAppointmentController(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledWith({
      error: "Appointment cannot have an end date before the start date",
    });
  });

  it("should create an appointment and return it", async () => {
    const req = {
      body: {
        customer: "John Doe",
        startsAt: new Date("2024-07-15T11:00:00Z"),
        endsAt: new Date("2024-07-15T12:00:00Z"),
      },
    } as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any as Response;

    await createAppointmentController(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith({
      props: {
        id: expect.any(String),
        customer: "John Doe",
        startsAt: new Date("2024-07-15T11:00:00Z"),
        endsAt: new Date("2024-07-15T12:00:00Z"),
      },
    });
  });
});
