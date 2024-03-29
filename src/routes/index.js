// import router from express
import { Router } from 'express';

// import the other routers from other file
import registerRouter from './registerRouter.js';
import loginRouter from './loginRouter.js';
import roomsRouter from './roomsRouter.js';
import profileRouter from './profileRouter.js';
import viewsRouter from './viewsRouter.js';

const router = Router();

  router.get('/', (req, res) => {
    // Check if the user is authenticated
    if (req.session.email) {
      // Check the user's accountType and redirect accordingly
      if (req.session.accountType === 'Student') {
        res.redirect('/student-view');
      } else if (req.session.accountType === 'Technician') {
        res.redirect('/technician-view');
      } else {
        // For any other account types, you can decide what to do or redirect them to a default view.
        res.redirect('/'); // You may redirect to a default view like '/dashboard' or handle it differently
      }
    } else {
      // If the user is not authenticated, render the 'home.ejs' view directly
      res.render('home.ejs');
    }
  });

  router.get('/home', (req, res) => {
    res.redirect('/');
  });

  router.get("/homepage", (req, res) => {
    res.redirect('/');
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