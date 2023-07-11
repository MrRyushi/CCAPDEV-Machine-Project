import { Router } from 'express';
import { getDb } from '../db/conn.js';
import express from 'express';

const roomsRouter = Router();
const db = getDb();

roomsRouter.use(express.urlencoded({ extended: false }));
roomsRouter.use(express.json());

roomsRouter.get('/api/cl01', async (req, res) => {
  try {
    const cl01Data = await db.collection('cl01').find().toArray();
    res.json(cl01Data);
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

roomsRouter.get('/cl01', async (req, res) => {
  try {
    const cl01Data = await db.collection('cl01').find().toArray();
    res.render('cl01.ejs', { cl01Data });
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

roomsRouter.get('/api/cl02', async (req, res) => {
  try {
    const cl02Data = await db.collection('cl02').find().toArray();
    res.json(cl02Data);
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

roomsRouter.get('/cl02', async (req, res) => {
  try {
    const cl02Data = await db.collection('cl02').find().toArray();
    res.render('cl02.ejs', { cl02Data });
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
})

roomsRouter.get('/api/cl03', async (req, res) => {
  try {
    const cl03Data = await db.collection('cl03').find().toArray();
    res.json(cl03Data);
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

roomsRouter.get('/cl03', async (req, res) => {
  try {
    const cl03Data = await db.collection('cl03').find().toArray();
    res.render('cl03.ejs', { cl03Data });
  } catch (error) {
    console.log('Error retrieving data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
})
roomsRouter.post('/room', async (req, res) => {
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
      email: req.body.email,
      date: req.body.date,
      time: req.body.time, 
      seatSelected: req.body.seatSelected,
      dateReq: req.body.dateReq
    });
    console.log(insertResult);
  }
})

roomsRouter.post('/getAccount', async (req, res) => {
  try {
    const email = req.body.email; // Get the email from the request body
    const labAccount = await db.collection('labAccounts').findOne({ email: email });
    console.log("Account retrieved:", labAccount);
    res.json(labAccount); // Send the labAccount data as a response
    
  } catch (error) {
    console.log('Error retrieving account from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default roomsRouter;