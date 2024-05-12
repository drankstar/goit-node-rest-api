import jwt from "jsonwebtoken"

import Users from "../modals/users.js"

function authToken(req, res, next) {
  const authHeaders = req.headers.authorization

  if (typeof authHeaders === "undefined") {
    return res.status(401).send({ message: "Invalid token" })
  }

  const [bearer, token] = authHeaders.split(" ", 2)

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" })
    }
    try {
      const user = await Users.findById(decode.id)

      if (user === null) {
        return res.status(401).send({ message: "Not authorized" })
      }
      if (user.token !== token) {
        return res.status(401).send({ message: "Not authorized" })
      }

      req.user = {
        id: user._id,
      }

      next()
    } catch (error) {
      next(error)
    }
  })
}

export default authToken
