import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { ObjectId } from 'mongodb';

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

profileRouter.get('/profile', async (req, res) => {
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
  
profileRouter.post('/search', async (req, res) => {
    const searchQuery = req.body.query;
    console.log('searchQuery:', searchQuery);
    const email = req.session.email;
    const name = await findAccountName(email);
    const description = await findAccountDesc(email);

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

profileRouter.get('/profile/:objectId', async (req, res) => {
    try {
      const objectId = req.params.objectId;
      const email = req.session.email;
      const loggedInUserId = await findAccountId(email);
      const labAccounts = await db.collection('labAccounts');
      const user = await labAccounts.findOne({ _id: new ObjectId(objectId) }); // Use 'new ObjectId(objectId)' to create a new instance of ObjectId
      //const isStudent = await checkIfStudent(email);
      //console.log(isStudent);
      if (user) {
        if (new ObjectId(objectId).equals(loggedInUserId)) {
          res.redirect('/profile');
        } else {
          res.render('profile-visit', { name: user.name, description: user.description });
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

  
export default profileRouter;