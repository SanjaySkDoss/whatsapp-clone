require("dotenv").config();
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var cors = require('cors');
var mongoose = require('mongoose');
const http = require("http");
const socketIo = require("socket.io");

// ================= MIDDLEWARE ================

//app.use(cors())
app.use(express.json())

mongoose.connect(process.env.URL, {

  useUnifiedTopology: true,
  useNewUrlParser: true, useFindAndModify: false
}); // connect to database

mongoose.connection.once('open',()=>{
  console.log('local db has been connected');
})
require('./model/User');
require('./model/Chatroom');
require('./model/Message');


// routes ===================================================================== 

require('./routes/authentication.js')(app)

// launch ======================================================================
//var server = app.listen(port);
const server = http.createServer(app);

//console.log('The magic happens on port ' + port);

var io = socketIo(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect',()=>{
    console.log('user disconnected');
  })
});
server.listen(port, () => console.log(`Listening on port ${port}`));