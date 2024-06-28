import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config";
import userRoute from "./routes/users/index"

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.json());
app.use(cors());

// Server Routes
app.use("/user", userRoute);

// MongoDB database configuration
mongoose
  .connect(config.MongoDB_URL)
  .then(async () => {
    app.listen(config.PORT, (result) => {
      console.log(
        `Successfully connect to Database with Server Port ${config.PORT}`
      );
    });
  })
  .catch((err) => {
    console.warn("Fail to connect to Database: ", err);
  });
