import HttpError from "../helpers/HttpError.js"
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js"
import contactsService from "../services/contactsServices.js"

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts()
  res.send(contacts)
}

export const getOneContact = async (req, res, next) => {
  try {
    const contactId = await contactsService.getContactById(req.params.id)

    if (contactId === undefined) {
      next(HttpError(404))
    }
    res.send(contactId)
  } catch (error) {
    next(HttpError)
  }
}

export const deleteContact = async (req, res, next) => {
  try {
    const contactId = await contactsService.removeContact(req.params.id)
    if (contactId === null) {
      next(HttpError(404))
    }
    res.send(contactId)
  } catch (error) {
    next(HttpError)
  }
}

export const createContact = async (req, res, next) => {
  try {
    const newContact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    }
    const validationContact = createContactSchema.validate(newContact)
    if (typeof validationContact.error !== "undefined") {
      return res.status(400).send({ message: validationContact.error.message })
    }
    console.log(validationContact)
    const addedContact = await contactsService.addContact(
      validationContact.value.name,
      validationContact.value.email,
      validationContact.value.phone
    )
    await res.send(addedContact)
  } catch (error) {
    next(HttpError)
  }
}

export const updateContact = async (req, res, next) => {
  try {
    const updContact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    }
    if (!req.body.name && !req.body.email && !req.body.phone) {
      next(HttpError(400, "Body must have at least one field"))
    }
    const validationContact = updateContactSchema.validate(updContact)
    if (typeof validationContact.error !== "undefined") {
      return res.status(400).send({ message: validationContact.error.message })
    }

    const updateContact = await contactsService.updateContacts(
      validationContact.value,
      req.params.id
    )
    if (updateContact === null) {
      return next(HttpError(404))
    }
    await res.send(updateContact)
  } catch (error) {
    next(HttpError)
  }
}
