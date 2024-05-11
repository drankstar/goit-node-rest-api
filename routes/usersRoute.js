import express from "express"
import usersController from "../controllers/usersController"

const usersRoute = express.Router()

const jsonParcer = express.json()

usersRoute.post("/registration", jsonParcer, usersController.registrarion)

export default usersRoute
