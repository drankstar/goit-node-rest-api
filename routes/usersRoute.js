import express from "express"
import usersController from "../controllers/usersController.js"
import validateBody from "../helpers/validateBody.js"
import { registerUserSchema } from "../schemas/userSchema"
import { loginSchema } from "../schemas/userSchema"
import authToken from "../middleware/authToken.js"
import upload from "../middleware/upload.js"

const usersRoute = express.Router()

const jsonParcer = express.json()

usersRoute.post(
  "/registration",
  jsonParcer,
  validateBody(registerUserSchema),
  usersController.registrarion
)
usersRoute.post(
  "/login",
  jsonParcer,
  validateBody(loginSchema),
  usersController.login
)
usersRoute.post("/logout", authToken, usersController.logout)

usersRoute.get("/current", authToken, usersController.current)
usersRoute.patch(
  "/avatars",
  authToken,
  upload.single("avatars"),
  usersController.updateAvatar
)

export default usersRoute
