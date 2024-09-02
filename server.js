import express from "express";
import cors from "cors";
import "dotenv/config";
// import multer from "multer";

import sequelize from "./database/db.js";
import anonymousSession from "./models/anonymousSession.model.js";
import { upload } from "./middlewares/multer.middleware.js";
import generateSessionId from "./middlewares/sessionId.middleware.js"; 
import createDirs from "./middlewares/createDir.middleware.js";

const app = express();


sequelize.sync({ alter: true }).then((result) => {
  app.listen(process.env.SERVER_PORT);
  // console.log(result);
  console.log(`Server started serving on Port ${process.env.SERVER_PORT}`);
});

app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true
  })
);

// app.use(bodyParser.json()); 

// app.get('/hi', async (req, res, next) => {
//   console.log(req.body);
//   return res.status(200).json({
//     success: true,
//     message: 'Hello'
//   });
// });

// app.post("/hi", upload.single("file"), async (req, res, next) => {
//   console.log(req.file);
//   // return res.download(`${req.file.path}`);
//   const filePath = req.file.path; // Path to the file in the 'uploads' directory
//   const fileName = req.file.originalname; // Original filename to use for download

//   // Send the file to the frontend
//   res.download(filePath, fileName, (err) => {
//     if (err) {
//       console.error("Error sending file:", err);
//       return res.status(500).send("Failed to download the file.");
//     }
//   });
// });

app.post("/hi", generateSessionId, createDirs, upload.array("file", 12), async (req, res, next) => {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    const done = await anonymousSession.create({
      sessionUUID: req.sessionId,
      conversionComplete: 1,
      originalFilePath: "/abc",
      convertedFilePath: "/bbc",
    });
    // console.log("server", req.files);
    return res.status(200).json({
      success: true,
      done,
    });
  }
);

// 

// app.get('/', async (req, res, next) => {
//   console.log(req);
//   return res.status(200).json({
//     success: true,
//     message: 'Good Boy'
//   });
// });

// app.use('/', (req, res, next) => {
//   console.log("Unknown route");
//   return res.status(500).json({
//     success: false,
//     message: "Are you in your senses?"
//   });
// });
