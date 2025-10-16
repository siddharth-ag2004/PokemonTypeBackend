require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
mongoose.set("strictQuery", false);
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send({ mssg: "This is the backend" });
});

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log("connected and listening on ", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
