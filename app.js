// Dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const request = require("request");

const config = require("./config/database");
const yelp = require("./config/yelp");

// Mongoose
mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
  console.log("Connected to database", config.database);
});
mongoose.connection.on("error", (error) => {
  console.log("Database error:", error);
});

// Routes
const users = require("./routes/users");

// Set appp and port
const app = express();
const port = 3000;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body-parser middleware
app.use(bodyParser.json());          

// Passport middleware
app.use(passport.initialize());  
app.use(passport.session());
require("./config/passport")(passport);

// Routing
app.use("/users", users);

app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Get Yelp token
let access_token = "";
request.post("https://api.yelp.com/oauth2/token", { form: {
  grant_type: "client_credentials",
  client_id: yelp.client_id,
  client_secret: yelp.client_secret
}}, (err, res, body) => {
  // console.log(JSON.parse(body));
  access_token = JSON.parse(body).access_token;
  // console.log(access_token);

  request.get("https://api.yelp.com/v3/businesses/search?location=Rotterdam", {
    auth: {
      "bearer": access_token
    }
  }, (err, res, body) => {
    console.log(body);
  })
});

// Start server
app.listen(port, () => {
  console.log("Server started on port", port);
});