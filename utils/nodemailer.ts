import nodemailer from "nodemailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport";
const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT),
    secure: false,
    auth: {
      user:  process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASS,
    },
});

export const sendMail =  async (to:string, subject: string, text : string, html: string ) : Promise<SMTPTransport.SentMessageInfo> => {
    let enveloppe = await transporter.sendMail({
        from: '"Tosia & Karel" <karel@tosiaenkarel.be>', // sender address
        to,
        subject,
        text,
        html
      });

return enveloppe
}