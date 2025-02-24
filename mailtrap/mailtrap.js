import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    // service: 'gmail', // Use Gmail's SMTP service
    auth: {
      user: "0db4d5d4c3d46d",
    pass:"af95f2b1a221ee"  
    },
  });

  export const sender = {
    email: "itxhafeez@gmail.com",
    name:"hafeezullah"
  }
  