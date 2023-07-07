import 'dotenv/config';
import { connectToMongo, getDb } from './db/conn.js';

// CONNECT TO DATABASE
var db;
connectToMongo(async (err) => {
    if(err){
        console.log("error occurred");
        console.log(err);
        process.exit();
      }
      console.log("Connected to MongoDB Server");
      db = getDb();  
})

async function checkAccountType(email, password) {
    const labAccounts = await db.collection("labAccounts");
  
    try {
      const val = await labAccounts.findOne({ email });
     
    //console.log("checkAccountType: Finding successful");
    return val.accountType;
    
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  

async function checkCredentials(email, password) {
    const labAccounts = await db.collection("labAccounts");
    console.log("Users has been created / retrieved");
  
    try {
      const val = await labAccounts.findOne({ email: email });
      //console.log("Finding successful");
  
      if (val == null) {
        console.log("This email has not yet been registered");
        return false;
      } else {
        console.log(val.password === password);
        if (val.password === password) {
          console.log("Password is correct");
          return true;
        } else {
          console.log("Password is incorrect");
          return false;
        }
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  

async function insertAccount(email, password, userType) {
    const labAccounts = await db.collection("labAccounts");
    console.log("Users has been created / retrieved");

    labAccounts.findOne({email: email}).then(async val => {
        console.log(val)
        console.log("Finding successful")

        if(val == null){
            const insertResult = await labAccounts.insertOne({
                email: email,
                password: password,
                accountType: userType
            });
            console.log(insertResult);
        } else {
            console.log("This email has already been registered");
        }
    }).catch(err => {
        console.log(err)
    }); 
}


// HANDLING REQUESTS
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; 
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bycrypt';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3 * 7 * 24 * 60 * 60 * 1000, // 3 weeks
    secure: false, // Change to true if using HTTPS
    httpOnly: true,
  },
}));

app.listen(port, (e) => {
    if(e){
        console.log(e);
    } else {
        console.log(`Server is now listening on ${port}`);
    }

});

app.get('/', (req, res) => {
    res.render('home.ejs') 
})

app.get('/login', (req, res) => {
    res.render('login.ejs') 
})

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe === 'true';
  
    // Log in logic
    const allowedDomain = 'dlsu.edu.ph';
    const domain = email.split('@')[1];
  
    if (allowedDomain !== domain) {
      res.render('login.ejs');
      console.log("Invalid email domain");
      return;
    } else {
      try {
        const doesMatch = await checkCredentials(email, password);
  
        if (doesMatch) {
          console.log("Login successful");
          const accountType = await checkAccountType(email, password);
          console.log(accountType);

        //   if (accountType === 'user') {
        //     req.session.user = true; // Store user session variable
        //     res.redirect('/user-view');
        //   } else if (accountType === 'technician') {
        //     req.session.technician = true; // Store technician session variable
        //     res.redirect('/technician-view');
        //   }
  
          if (rememberMe) {
            // Set a persistent cookie with extended expiration
            req.session.cookie.maxAge = 3 * 7 * 24 * 60 * 60 * 1000; // 3 weeks
          }
          
        } else {
          console.log("Login unsuccessful");
          res.redirect('/login');
        }
      } catch (err) {
        console.log(err);
        res.redirect('/login');
      }
    }
  });
  

app.get('/register', (req, res) => {
    res.render('register.ejs') 
})

app.post('/register', (req, res) => {
    //console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    const accountType = req.body['account-type'];

    // Registration logic
    const allowedDomain = 'dlsu.edu.ph';
    const domain = email.split('@')[1];

    if (allowedDomain != domain) {
        res.render('register.ejs');
        console.log("Invalid email domain");
        return;
    }

    else {
        console.log("Registration successful");
        res.redirect('/login');

    insertAccount(email, password, accountType);  
    }
})

// // Middleware to check if the user session exists
// const checkUserSession = (req, res, next) => {
//     if (req.session.user) {
//       next(); // User session exists, proceed to the next middleware or route
//     } else {
//       res.redirect('/login'); // User session doesn't exist, redirect to login page
//     }
//   };
  
//   // Middleware to check if the technician session exists
//   const checkTechnicianSession = (req, res, next) => {
//     if (req.session.technician) {
//       next(); // Technician session exists, proceed to the next middleware or route
//     } else {
//       res.redirect('/login'); // Technician session doesn't exist, redirect to login page
//     }
//   };
  
//   app.get('/user-view', checkUserSession, (req, res) => {
//     // Render the user view (studentview.ejs)
//     res.render('studentview.ejs');
//   });
  
//   app.get('/technician-view', checkTechnicianSession, (req, res) => {
//     // Render the technician view (technicianview.ejs)
//     res.render('technicianview.ejs');
//   });
  