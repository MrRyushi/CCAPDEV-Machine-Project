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

// instantiate express
const app = express();
const SALT_WORK_FACTOR = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// profile sample data
const profileSampleData = [
  {
      fullName: "Samantha Nicole L. Caasi",
      description: "I am a sophomore taking up BS CS-ST. I am currently employed at MyCode as a Part-time Coding Instructor and the Marketing Director of iLearnTech UK.",
      email: "samantha_caasi@dlsu.edu.ph",
      password: "123",
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

// cl01 sample data
const cl01SampleData = [
  {
      user: "Anonymous",
      email: "samantha_caasi@dlsu.edu.ph",
      date: "2023-07-24",			
      time: "09:30 to 10:00,10:00 to 10:30",
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
      time: "13:00 to 13:30,13:30 to 14:00,14:00 to 14:30",
      seatSelected: "15",
      dateReq: "2023-07-25T12:45"
  },
  {
      user: "Anonymous",
      email: "sofia_balderosa@dlsu.edu.ph",
      date: "2023-07-28",		
      time: "09:00 to 09:30",
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

// cl02 sample data
const cl02SampleData = [
  {
      user: "Anonymous",
      email: "patrick_james_marcellana@dlsu.edu.ph",
      date: "2023-06-03",		
      time: "12:00 to 12:30",
      seatSelected: "28",
      dateReq: "2023-07-25T12:45"
  },
  {
      user: "Anonymous",
      email: "jose_romula_latosa@dlsu.edu.ph",
      date: "2023-06-16",	
      time: "09:30 to 10:00,10:00 to 10:30",
      seatSelected: "08",
      dateReq: "2023-06-10T17:20"
  },
  {
      user: "Sofia Ernest Y. Balderosa",
      email: "sofia_balderosa@dlsu.edu.ph",
      date: "2023-02-14",
      time: "10:30 to 11:00,11:00 to 11:30",
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

// cl03 sample data
const cl03SampleData = [
  {
      user: "Patrick James T. Marcellana",
      email: "patrick_james_marcellana@dlsu.edu.ph",
      date: "2023-06-16",		
      time: "09:30 to 10:00,10:00 to 10:30",
      seatSelected: "01",
      dateReq: "2023-06-10T17:20",
  },
  {
      user: "Jose Romulo N. Latosa",
      email: "jose_romula_latosa@dlsu.edu.ph",
      date: "2023-06-16",			
      time: "09:30 to 10:00,10:00 to 10:30",
      seatSelected: "02",
      dateReq: "2023-06-10T17:20"
  },
  {
      user: "Sofia Ernest Y. Balderosa",
      email: "sofia_balderosa@dlsu.edu.ph",
      date: "2023-06-16",			
      time: "09:30 to 10:00,10:00 to 10:30",
      seatSelected: "05",
      dateReq: "2023-06-10T17:20"
  },
  {
      user: "Samantha Nicole L. Caasi",
      email: "samantha_caasi@dlsu.edu.ph",
      date: "2023-06-16",			
      time: "09:30 to 10:00,10:00 to 10:30",
      seatSelected: "06",
      dateReq: "2023-06-10T17:20"
  },
  {
      user: "John Patrick T. Marcellana",
      email: "john_patrick_marcellana@dlsu.edu.ph",
      date: "2023-06-16",			
      time: "09:30 to 10:00,10:00 to 10:30",
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

// helper function to populate the database if there is no data yet
async function populateDatabase() {
  try {
    const db = getDb();
    const labAccounts = db.collection('labAccounts');
    const cl01Db = db.collection('cl01');
    const cl02Db = db.collection('cl02');
    const cl03Db = db.collection('cl03');

    // Check if the labAccounts collection is empty
    const labAccountsEmpty = await labAccounts.countDocuments() === 0;

    // If the labAccounts collection is not empty, no need to insert sample data
    if (!labAccountsEmpty) {
      console.log("Database already contains labAccounts data. Skipping insertion of sample data.");
      return;
    }

    // Prepare an array to store the labAccounts documents that need to be inserted
    const labAccountsToInsert = [];

    // Insert labAccounts sample data
    for (const user of profileSampleData) {
      // Check if the user's email already exists in the database
      const existingAccount = await labAccounts.findOne({ email: user.email });

      // If the account with the email doesn't exist, add the document to the insert array
      if (!existingAccount) {
        const hashedPassword = await bcrypt.hash(user.password, SALT_WORK_FACTOR); // You can adjust the salt rounds as needed
        labAccountsToInsert.push({
          name: user.fullName,
          description: user.description,
          email: user.email,
          password: hashedPassword, // Store the hashed password in the database
          accountType: user.accountType,
          profilePicture: user.profilePicture,
        });
      }
    }

    // Insert labAccounts sample data into the labAccounts collection
    if (labAccountsToInsert.length > 0) {
      const labAccountsInsertResult = await labAccounts.insertMany(labAccountsToInsert);
      console.log(`${labAccountsInsertResult.insertedCount} labAccounts inserted into the database.`);
    } else {
      console.log("All labAccounts already exist in the database.");
    }

    // Prepare an array to store the sample data for cl01, cl02, and cl03 collections
    const cl01ToInsert = [];
    const cl02ToInsert = [];
    const cl03ToInsert = [];

    // Check each user from the sample data for cl01, cl02, and cl03 collections
    for (const user of cl01SampleData) {
      const dataExists = await checkExistingData(cl01Db, user);
      if (!dataExists) {
        cl01ToInsert.push(user);
      }
    }

    for (const user of cl02SampleData) {
      const dataExists = await checkExistingData(cl02Db, user);
      if (!dataExists) {
        cl02ToInsert.push(user);
      }
    }

    for (const user of cl03SampleData) {
      const dataExists = await checkExistingData(cl03Db, user);
      if (!dataExists) {
        cl03ToInsert.push(user);
      }
    }

    // Insert sample data for cl01, cl02, and cl03 collections
    if (cl01ToInsert.length > 0) {
      const cl01InsertResult = await cl01Db.insertMany(cl01ToInsert);
      console.log(`${cl01InsertResult.insertedCount} cl01SampleData inserted into the database.`);
    } else {
      console.log("All cl01SampleData already exist in the database.");
    }

    if (cl02ToInsert.length > 0) {
      const cl02InsertResult = await cl02Db.insertMany(cl02ToInsert);
      console.log(`${cl02InsertResult.insertedCount} cl02SampleData inserted into the database.`);
    } else {
      console.log("All cl02SampleData already exist in the database.");
    }

    if (cl03ToInsert.length > 0) {
      const cl03InsertResult = await cl03Db.insertMany(cl03ToInsert);
      console.log(`${cl03InsertResult.insertedCount} cl03SampleData inserted into the database.`);
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

// main function
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

// call main
main();
