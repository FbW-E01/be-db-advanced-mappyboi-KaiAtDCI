import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import requestlogger from "./middleware/requestlogger.js";
import mongoose from 'mongoose';
import Report from './models/Report.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestlogger);




app.get("/notifications", (req, res) => {
  // Somehow load data from DB
  res.json([]);
});

app.post("/notifications", (req, res) => {
  console.log("Received", req.body);

  Report.createReport(
    req.body.firstName,
    req.body.lastName,
    req.body.position,
    req.body.description
  );

  res.status(201);
  res.json({ success: true });
});

app.use((req, res) => {
  res.status(404);
  res.send("I don't have what you seek");
});

app.listen(process.env.PORT, () => {
  console.info(`App listening on http://localhost:${process.env.PORT}`);
  mongoose.connect(
    'mongodb://localhost:27017/mappyboi'
  )
});

process.on('exit', function() {
  mongoose.disconnect();
});
