import 'dotenv/config';
import { connectToMongo, getDb } from './db/conn.js';

// CONNECT TO DATABASE
async function main (err){
    if(err){
      console.log("error occurred");
      console.log(err);
      process.exit();
    }
    console.log("Connected to MongoDB Server");
    const db = getDb();

    
    // THE FOLLOWING COMMENTS ARE REFERENCES
    /*
    try {
        const studentUsers = await db.collection("studentUsers");
        console.log("Student Users has been created / retrieved");

        const insertResult = await studentUsers.insertOne({
            name: 'John Marcellana',
            email: 'john_patrick_marcellana@dlsu.edu.ph'
        });

        console.log(insertResult)

        let updateResult = await studentUsers.updateMany(
            {name: "John Marcellana"},
            {$set: {
                email: "jptmarcellana@gmail.com"
            }}).then(result => {
                console.log("updating one successful");
                console.log(result);
            }).catch(err => {
                console.log("updating one failed");
                console.log(err);
            })

        console.log(updateResult);

        let findResult = await studentUsers.findOne({name: "John"});
        console.log(findResult);
        findResult.toArray().then((arr) => {
            console.log("find op successful");
            console.log(arr);
        });
    } catch (err) {
        console.log("error has occurred");
        console.log(err);
    }*/
  }
  
connectToMongo(main);   



// HANDLING REQUESTS
import express from 'express';
const app = express();
const port = 3000;

app.listen(port, (e) => {
    if(e){
        console.log(e);
    } else {
        console.log("server is now listening..");
    }

});

app.get('/', (req, res) => {
    res.send('root');
})

app.get('/visitor', (req, res) => {
    
})

app.get('/student', (req, res) => {

})

app.get('/technician', (req, res) => {
    
})
