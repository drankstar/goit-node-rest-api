import "dotenv/config"
import path from "node:path"
import express from "express"
import morgan from "morgan"
import cors from "cors"

import contactsRouter from "./routes/contactsRouter.js"
import usersRoute from "./routes/usersRoute.js"
import "./db/contctsDB.js"

import authTokenMiddleware from "./middleware/authToken.js"

const app = express()

app.use(morgan("tiny"))
app.use(cors())
app.use(express.json())

app.use("/avatars", express.static(path.resolve("public/avatars")))

app.use("/api/users", usersRoute)
app.use("/api/contacts", authTokenMiddleware, contactsRouter)

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err
  res.status(status).json({ message })
})

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000")
})
