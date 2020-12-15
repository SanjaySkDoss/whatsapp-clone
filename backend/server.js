let express = require('express');
let cors = require('cors');
let mongoose = require('mongoose');
let http = require("http");
let socketIo = require("socket.io");
require("dotenv").config();

// ================= MIDDLEWARE ================
let app = express();
let port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
}); // connect to database

mongoose.connection.once('open', () => {
  console.log('local db has been connected');
})
require('./model/User');
require('./model/Chatroom');
require('./model/Message');

let server = http.createServer(app);
let io = (socketIo)(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// routes ===================================================================== 

require('./routes/authentication.js')(app)

// launch ======================================================================
//let server = app.listen(port);

io.on('connect', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});
server.listen(port, () => console.log(`Listening on port ${port}`));