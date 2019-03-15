import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.DATABASE); // connect to database

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// v1 using direct method
app.use("/api/v1/auth", require("./routes/authRouter.js"));
app.use("/api/v1/home", require("./routes/homeRouter.js"));

// v2 using controller method
app.use("/api/v2", require("./routes/apiRoutes.js"));

app.get("/", (req, res) => {
  return res.send("Welcome to Express API!");
});

// setup port to listen to
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
