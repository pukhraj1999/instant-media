const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
require("./db/connect");

const app = express();

//MiddleWares
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Routers
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

app.use("/posts/", postRoute);
app.use("/user/", userRoute);

const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
