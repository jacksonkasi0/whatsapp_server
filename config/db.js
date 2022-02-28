const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DB_URL;



const connectDB = async () => {
  try {
    const connect = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

// const db = () => {
//   try {
//     const db = mongoose.connection;

//     db.once("open", () => {
//       console.log("Pusher on board");
//       const roomCollection = db.collection("rooms");
//       const changeStream = roomCollection.watch();

//       changeStream.on("change", (change) => {
//         if (change.operationType === "insert") {
//           const roomDetails = change.fullDocument;
//           pusher.trigger("rooms", "inserted", roomDetails);
//         } else {
//           console.log("Not expected to trigger");
//         }
//       });

//       const msgCollection = db.collection("messages");
//       const changeStream1 = msgCollection.watch();

//       changeStream1.on("change", (change) => {
//         if (change.operationType === "insert") {
//           const messageDetails = change.fullDocument;
//           pusher.trigger("messages", "inserted", messageDetails);
//         } else {
//           console.log("Not expected to trigger");
//         }
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = connectDB;
