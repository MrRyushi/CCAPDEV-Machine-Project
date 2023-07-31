import { Router } from 'express';

import registerRouter from './registerRouter.js';
import loginRouter from './loginRouter.js';
import roomsRouter from './roomsRouter.js';
import profileRouter from './profileRouter.js';
import viewsRouter from './viewsRouter.js';

const router = Router();

// Middleware to check if the user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.email) {
      // If the user is logged in, proceed to the next middleware/route handler
      next();
    } else {
      // If the user is not logged in, redirect to the login page
    res.redirect('/login');
    }
  };

router.get('/', isAuthenticated, (req, res) => {
    res.render('home.ejs') 
})

router.get('/home', isAuthenticated, (req, res) => {
    res.redirect("/");
})

router.get("/homepage", isAuthenticated, (req, res) => {
    res.redirect("/");
});

router.use(registerRouter);
router.use(loginRouter);
router.use(roomsRouter);
router.use(profileRouter);
router.use(viewsRouter);

router.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});

export default router;