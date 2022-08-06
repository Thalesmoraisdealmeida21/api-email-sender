const express = require('express');
const app = express();
const cors = require('cors')
const nodemailer = require("nodemailer");
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.post('/sendmail/:toEmail', async (request, response) => {
    const subject = request.body.subject
    const toEmail = request.params.toEmail
    const from = request.body.from
    const text = request.body.text
    const html = request.body.html

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SMTP,
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    
      let info = await transporter.sendMail({
        from: from,
        to: toEmail, 
        subject: subject, 
        text: text, 
        html: html, 
      });
    
      response.json({"status": "ok", "message": "sended", "idMessage": info.response}) 
})


app.listen('3000', () => {
    
    console.log("Server is started")
})





