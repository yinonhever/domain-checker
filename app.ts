import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cron from "node-cron";

import domainRoutes from "./routes/domains";
import automations from "./automations";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/domains", domainRoutes);
app.get("/", (_, res) => res.send("Domain checker app thing"));
app.use((_, res) => res.status(404).send("Page not found"));

/**
 * Connecting to the MongoDB database, starting the web server and scheduling
 * the automations.
 */
const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  await mongoose.connect(process.env.MONGODB_URI as string);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`, new Date());
    console.log(`An different extra log than before`, new Date());
  });
  scheduleAutomations();
};

/**
 * Scheduling the execution of all the configured automations, each with its
 * unique interval.
 */
const scheduleAutomations = () => {
  for (const { interval, action } of automations) {
    cron.schedule(interval, action);
  }
};

startServer();
