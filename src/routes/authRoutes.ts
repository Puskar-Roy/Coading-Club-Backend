import express, { Router, Request } from 'express';
import passport from '../controllers/authController';

interface CustomRequest extends Request {
  user?: unknown;
}
const router: Router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/dashboard',
    failureRedirect: 'http://localhost:5173/login',
  })
);
router.get('/login/sucess', async (req: CustomRequest, res) => {
  if (req.user) {
    console.log(req.user);
    res.status(200).json({ message: 'user Login', user: req.user });
  } else {
    res.status(400).json({ message: 'Not Authorized' });
  }
});

export default router;
