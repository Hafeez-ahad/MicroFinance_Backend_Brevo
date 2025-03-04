import { sender, transporter } from "./mailtrap.js";

 export const sendEmailBrevo = async(email,password)=>{
    await transporter.sendMail({
     from: `${sender.name} <${sender.email}>`, 
     to: email,
     subject: "Email send ✔ ",
     html: `
     <h1>Your Password ${password}</h1>
     `,
   });
 }  

