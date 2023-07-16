import { Router } from 'express';

import registerRouter from './registerRouter.js';
import loginRouter from './loginRouter.js';
import roomsRouter from './roomsRouter.js';
import profileRouter from './profileRouter.js';
import viewsRouter from './viewsRouter.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('home.ejs') 
})

router.get('/home', (req, res) => {
    res.redirect("/");
})

router.get("/homepage", (req, res) => {
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