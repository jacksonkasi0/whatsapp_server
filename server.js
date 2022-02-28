const express = require("express");
const connectDB = require("./config/db");
const Rooms = require("./model/rooms");
const cors = require("cors");
const http = require("http")
const Messages = require("./model/dbMessages");
const PORT = process.env.PORT || 5000;
const app = express();
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);

connectDB();

app.use(express.json());

app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');
});


app.get("/", (req, res) => {
  res.send("backend");
});

app.post("/group/create", (req, res) => {
  const name = req.body.groupName;
  Rooms.create(
    {
      name,
    },
    (err, data) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(201).send(data);
      }
    }
  );
});

app.post("/message/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(data);
    }
  });
});

app.get("/all/rooms", (req, res) => {
  Rooms.find({}, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(data);
    }
  });
});

app.get("/room/:id", (req, res) => {
  Rooms.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(data[0]);
    }
  });
});

app.get("/messages/:id", (req, res) => {
  Messages.find({ roomId: req.params.id }, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`server is up and running in port ${PORT}`);
});
