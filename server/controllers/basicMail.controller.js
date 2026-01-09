

const nodemailer = require('nodemailer')
const MailModel = require('../models/mail.model')



const sendBasicContactMail = async (req, res) => {
    const { userName, contact, subject, message } = req.body
    
    const mailData = new MailModel({ userName, contact, subject, message })

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.CONTACT_EMAIL_USER,
                pass: process.env.CONTACT_EMAIL_PASS,
            },
            logger: true,
            debug: true
        })

        const mailOptions = {
            from: process.env.CONTACT_EMAIL_USER,
            to: process.env.CONTACT_EMAIL_USER,
            bcc: mailData.contact,
            subject: `Testing New Mail Server from ${mailData.userName}`,
            html:
                `Testing`
        }
        await transporter.sendMail(mailOptions)
        console.log(mailData)
        return res.status(200).json({message: "Sent", info: mailData})
    } catch(error) {
        console.error("Failed", error)
        return res.status(500).json({message: "Failed"})
    }
}

module.exports = { sendBasicContactMail }