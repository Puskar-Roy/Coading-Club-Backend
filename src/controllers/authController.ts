import passport from 'passport';
import config from '../config/config';
import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';
import UserModel from '../models/userSchema';

passport.use(
  new OAuth2Strategy(
    {
      clientID: config.GOOGLE_ID,
      clientSecret: config.GOOGLE_SEC,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
          user = new UserModel({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
