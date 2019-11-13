const express = require("express");
const AWS = require("aws-sdk");
const keys = require ("./keys");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bonsai-league"
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// AWS Shit
AWS.config.update({
 region: "us-east-1",
 accessKeyId: process.env.AWSAccessKeyId || keys.s3accesskey,
 secretAccessKey: process.env.AWSSecretKey || keys.s3secretaccesskey,
});

// Bucket
const s3bucket = process.env.bucket || keys.s3bucket;
console.log(s3bucket)

require("./scripts/seedDB")();
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
