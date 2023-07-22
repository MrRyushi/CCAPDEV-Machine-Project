// System-related packages
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path'; 
// Database modules
import { connectToMongo } from './src/db/conn.js';
// Routes modules
import router from "./src/routes/index.js";

import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function main(){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  //Set ejs as the experss app's default view engine
  app.set('view engine', 'ejs');
  // Set 'views' directory for any views being rendered res.render()
  app.set('views', path.join(__dirname, '/src/views'));
  // view cache to false
  app.set("view cache", false);
  // Require static assets from public folder
  app.use(express.static(path.join(__dirname, 'public')));

  // from this point onwards, we are going to receive json format data
  app.use(express.json());

  // route methods
  app.use(router);

  // SERVER LISTEN
  app.listen(process.env.SERVER_PORT, (e) => {
    if(e){
      console.log(e);
    } else {
      console.log(`Server is now listening on ${process.env.SERVER_PORT}`);
      connectToMongo(async (err) => {
        if(err){
            console.log("error occurred");
            console.log(err);
            process.exit();
          }
          console.log("Connected to MongoDB Server");
      })
    }
  });
}

main();
