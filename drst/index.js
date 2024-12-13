const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crypto = require('crypto');
const path = require('path');

const app = express();

mongoose.connect("mongodb://localhost/database")

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
  });
  
app.use('/files', express.static(path.join(__dirname, 'public')));

app.get('/terms-and-conditions', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'terms-and-conditions.pdf');
  res.sendFile(filePath);
});

app.use(bodyParser.json());

app.use("/api", require("./api"));

app.listen(4000, ()=>{console.log("server is listening");})
