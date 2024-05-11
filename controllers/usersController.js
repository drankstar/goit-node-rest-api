import Users from "../modals/users"

async function registrarion(req, res, next) {
  const { name, email, password } = req.body
  try {
    const registrated = Users.create({ name, email, password })
    console.log(registrated)
    res.send("")
  } catch (error) {
    next(error)
  }
}
export default {
  registrarion,
}
