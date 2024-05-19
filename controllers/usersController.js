import Jimp from "jimp"
import Users from "../modals/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as fs from "node:fs/promises"
import path from "node:path"
import gravatar from "gravatar"

async function registrarion(req, res, next) {
  const { email, password } = req.body

  try {
    const userExist = await Users.findOne({ email })

    if (userExist !== null) {
      return res.status(409).send({ massage: "Email in use" })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const avatarURL = gravatar.url(email)

    await Users.create({ email, password: passwordHash })
    res
      .status(201)
      .send({ user: { email, subscription: "starter", avatarURL } })
  } catch (error) {
    next(error)
  }
}
async function login(req, res, next) {
  const { email, password } = req.body
  try {
    const user = await Users.findOne({ email })
    if (email === null) {
      return res.status(401).send({ massage: "Email or password is wrong" })
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch === false) {
      return res.status(401).send({ message: "Email or password is incorrect" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    })
    await Users.findByIdAndUpdate(user._id, { token })

    res.status(200).send({
      token,
      user: {
        email,
        subscription: "starter",
      },
    })
  } catch (error) {
    next(error)
  }
}

async function logout(req, res, next) {
  try {
    await Users.findByIdAndUpdate(req.user.id, { token: null })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
const current = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id)

    if (user === null) {
      return res.status(401).send({ message: "Not authorized" })
    }
    const currentUser = { email: user.email, subscription: user.subscription }
    return res.status(200).send(currentUser)
  } catch (error) {
    next(error)
  }
}
async function updateAvatar(req, res, next) {
  try {
    const { path: filePath, filename } = req.file

    const newPath = path.resolve("public/avatars", filename)

    const img = await Jimp.read(filePath)
    img.resize(250, 250).write(filePath)

    await fs.rename(filePath, newPath)

    const user = await Users.findByIdAndUpdate(
      req.user.id,
      { avatarURL: `/avatars/${filename}` },
      { new: true }
    )

    if (user === null) {
      return res.status(404).send({ message: "User not found" })
    }

    res.send(user)
  } catch (error) {
    next(error)
  }
}
export default {
  registrarion,
  login,
  logout,
  current,
  updateAvatar,
}
