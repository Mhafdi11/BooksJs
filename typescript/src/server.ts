import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import { error } from "console";
import bookRoutes from './routes/book.router'
import { NextFunction, Request, Response  } from "express";
import path from "path";

const router = express();

/* Connect to Mongo */
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log("Connected to MongoDB");
    StartServer();
  })
  .catch(err => {
    console.error(err);
  });

const StartServer = () => {
  // Apply middleware before defining routes
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /* Routes */
  router.use('/books', bookRoutes);
  router.get('/add-book', (req, res) => {
    // Send the HTML file when '/add-book' is accessed
    res.sendFile(path.join(__dirname,'views', 'index.html')); // Replace 'path_to_your_html_file' with the actual path to your HTML file
  });

  /* Error Handling */
  router.use((err:any, req:Request, res:Response, next:NextFunction) => {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Define the server using http.createServer and pass the express app
  const server = http.createServer(router);

  // Listen to the server
  server.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}.`);
  });
}
