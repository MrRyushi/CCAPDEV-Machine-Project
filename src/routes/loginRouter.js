import { Router } from 'express';
import { getDb } from '../db/conn.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import bcrypt from 'bcrypt';

const loginRouter = Router();
const db = getDb();
const SALT_WORK_FACTOR = 10;

loginRouter.use(bodyParser.urlencoded({ extended: true }));
loginRouter.use(bodyParser.json());
loginRouter.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3 * 7 * 24 * 60 * 60 * 1000, // 3 weeks
      secure: false, // Change to true if using HTTPS
      httpOnly: true,
    },
  }));

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

// Routes
loginRouter.get('/login', (req, res) => {
    res.render('login.ejs', { alert: '', email: '' });
})
  
loginRouter.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe === 'true';

    //const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    let accountType;

    req.session.email = email;
    // req.session.password = hashedPassword;
    // Log in logic
    const allowedDomain = 'dlsu.edu.ph';
    const domain = email.split('@')[1];

    const isEmailExisting = await checkIfEmailExists(email);

    if (allowedDomain !== domain) {
        console.log("Invalid email domain");
        res.render('login.ejs', { alert: 'Please use DLSU email only', email: '' });
        return;
    }

    else {
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
                req.session.email = email;
                console.log("account type: " + req.session.accountType);
                accountType = req.session.accountType;
            
                if (accountType === 'Student') {
                    res.redirect('/student-view');
                } else if (accountType === 'Technician') {
                    res.redirect('/technician-view');
                } else {
                    //redirect to a default view
                    res.redirect('/home');
                }
            
                if (rememberMe) {
                    // Set a persistent cookie with extended expiration
                    req.session.cookie.maxAge = 3 * 7 * 24 * 60 * 60 * 1000; // 3 weeks
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