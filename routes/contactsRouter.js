import express from "express"
import contactsController from "../controllers/contactsControllers.js"
import validateBody from "../helpers/validateBody.js"
import {
  createContactSchema,
  updateContactSchema,
  updateFavorite,
} from "../schemas/contactsSchemas.js"

const contactsRouter = express.Router()
const jsonParcer = express.json()

contactsRouter.get("/", contactsController.getAllContacts)

contactsRouter.get("/:id", contactsController.getOneContact)

contactsRouter.delete("/:id", contactsController.deleteContact)

contactsRouter.post(
  "/",
  jsonParcer,
  validateBody(createContactSchema),
  contactsController.createContact
)

contactsRouter.put(
  "/:id",
  jsonParcer,
  validateBody(updateContactSchema),
  contactsController.updateContact
)
contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavorite),
  contactsController.updateStatusContact
)

export default contactsRouter
