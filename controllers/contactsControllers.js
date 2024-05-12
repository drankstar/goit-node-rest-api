import Contacts from "../modals/contact.js"

import HttpError from "../helpers/HttpError.js"

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.find({ owner: req.user.id })
    res.send(contacts)
  } catch (error) {
    next(error)
  }
}

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const contactId = await Contacts.fi({ _id: id, owner: req.user.id })

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
    const contactId = await Contacts.findByIdAndDelete({
      _id: id,
      owner: req.user.id,
    })
    if (contactId === null) {
      next(HttpError(404))
    }
    res.send(contactId)
  } catch (error) {
    next(HttpError)
  }
}

const createContact = async (req, res, next) => {
  const contact = {
    ...req.body,
    owner: req.user.id,
  }

  try {
    const ADDcontact = await Contacts.create(contact)

    await res.send(ADDcontact)
  } catch (error) {
    next(HttpError)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = {
      ...req.body,
      owner: req.user.id,
    }

    if (!req.body.name && !req.body.email && !req.body.phone) {
      next(HttpError(400, "Body must have at least one field"))
    }

    const updateContact = await Contacts.findByIdAndUpdate(id, contact, {
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
export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
}
