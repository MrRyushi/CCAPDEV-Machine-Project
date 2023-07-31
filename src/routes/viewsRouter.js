import { Router } from 'express';
import { getDb } from '../db/conn.js';

const viewsRouter = Router();
const db = getDb();

// Middleware to check if the user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.email) {
      // If the user is logged in, proceed to the next middleware/route handler
      next();
    } else {
      // If the user is not logged in, redirect to the login page
      // res.redirect('/login');
    }
  };
  
  // Middleware for Student Authentication
  const isStudent = (req, res, next) => {
    if (req.session.accountType === 'Student') {
      next();
    } else {
      //res.status(403).send('Access denied. You are not authorized to access this page.');
      res.redirect('/student-view');
    }
  };
  
  // Middleware for Technician Authentication
  const isTechnician = (req, res, next) => {
    if (req.session.accountType === 'Technician') {
      next();
    } else {
      //res.status(403).send('Access denied. You are not authorized to access this page.');
      res.redirect('/technician-view');
    }
  };


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

viewsRouter.get('/student-view', isAuthenticated, isStudent, async (req, res) => {
    try {
        console.log("sesssion: " + req.session.accountType);
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
  
viewsRouter.get('/technician-view', isAuthenticated, isTechnician, (req, res) => {
    res.render('technician-view.ejs');
});

viewsRouter.get('/allreservations', isAuthenticated, isTechnician, (req, res) => {
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

  viewsRouter.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
          console.log('Error destroying session:', err);
      }
      res.redirect('/login');
  });
  })

export default viewsRouter;