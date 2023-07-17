import { Router } from 'express';
import { getDb } from '../db/conn.js';
import fs from 'fs';

const registerRouter = Router();
const db = getDb();


// Insert Account Function
async function insertAccount(fullName, email, password, userType) {
    const labAccounts = await db.collection("labAccounts");
    console.log("Users has been created / retrieved");
  
    try {
      const val = await labAccounts.findOne({ email });
  
      if (val === null) {
        // const defaultProfilePicturePath = "public/images/profile.jpg";
       
        // const insertResult = await labAccounts.insertOne({
        //   name: fullName,
        //   description: "No biography found.",
        //   email: email,
        //   password: password,
        //   accountType: userType,
        //   profilePicture: defaultProfilePicturePath,
        // });
       
        const insertResult = await labAccounts.insertOne({
          name: fullName,
          description: "No biography found.",
          email: email,
          password: password,
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
  
// Routes
registerRouter.get('/register', (req, res) => {
    res.render('register.ejs', { alert: '', name: '', email: '' }) ;
})
  
registerRouter.post('/register', async (req, res) => {
    //console.log(req.body)
    const fullName = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const accountType = req.body['account-type'];

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
            insertAccount(fullName, email, password, accountType);  
        }
        }

})

export default registerRouter;