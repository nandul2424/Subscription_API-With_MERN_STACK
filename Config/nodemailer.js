import nodemailer from 'nodemailer';
import {EMAIL_PASSWORD, EMAIL_USER} from "./env.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:EMAIL_USER,
        pass:EMAIL_PASSWORD
    }
});

export const sendAccountCreatedEmail = async (toEmail, username) => {
    await transporter.sendMail({
        from: `"My App" <${EMAIL_USER}>`,
        to: toEmail,
        subject: "Account Created Successfully 🎉",
        html: `
      <h2>Welcome, ${username}!</h2>
      <p>Your account has been created successfully.</p>
      <p>We're glad to have you with us 💙</p>
    `,
    });
};

export const sendNewsletterResponseEmail = async (toEmail, name) => {
    await transporter.sendMail({
        from: `"My App" <${EMAIL_USER}>`,
        to: toEmail,
        subject: "Newsletter Message Received ✅",
        html: `
      <h2>Hey ${name},</h2>
      <p>Thanks for reaching out! Your message has been successfully sent.</p>
      <p>We'll get back to you soon.</p>
    `,
    });
};
