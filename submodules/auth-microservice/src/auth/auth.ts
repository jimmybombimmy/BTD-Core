import { Strategy as LocalStrategy } from "passport-local";

import { db } from "../database/db"
import passport from "passport";
import { validPassword } from "./utils/passwordUtils";

const customFields = {
  usernameField: 'username',
  passwordField: 'password',
}
// eslint-disable-next-line -- imported "done"
const verifyCallback = async (username: string, password: string, done: any) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username.toLowerCase()])
    if (result.rows.length === 0) {
      return done(null, false);
    }

    const user = result.rows[0];
    if (validPassword(password, user.hash, user.salt)) {
      return done(null, user)
    } else {
      return done(null, false)
    }

  } catch (err) {
    return done(err);
  }
}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

// eslint-disable-next-line -- no alt for user
passport.serializeUser<null>((user: any, done) => {
  return done(null, user._id)
})

passport.deserializeUser(async (userId: string, done) => {
  await db.query(`SELECT * FROM users WHERE id = $1`, [userId])
    .then(({ rows }) => {
      if (rows[0]) {
        done(null, rows[0])
      } else {
        done(new Error("No user -- change this error in deserialise user"))
      }
    })
})
