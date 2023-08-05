import { Router } from 'express';
import { getDb } from '../db/conn.js';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

const loginRouter = Router();
const db = getDb();

loginRouter.use(bodyParser.urlencoded({ extended: true }));
loginRouter.use(bodyParser.json());


// Check if Email Exists Function
async function checkIfEmailExists(email) {
    const labAccounts = await db.collection("labAccounts");

    try {
        const val = await labAccounts.findOne({ email });
        if (val) {
            return true;
        } else {
            return false;
        }

    } catch (err) {
        console.log(err);
        return false;
    }
}

// Check Account Type Function
async function checkAccountType(email) {
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
  
// Check Credentials Function
async function checkCredentials(email, password) {
    const labAccounts = await db.collection("labAccounts");
    console.log("Users have been created / retrieved");
  
    try {
      const user = await labAccounts.findOne({ email: email });
      //console.log("Finding successful");
  
      if (!user) {
        console.log("This email has not yet been registered");
        return false;
      }
  
      const doesMatch = await bcrypt.compare(password, user.password);
  
      if (doesMatch) {
        console.log("Password is correct");
        return true;
      } else {
        console.log("Password is incorrect");
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
loginRouter.get('/login', isLoggedOut, (req, res) => {
    res.render('login.ejs', { alert: '', email: '' });
})
  
loginRouter.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe;

    console.log("remeber me", + rememberMe);

    let accountType;

    req.session.email = email;

    const allowedDomain = 'dlsu.edu.ph';
    const domain = email.split('@')[1];

    const isEmailExisting = await checkIfEmailExists(email);

    if (allowedDomain !== domain) {
        console.log("Invalid email domain");
        res.render('login.ejs', { alert: 'Please use DLSU email only', email: '' });
        return;
    } else {
        if (isEmailExisting) {
            try {
                const doesMatch = await checkCredentials(email, password);

                if (!doesMatch) {
                    console.log("Login unsuccessful");
                    res.render('login.ejs', { alert: 'Incorrect password. Please try again.', email: email });
                    return;
                }

                console.log('Login successful');
                req.session.accountType = await checkAccountType(email);
                accountType = req.session.accountType;

                if (rememberMe == "on") {
                    // Set a persistent cookie with extended expiration (3 weeks)
                    req.session.cookie.maxAge = 3 * 7 * 24 * 60 * 60 * 1000;
                    console.log("Session cookie set with extended expiration");
                } else {
                    // Set a session cookie with the default expiration (3 weeks)
                    req.session.cookie.expires = false;
                    console.log("Session cookie set with default expiration");
                }

                if (accountType === 'Student') {
                    res.redirect('/student-view');
                } else if (accountType === 'Technician') {
                    res.redirect('/technician-view');
                } else {
                    res.redirect('/home');
                }
            } catch (err) {
                console.log(err);
                res.redirect('/login');
            }
        } else {
            res.render('login.ejs', { alert: "Account doesn't exist. Please register first.", email: email });
            return;
        }
    }
});

export default loginRouter;