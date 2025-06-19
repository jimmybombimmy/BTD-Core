import 'dotenv/config'

import passport from 'passport';
import express from 'express'
import session from './auth/session';
import './auth/auth'

// import { db } from './database/db';
// const client = await db.connect()
// client.release()


export const app: express.Express = express();

app.use(express.json())
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

export let sessionInfo: object | undefined;
export let passportInfo: object | undefined

app.use((req, res, next) => {
  sessionInfo = req.session
  passportInfo = req.user
  next()
})

app.get("/ping", (req, res) => {
  res.status(200).send({message: "pinged"})
})

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.get("/no", (req, res) => {
  res.send("Hell No World")
})

app.post('/login', async (req, res, next) => {
  await passport.authenticate('local', (err: object, user: object) => {
    if (!user) {
      res.redirect('/no')
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/')

    });
  })(req, res, next);
}
)

const PORT = process.env.PORT
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Auth Microservice listening on port ${PORT}`)
  })
}

// app.use(router)

