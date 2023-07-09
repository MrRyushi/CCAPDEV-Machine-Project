// IMPORTS FOR CONNECTING TO DATABASE
import 'dotenv/config';
import { connectToMongo, getDb } from './db/conn.js';

// -- CONNECT TO DATABASE --
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

async function checkIfNameExists(name) {
  const labAccounts = await db.collection("labAccounts");
  
  try {
    const val = await labAccounts.findOne({ name });
    
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

async function findAccountName(email) {
  const labAccounts = await db.collection("labAccounts");
  
  try {
    const val = await labAccounts.findOne({ email });
    
    if (val) {
      return val.name;
    } else {
      console.log("Account not found");
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function findAccountDesc(email) {
  const labAccounts = await db.collection("labAccounts");
  
  try {
    const val = await labAccounts.findOne({ email });
    
    if (val) {
      return val.description;
    } else {
      console.log("Account not found");
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}


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
  

async function insertAccount(fullName, email, password, userType) {
    const labAccounts = await db.collection("labAccounts");
    console.log("Users has been created / retrieved");

    labAccounts.findOne({email: email}).then(async val => {
        console.log(val)
        console.log("Finding successful")

        if(val == null){
            const insertResult = await labAccounts.insertOne({
                name: fullName,
                description: "",
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


// IMPORTS FOR HANDLING REQUESTS
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; 
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';

// -- HANDLING REQUESTS --
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.urlencoded({ extended: true }));
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

// HOME, REGISTER, AND LOGIN
app.get('/', (req, res) => {
    res.render('home.ejs') 
})

app.get('/home', (req, res) => {
  res.render('home.ejs');
})

app.get('/register', (req, res) => {
  res.render('register.ejs', { alert: '', name: '', email: '' }) ;
})

app.post('/register', async (req, res) => {
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

app.get('/student-view', (req, res) => {
  res.render('student-view.ejs');
});

app.get('/technician-view', (req, res) => {
  res.render('technician-view.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs', { alert: '', email: '' });
})

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const rememberMe = req.body.rememberMe === 'true';

  req.session.email = email;
  req.session.password = password;
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
    
        console.log("Login successful");
        const accountType = await checkAccountType(email);
        console.log(accountType);
    
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

// My Profile Section
app.get('/profile', async (req, res) => {
  try {
    const email = req.session.email;
    const name = await findAccountName(email);
    const description = await findAccountDesc(email);
    const searchResults = [];
    res.render('profile', { name , description, searchResults});
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/search', async (req, res) => {
  const searchQuery = req.body.query; // Extract the search query from the request body
  console.log("searchQuery:", searchQuery);
  const email = req.session.email;
  const name = await findAccountName(email);
  const description = await findAccountDesc(email);
  try {
    const labAccounts = await db.collection('labAccounts');
    const searchResults = await labAccounts.find({ name: { $regex: `.*${searchQuery}.*`, $options: 'i' } }).toArray();
    res.render('profile.ejs', { name, description, searchResults });
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/profile/update-description', async (req, res) => {
  try {
    const email = req.session.email; // Assuming the user's email is stored in the session
    const description = req.body.description; // Retrieve the modified description from the request body

    // Update the profile description for the user in the database
    const labAccounts = await db.collection("labAccounts");
    await labAccounts.updateOne({ email }, { $set: { description } });

    res.json({ success: true }); // Return a success response
  } catch (error) {
    console.log('Error updating profile description:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Return an error response
  }
});



  
// ROOMS CL01 CL02 CL03

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/cl01', async (req, res) => {
  try {
    const cl01Data = await db.collection('cl01').find().toArray();
    res.json(cl01Data);
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/cl01', async (req, res) => {
  try {
    const cl01Data = await db.collection('cl01').find().toArray();
    res.render('cl01.ejs', { cl01Data });
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/cl02', async (req, res) => {
  try {
    const cl02Data = await db.collection('cl02').find().toArray();
    res.json(cl02Data);
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/cl02', async (req, res) => {
  try {
    const cl02Data = await db.collection('cl02').find().toArray();
    res.render('cl02.ejs', { cl02Data });
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
})

app.get('/api/cl03', async (req, res) => {
  try {
    const cl03Data = await db.collection('cl03').find().toArray();
    res.json(cl03Data);
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/cl03', async (req, res) => {
  try {
    const cl03Data = await db.collection('cl03').find().toArray();
    res.render('cl03.ejs', { cl03Data });
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
})
app.post('/room', async (req, res) => {
  console.log(req.body);
  const room01 = await db.collection('cl01');
  const room02 = await db.collection('cl02');
  const room03 = await db.collection('cl03');
  console.log("Rooms retrieved / created");

  if(req.body.view != 'visitor'){
    let roomUsed;
    if(req.body.roomName == 'CL01'){
      roomUsed = room01;
    } else if(req.body.roomName == 'CL02'){
      roomUsed = room02;
    } else {
      roomUsed = room03;
    }
    console.log(roomUsed + ' = ' + req.body.roomName);
    const insertResult = await roomUsed.insertOne({
      user: req.body.user,
      date: req.body.date,
      time: req.body.time, 
      seatSelected: req.body.seatSelected,
    });
    console.log(insertResult);
  }
})

// SERVER LISTEN
app.listen(port, (e) => {
  if(e){
      console.log(e);
  } else {
      console.log(`Server is now listening on ${port}`);
  }

});