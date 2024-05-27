import "dotenv/config"

import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
})
const massage = (mail, verificationToken) => {
  return {
    to: mail,
    from: "thedrankstar@gmail.com",
    subject: "Welcome to Phone Book!",
    html: `To confirm your email please click on the <a href="http://localhost:3000/api/users/verify/${verificationToken}">link</a>`,
    text: `To confirm your email please open the link http://localhost:3000/api/users/verify/${verificationToken}`,
  }
}
const verificationEmail = async (mail, verificationToken) => {
  const message = massage(mail, verificationToken)
  try {
    await transport.sendMail(message)
  } catch (error) {
    next(error)
  }
}

export default verificationEmail
