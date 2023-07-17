import { Router } from 'express';
import { getDb } from '../db/conn.js';

const viewsRouter = Router();
const db = getDb();

viewsRouter.get('/api/student-view', async (req, res) => {
    try {
        const accountType = req.session.accountType;
        const email = req.session.email;
        if(email != null){
            const labAccounts = await db.collection('labAccounts');
            labAccounts.findOne({email: email}).then(async val => {
                let userName = val.name;
                let email = val.email;
                res.json({ accountType, userName, email });
            });
        }
    } catch (error) {
      console.log('Error retrieving data from MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
  });

viewsRouter.get('/student-view', async (req, res) => {
    try {
        const accountType = req.session.accountType;
        const email = req.session.email;
        if(email != null){
            const labAccounts = await db.collection('labAccounts');
            labAccounts.findOne({email: email}).then(async val => {
                let userName = val.name;
                let email = val.email;
                res.render('student-view.ejs', { accountType, userName, email });
            });
        }
      } catch (error) {
        console.log('Error retrieving data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
      }
});
  
viewsRouter.get('/technician-view', (req, res) => {
    res.render('technician-view.ejs');
});

viewsRouter.get('/allreservations', (req, res) => {
    res.render('allreservations.ejs')
})

viewsRouter.post('/getAllReservations', async (req, res) => {
    try {
      // get reservations
      const cl01Data = await db.collection('cl01').find().toArray();
      const cl02Data = await db.collection('cl02').find().toArray();
      const cl03Data = await db.collection('cl03').find().toArray();
  
      
  
      res.json({ cl01Data, cl02Data, cl03Data }); // Send the arrays as an object
    } catch (error) {
      console.log('Error retrieving data from MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
  });

export default viewsRouter;