import { Router } from 'express';
import { getDb } from '../db/conn.js';
import bcrypt from 'bcrypt';

const registerRouter = Router();
const db = getDb();
const SALT_WORK_FACTOR = 10;


// Insert Account Function
async function insertAccount(fullName, email, hashedPassword, userType) {
    const labAccounts = await db.collection("labAccounts");
    console.log("Users has been created / retrieved");
  
    try {
      const val = await labAccounts.findOne({ email });
  
      if (val === null) {      

        const insertResult = await labAccounts.insertOne({
          name: fullName,
          description: "No biography found.",
          email: email,
          password: hashedPassword,
          accountType: userType,
          profilePicture: "",
        });
        console.log(insertResult);
      } else {
        console.log("This email has already been registered");
      }
    } catch (err) {
      console.log(err);
    }
  }
  
async function checkIfNameExists(name) {
  const labAccounts = await db.collection("labAccounts");

  try {
    const val = await labAccounts.findOne({ name: name });
    if (val !== null) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
  
async function checkIfEmailExists(email) {
  const labAccounts = await db.collection("labAccounts");

  try {
    const val = await labAccounts.findOne({ email: email });

    if (val !== null) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Middleware to check if the user is logged out
const isLoggedOut = (req, res, next) => {
  if (!req.session.email) {
    // If the user is not logged in, proceed to the next middleware/route handler
    next();
  } else {
    // If the user is logged in, redirect to the home page (or any other page)
    res.redirect('/');
  }
}

// Routes
registerRouter.get('/register', isLoggedOut, (req, res) => {
    res.render('register.ejs', { alert: '', name: '', email: '' }) ;
})
  
registerRouter.post('/register', async (req, res) => {
    //console.log(req.body)
    const fullName = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const accountType = req.body['account-type'];
    const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);

    // Registration logic
    const allowedDomain = 'dlsu.edu.ph';
    const domain = email.split('@')[1];

    const isNameExisting = await checkIfNameExists(fullName);
    const isEmailExisting = await checkIfEmailExists(email);

    if (allowedDomain !== domain) {
        res.render('register.ejs', { alert: 'Please use DLSU email only', name: fullName, email: email}) 
        return;
    }

    else {
        if(isNameExisting || isEmailExisting) {
            res.render('register.ejs', { alert: 'Name or email already exists', name: fullName, email: email }) 
        } else {
            console.log("Registration successful");
            res.redirect('/login');
            insertAccount(fullName, email, hashedPassword, accountType);  
        }
        }

})

export default registerRouter;