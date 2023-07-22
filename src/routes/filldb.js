import { getDb, connectToMongo } from '../db/conn.js';
import 'dotenv/config';

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
    }
  ];

async function populateDatabase() {
    try {
        connectToMongo(async (err) => {
            if(err){
                console.log("error occurred");
                console.log(err);
                process.exit();
              }
              console.log("Connected to MongoDB Server");
          });

        const db = getDb();

        const labAccounts = db.collection('labAccounts');

        // Convert sampleData array to an array of documents to be inserted
        const documentsToInsert = profileSampleData.map((user) => ({
        name: user.fullName,
        description: user.description,
        email: user.email,
        password: user.password,
        accountType: user.accountType,
        profilePicture: user.profilePicture,
        }));

        // Insert the documents into the database
        const insertResult = await labAccounts.insertMany(documentsToInsert);

        console.log(`${insertResult.insertedCount} sample data inserted into the database.`);
    } catch (err) {
    console.log(err);
    } finally {
    // No need to close the client in the 'finally' block
    // The client is managed by the 'conn.js' file
  }
};

populateDatabase();
