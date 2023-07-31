import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';
import path from 'path';
import fs from 'fs';
import multer from 'multer';



const profileRouter = Router();
const db = getDb();

// Find Account ID Function
async function findAccountId(email) {
    const labAccounts = await db.collection("labAccounts");
  
    try {
      const val = await labAccounts.findOne({ email });
  
      if (val) {
        return val._id; // Return the ObjectId of the user
      } else {
        console.log("Account not found");
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

// Find Account Name Function
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
  
// Find Account Picture Function
async function findAccountPicture(email) {
  const labAccounts = await db.collection('labAccounts');

  try {
    const val = await labAccounts.findOne({ email });

    if (val) {
      return val.profilePicture; // Return the profile picture as a base64-encoded string
    } else {
      console.log('Account not found');
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
  
// Find Account Description Function
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

// Multer configuration
// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/profile-pictures');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage });

profileRouter.get('/profile', async (req, res) => {
  try {
    const email = req.session.email;
    const name  = await findAccountName(email);
    const description = await findAccountDesc(email);
    const profilePicture = await findAccountPicture(email);
    const searchResults = [];

    // Convert the profile picture to a base64-encoded string
    const profilePictureData = profilePicture ? profilePicture.toString('base64') : null;

    res.render('profile', { name, description, profilePicture: profilePictureData, searchResults });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});
  
profileRouter.post('/search', async (req, res) => {
    const searchQuery = req.body.query;
    console.log('searchQuery:', searchQuery);
    const email = req.session.email;

    try {
        const labAccounts = await db.collection('labAccounts');
        let searchResults = [];

        if (searchQuery.trim() !== '') {
          searchResults = await labAccounts
          .find({
            name: { $regex: new RegExp('^' + '.*' + searchQuery + '.*', 'i') },
            accountType: 'Student' // Filter by accountType: Student
          })
            .toArray();

        searchResults = searchResults.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        }

        res.json(searchResults);
    } catch (error) {
        console.log('Error retrieving data from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Update Profile Picture Route
profileRouter.post('/profile/update-profile-picture', upload.single('profilePicture'), async (req, res) => {
  try {
    const email = req.session.email; // Assuming the user's email is stored in the session

    // Get the uploaded file
    const file = req.file;

    if (!file) {
      throw new Error('No profile picture file provided');s
    }

    // Generate a unique filename
    const fileName = file.filename;

    // Delete the previous profile picture if it exists
    const profilePicture = await findAccountPicture(email);
    
    if (profilePicture) {
      const previousPicturePath = '../public/profile-pictures/' + profilePicture;
      if (fs.existsSync(previousPicturePath)) {
        fs.unlinkSync(previousPicturePath);
      }
    }

    // Update the user's profile picture in the database
    const labAccounts = await db.collection('labAccounts');
    await labAccounts.updateOne({ email }, { $set: { profilePicture: fileName } });

    res.json({ success: true, profilePicture: `/profile-pictures/${fileName}` }); // Return the success response with the updated profile picture URL
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Return an error response
  }
});

profileRouter.post('/profile/update-description', async (req, res) => {
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


profileRouter.post('/profile/update-profile-picture', async (req, res) => {
  try {
    const email = req.session.email; // Assuming the user's email is stored in the session

    // Retrieve the user's profile picture from the database
    const profilePicture = await findAccountPicture(email);

    if (!profilePicture) {
      throw new Error('Profile picture not found');
    }

    // Get the uploaded file
    const file = req.files.profilePicture;

    // Generate a unique filename
    const fileName = `${Date.now()}_${file.name}`;

    // Define the file upload path
    const uploadPath = path.join(__dirname, '..', 'public', 'profile-pictures', fileName);

    // Move the file to the upload path
    await file.mv(uploadPath);

    // Delete the previous profile picture if it exists
    const previousPicturePath = path.join(__dirname, '..', 'public', 'images', 'profile-pictures', profilePicture);
    if (fs.existsSync(previousPicturePath)) {
      fs.unlinkSync(previousPicturePath);
    }

    // Update the user's profile picture in the database
    const labAccounts = await db.collection('labAccounts');
    await labAccounts.updateOne({ email }, { $set: { profilePicture: fileName } });

    res.json({ success: true, profilePicture: `/profile-pictures/${fileName}` }); // Return the success response with the updated profile picture URL
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Return an error response
  }
});

profileRouter.post('/profile/delete-user', async (req, res) => {
  try {
    const email = req.session.email; // Assuming the user's email is stored in the session

    // Delete the user from the MongoDB collection
    const labAccounts = await db.collection('labAccounts');
    await labAccounts.deleteOne({ email });

    req.session.destroy(); // Destroy the session after deleting the account
    res.redirect('/profile/logout'); // Redirect to the login page
  } catch (error) {
    console.log('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

profileRouter.get('/profile/home', async (req, res) => {
  try {
    res.redirect('/student-view');
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' }); // Return an error response
  }
});

profileRouter.get('/profile/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
        console.log('Error destroying session:', err);
    }
    res.redirect('/login');
});
});

profileRouter.get('/profile/:objectId', async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const email = req.session.email;
    const loggedInUserId = await findAccountId(email);
    const labAccounts = await db.collection('labAccounts');
    const user = await labAccounts.findOne({ _id: new ObjectId(objectId) });

    if (user) {
      if (new ObjectId(objectId).equals(loggedInUserId)) {
        res.redirect('/profile');
      } else {
        const profilePicture = await findAccountPicture(user.email); // Fetch the profile picture using the user's email

        // Convert the profile picture to a base64-encoded string
        const profilePictureData = profilePicture ? profilePicture.toString('base64') : null;

        res.render('profile-visit', { name: user.name, description: user.description, profilePicture: profilePictureData }); // Pass the profilePictureData variable to the view
      }
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.log('Error retrieving user profile:', error);
    res.status(500).send('Internal Server Error');
  }
});
  
  profileRouter.post('/getReservations', async (req, res) => {
    try {
      // get reservations
      const cl01Data = await db.collection('cl01').find().toArray();
      const cl02Data = await db.collection('cl02').find().toArray();
      const cl03Data = await db.collection('cl03').find().toArray();
  
      let cl01Array = [];
      let cl02Array = [];
      let cl03Array = [];
      let email = req.session.email;
      console.log(email);
      for (let data of cl01Data) {
        if (data.email == email) {
          cl01Array.push(data);
        }
      }
  
      for (let data of cl02Data) {
        if (data.email == email) {
          cl02Array.push(data);
        }
      }
  
      for (let data of cl03Data) {
        if (data.email == email) {
          cl03Array.push(data);
        }
      }
  
      res.json({ cl01Array, cl02Array, cl03Array }); // Send the arrays as an object
    } catch (error) {
      console.log('Error retrieving data from MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  profileRouter.post('/update-reservation', async (req, res) => {
    const room01 = await db.collection('cl01');
    const room02 = await db.collection('cl02');
    const room03 = await db.collection('cl03');
    console.log("Rooms retrieved / created");

    let roomUsed;
    if(req.body.roomName == 'CL01'){
      roomUsed = room01;
    } else if(req.body.roomName == 'CL02'){
      roomUsed = room02;
    } else {
      roomUsed = room03;
    }
    
    console.log(req.body.newTimeRes);
    console.log(req.body.newSeatNum);
    const updateResult = await roomUsed.updateOne(
      {
        date: req.body.date,
        time: req.body.prevTime,
        seatSelected: req.body.prevSeat,
      },
      {
        $set: {
          time: req.body.newTimeRes,
          seatSelected: req.body.newSeatNum,
        },
      }
    );
    console.log("updating one successful", updateResult);
    
  
  })

  profileRouter.post('/delete-reservation', async (req, res) => {
    let roomUsed;
    const room01 = await db.collection('cl01');
    const room02 = await db.collection('cl02');
    const room03 = await db.collection('cl03');

    
    if(req.body.room == "CL01"){
      roomUsed = room01;
    } else if(req.body.room == "CL02"){
      roomUsed = room02;
    } else if(req.body.room == "CL03"){
      roomUsed = room03;
    }

    roomUsed.deleteOne({
      seatSelected: req.body.seatNum,
      date: req.body.date,
      time: req.body.time
    }).then(val => {
      console.log("deleting successful");
      console.log(val);
    }).catch(err => {
      console.log(err);
    })
  })
  
export default profileRouter;