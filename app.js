// System-related packages
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path'; 
// Database modules
import { connectToMongo, getDb } from './src/db/conn.js';
import bcrypt from 'bcrypt';
// Routes modules
import router from "./src/routes/index.js";

import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const SALT_WORK_FACTOR = 10;

const profileSampleData = [
  {
      fullName: "Samantha Nicole L. Caasi",
      description: "I am a sophomore taking up BS CS-ST. I am currently employed at MyCode as a Part-time Coding Instructor and the Marketing Director of iLearnTech UK.",
      email: "samantha_caasi@dlsu.edu.ph",
      password: "comeonbarbieletsgoparty",
      accountType: "Student",
      profilePicture: ""
  },
  {
      fullName: "Sofia Ernest Y. Balderosa",
      description: "Currently a student from De La Salle University studying Computer Science major in Software Technology. Also working as a part-time programming instructor. A self taught Full-stack Web Developer using the MERN stack (MongoDB, Express JS, React, and Node.js).",
      email: "sofia_balderosa@dlsu.edu.ph",
      password: "myidol123",
      accountType: "Student",
      profilePicture: ""
  },
  {
      fullName: "John Patrick T. Marcellana",
      description: "Futures Trader, 2nd year BS CS-ST student",
      email: "john_patrick_marcellana@dlsu.edu.ph",
      password: "Angpogiko2023",
      accountType: "Student",
      profilePicture: ""
  }, 
  {
      fullName: "Patrick James T. Marcellana",
      description: "",
      email: "patrick_james_marcellana@dlsu.edu.ph",
      password: "ilovemybrother",
      accountType: "Student",
      profilePicture: ""
  }, 
  {
      fullName: "Janela Aimee M. Jimenez",
      description: "",
      email: "janela_aimee_jimenez@dlsu.edu.ph",
      password: "143sam",
      accountType: "Technician",
      profilePicture: ""
  },
  {
      fullName: "Jose Romulo N. Latosa",
      description: "You can call me JR! :)",
      email: "jose_romula_latosa@dlsu.edu.ph",
      password: "boybestfriend",
      accountType: "Student",
      profilePicture: ""
  }
];

const cl01SampleData = [
  {
      user: "Anonymous",
      email: "samantha_caasi@dlsu.edu.ph",
      date: "2023-07-24",			
      time: "9:30 to 10:00,10:30 to 11:00",
      seatSelected: "08",
      dateReq: "2023-07-23T15:23"
  },
  {
      user: "John Patrick T. Marcellana",
      email: "john_patrick_marcellana@dlsu.edu.ph",
      date: "2023-07-22",	
      time: "12:30 to 13:00",
      seatSelected: "01",
      dateReq: "2023-07-21T09:47"
  },
  {
      user: "Patrick James T. Marcellana",
      email: "patrick_james_marcellana@dlsu.edu.ph",
      date: "2023-07-26",	
      time: "13:00 to 13:30,13:30 to 14:00, 14:00 to 14:30",
      seatSelected: "15",
      dateReq: "2023-07-25T12:45"
  },
  {
      user: "Anonymous",
      email: "sofia_balderosa@dlsu.edu.ph",
      date: "2023-07-28",		
      time: "9:00 to 9:30",
      seatSelected: "08",
      dateReq: "2023-07-23T15:23"
  },
  {
      user: "Jose Romula N. Latosa",
      email: "jose_romulo_latosa@dlsu.edu.ph",
      date: "2023-07-29",			
      time: "15:30 to 16:00",
      seatSelected: "45",
      dateReq: "2023-07-26T07:54"
  }
];

const cl02SampleData = [
  {
      user: "Anonymous",
      email: "patrick_james_marcellana@dlsu.edu.ph",
      date: "2023-06-03",		
      time: "2:00 to 2:30",
      seatSelected: "28",
      dateReq: "2023-07-25T12:45"
  },
  {
      user: "Anonymous",
      email: "jose_romula_latosa@dlsu.edu.ph",
      date: "2023-06-16",	
      time: "9:30 to 10:00,10:30 to 11:00",
      seatSelected: "08",
      dateReq: "2023-06-10T17:20"
  },
  {
      user: "Sofia Ernest Y. Balderosa",
      email: "sofia_balderosa@dlsu.edu.ph",
      date: "2023-02-14",
      time: "10:30 to 11:00,11:30 to 12:00",
      seatSelected: "35",
      dateReq: "2023-02-09T13:33"
  },
  {
      user: "Samantha Nicole L. Caasi",
      email: "samantha_caasi@dlsu.edu.ph",
      date: "2023-02-24",
      time: "12:00 to 12:30,12:30 to 13:00",
      seatSelected: "35",
      dateReq: "2023-02-23T00:00"
  },
  {
      user: "John Patrick T. Marcellana",
      email: "john_patrick_marcellana@dlsu.edu.ph",
      date: "2023-02-24",			
      time: "12:00 to 12:30,12:30 to 13:00",
      seatSelected: "36",
      dateReq: "2023-02-23T00:01"
  }
];


const cl03SampleData = [
  {
      user: "Patrick James T. Marcellana",
      email: "patrick_james_marcellana@dlsu.edu.ph",
      date: "2023-06-16",		
      time: "9:30 to 10:00,10:30 to 11:00",
      seatSelected: "01",
      dateReq: "2023-06-10T17:20",
  },
  {
      user: "Jose Romulo N. Latosa",
      email: "jose_romula_latosa@dlsu.edu.ph",
      date: "2023-06-16",			
      time: "9:30 to 10:00,10:30 to 11:00",
      seatSelected: "02",
      dateReq: "2023-06-10T17:20"
  },
  {
      user: "Sofia Ernest Y. Balderosa",
      email: "sofia_balderosa@dlsu.edu.ph",
      date: "2023-06-16",			
      time: "9:30 to 10:00,10:30 to 11:00",
      seatSelected: "05",
      dateReq: "2023-06-10T17:20"
  },
  {
      user: "Samantha Nicole L. Caasi",
      email: "samantha_caasi@dlsu.edu.ph",
      date: "2023-06-16",			
      time: "9:30 to 10:00,10:30 to 11:00",
      seatSelected: "06",
      dateReq: "2023-06-10T17:20"
  },
  {
      user: "John Patrick T. Marcellana",
      email: "john_patrick_marcellana@dlsu.edu.ph",
      date: "2023-06-16",			
      time: "9:30 to 10:00,10:30 to 11:00",
      seatSelected: "07",
      dateReq: "2023-06-10T17:20"
  }
];

// Helper function to check if data already exists in the database
async function checkExistingData(collection, data) {
  const existingData = await collection.findOne({
    date: data.date,
    time: data.time,
    seatSelected: data.seatSelected,
  });
  return existingData !== null;
}

async function populateDatabase() {
  try {
    const db = getDb();
    const labAccounts = db.collection('labAccounts');
    const cl01Db = db.collection('cl01');
    const cl02Db = db.collection('cl02');
    const cl03Db = db.collection('cl03');

    // Prepare an array to store the documents that need to be inserted
    const documentsToInsert = [];

    // Check each user from the sample data
    for (const user of profileSampleData) {
        // Check if the user's email already exists in the database
        const existingAccount = await labAccounts.findOne({ email: user.email });

        // If the account with the email doesn't exist, add the document to the insert array
        if (!existingAccount) {
            const hashedPassword = await bcrypt.hash(user.password, SALT_WORK_FACTOR); // You can adjust the salt rounds as needed
            documentsToInsert.push({
                name: user.fullName,
                description: user.description,
                email: user.email,
                password: hashedPassword, // Store the hashed password in the database
                accountType: user.accountType,
                profilePicture: user.profilePicture,
            });
        }
    }

    if (documentsToInsert.length === 0) {
        console.log("All accounts already exist in the database.");
    } else {
      const insertResult = await labAccounts.insertMany(documentsToInsert);
      console.log("Accounts inserted....");
    }
    

    // Reset the documentsToInsert array for the next set of data
    documentsToInsert.length = 0;

    // Check each user from the sample data
    for (const user of cl01SampleData) {
      // Check if the user's data already exists in the respective collection
      const dataExists = await checkExistingData(cl01Db, user);
      if (!dataExists) {
        documentsToInsert.push(user);
      }
    }
    console.log(documentsToInsert.length);
    // Insert cl01SampleData into cl01Db
    if (documentsToInsert.length > 0) {
      const insertResult = await cl01Db.insertMany(documentsToInsert);
      console.log(`${insertResult.insertedCount} cl01SampleData inserted into the database.`);
    } else {
      console.log("All cl01SampleData already exist in the database.");
    }

    // Reset the documentsToInsert array for the next set of data
    documentsToInsert.length = 0;

    // Repeat the same process for cl02SampleData
    for (const user of cl02SampleData) {
      const dataExists = await checkExistingData(cl02Db, user);
      if (!dataExists) {
        documentsToInsert.push(user);
      }
    }

    // Insert cl02SampleData into cl02Db
    if (documentsToInsert.length > 0) {
      const insertResult = await cl02Db.insertMany(documentsToInsert);
      console.log(`${insertResult.insertedCount} cl02SampleData inserted into the database.`);
    } else {
      console.log("All cl02SampleData already exist in the database.");
    }

    // Reset the documentsToInsert array for the next set of data
    documentsToInsert.length = 0;

    // Repeat the same process for cl03SampleData
    for (const user of cl03SampleData) {
      const dataExists = await checkExistingData(cl03Db, user);
      if (!dataExists) {
        documentsToInsert.push(user);
      }
    }

    // Insert cl03SampleData into cl03Db
    if (documentsToInsert.length > 0) {
      const insertResult = await cl03Db.insertMany(documentsToInsert);
      console.log(`${insertResult.insertedCount} cl03SampleData inserted into the database.`);
    } else {
      console.log("All cl03SampleData already exist in the database.");
    }
  } catch (err) {
    console.log(err);
  } finally {
    // No need to close the client in the 'finally' block
    // The client is managed by the 'conn.js' file
  }
}



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
  populateDatabase();
}


main();
