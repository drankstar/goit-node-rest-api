import Contacts from "../modals/contact.js"

import HttpError from "../helpers/HttpError.js"

 const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.find()
    res.send(contacts)
  } catch (error) {
    next(error)
  }
}

 const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const contactId = await Contacts.findById(id)

    if (contactId === null) {
      next(HttpError(404))
    }
    res.send(contactId)
  } catch (error) {
    next(HttpError)
  }
}

 const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const contactId = await Contacts.findByIdAndDelete(id)
    if (contactId === null) {
      next(HttpError(404))
    }
    res.send(contactId)
  } catch (error) {
    next(HttpError)
  }
}

 const createContact = async (req, res, next) => {
  try {
    const ADDcontact = await Contacts.create(req.body)

    await res.send(ADDcontact)
  } catch (error) {
    next(HttpError)
  }
}

 const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!req.body.name && !req.body.email && !req.body.phone) {
      next(HttpError(400, "Body must have at least one field"))
    }

    const updateContact = await Contacts.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    if (updateContact === null) {
      return next(HttpError(404))
    }
    await res.send(updateContact)
  } catch (error) {
    next(HttpError)
  }
}
 const updateStatusContact = async (req, res) => {
  try {
    const { id } = req.params
    const updateStatusContact = await Contacts.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (updateStatusContact === null) {
      next(HttpError(404))
    }
    res.send(updateStatusContact)
  } catch (error) {
    next(HttpError)
  }
}
export default{
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
}