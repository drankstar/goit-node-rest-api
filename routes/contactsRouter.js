import express from "express"
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js"
import validateBody from "../helpers/validateBody.js"
import {
  createContactSchema,
  updateContactSchema,
  updateFavorite,
} from "../schemas/contactsSchemas.js"

const contactsRouter = express.Router()
const jsonParcer = express.json()

contactsRouter.get("/", getAllContacts)

contactsRouter.get("/:id", getOneContact)

contactsRouter.delete("/:id", deleteContact)

contactsRouter.post(
  "/",
  jsonParcer,
  validateBody(createContactSchema),
  createContact
)

contactsRouter.put(
  "/:id",
  jsonParcer,
  validateBody(updateContactSchema),
  updateContact
)
contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavorite),
  updateStatusContact
)

export default contactsRouter
