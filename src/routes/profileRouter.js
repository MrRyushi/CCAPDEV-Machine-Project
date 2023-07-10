import { Router } from 'express';
import { getDb } from '../db/conn.js';

const profileRouter = Router();
const db = getDb();


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
            .find({ name: { $regex: new RegExp('^' + '.*' + searchQuery + '.*', 'i') } })
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

export default profileRouter;