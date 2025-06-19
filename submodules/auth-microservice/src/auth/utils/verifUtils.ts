import express from "express"

export const isAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({message: "Error 401: User Authorization invalid"})
  }
}