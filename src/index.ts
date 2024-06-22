import express from "express";
import { createAppointmentController } from "./controllers/create-appointment.js";

const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Root API route 🌱");
});

app.post("/appointments/create", createAppointmentController);

app.listen(port, () => {
  console.info(`Server running on port ${port} 🚀`);
});
