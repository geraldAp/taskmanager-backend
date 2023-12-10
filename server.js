require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const connectDb = require("./config/dbCon");

const app = express();

// middle wares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// database connection
connectDb();

app.use("/api/auth", authRoute);

const Port = process.env.PORT || 8000;

app.listen(Port, () => {
  console.log("server connected successfully on", Port);
});
