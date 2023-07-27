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

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  await mongoose.connect(process.env.MONGODB_URI as string);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  runAutomations();
};

const runAutomations = () => {
  for (const { interval, action } of automations) {
    cron.schedule(interval, action);
  }
};

startServer();
