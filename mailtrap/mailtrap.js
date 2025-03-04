import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config()

// export const transporter = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 587,
//     // service: 'gmail', // Use Gmail's SMTP service
//     auth: {
//       user: "0db4d5d4c3d46d",
//     pass:"af95f2b1a221ee"  
//     },
//   });

  export const sender = {
    email: "itxhafeez252@gmail.com",
    name:"hafeezullah"
  }

const BrevoPass = process.env.BREVO_PASS
const BrevoUser = process.env.BREVO_USER
  export const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587, // Use 465 for SSL
      secure: false, // true for port 465, false for others
      auth: {
        user: BrevoUser, // Your Brevo email
        pass:BrevoPass , // Your SMTP Key from Brevo
      },
    });
    