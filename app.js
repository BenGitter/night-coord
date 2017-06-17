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

const bar = require("./models/bar");

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

app.get("/api/bars/", (req, res) => {
  let location = req.query.location;
  let offset = req.query.offset || 0;

  request.get("https://api.yelp.com/v3/businesses/search?categories=bars&limit=50&location="+location+"&offset="+offset, {
    auth: {
      "bearer": access_token
    }
  }, (err, resp, body) => {
    let json = JSON.parse(body);
    if(json.error){
      res.json({success: false, error: json.error.code});
    }else{
      let waiting = json.businesses.length;
      json.businesses.forEach((val, i) => {
        bar.find({bar_id: val.id}, (err, bars) => {
          json.businesses[i].people = bars;
          waiting--;

          if(waiting == 0){
            res.json({success: true, data: json});
          }
        });
      });
      
    }
    
  });
  // res.send("Invalid Endpoint");
});

app.post("/api/bar", (req, res) => {
  let bar_id = req.body.bar_id;
  let user_id = req.body.user_id;

  let doc = new bar({bar_id, user_id});
  console.log(doc);
  doc.save((err) => {
    if(err){
      res.json({success: false, msg: err});
    }else{
      res.json({success: true, msg: "Doc added"});
    }
  })
});

app.post("/api/bar/delete", (req, res) => {
  let bar_id = req.body.bar_id;
  let user_id = req.body.user_id;

  bar.remove({bar_id:bar_id, user_id:user_id}, (err) => {
    if(err) res.json({success: false, msg: err});

    res.json({success: true, msg: "Doc removed"});
  })
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

  // Start server
  app.listen(port, () => {
    console.log("Server started on port", port);
  });
});
