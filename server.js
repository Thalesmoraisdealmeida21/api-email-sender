const express = require('express');
const app = express();
const cors = require('cors')
const nodemailer = require("nodemailer");
const axios = require('axios')
require('dotenv').config()


app.use(cors())
app.use(express.json())

app.post('/sendmail/:toEmail', async (request, resp) => {
    const subject = request.body.subject
    const toEmail = request.params.toEmail
    const from = request.body.from
    const text = request.body.text
    const html = request.body.html

    try {
      const response = await axios.post(
        'https://api.mailjet.com/v3/send',
         {
          'FromEmail': 'thales.morais21@gmail.com',
          'FromName': 'Your Mailjet Pilot',
          'Recipients': [
            {
              'Email': 'thales.morais21@gmail.com',
              'Name': 'Thales Morais'
            }
          ],
          'Subject': subject,
          'Text-part': text,
          'Html-part': html
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          auth: {
            username: 'a0d23373922398875c4288f6a02375a3',
            password: '455de2060099cbbf6d9213beb5e76c47'
          }
        }
      );

      resp.status(200).json({status: 'ok'})

    } catch(e) {
      console.log("Deu erro")
    }
    
})


app.listen('3000', () => {
    
    console.log("Server is started")
})





