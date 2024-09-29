import nodemailer from 'nodemailer';
import { config } from 'dotenv'; 
config({ path: './.env' });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: `${process.env.USER}`,
        pass: `${process.env.PASS}`
    },
});

const sendMail = async (email, name, message) => {
    const mailOptions = {
        from: {
            name: 'Portfoloo',
            address: `${process.env.USER}`
        },
        to: 'anishunique900@gmail.com', 
        subject: 'Portfolio',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                <h2 style="color: #333;">New Portfolio Message</h2>
                <p style="color: #555;"><strong>Name:</strong> ${name}</p>
                <p style="color: #555;"><strong>Email:</strong> ${email}</p>
                <p style="color: #555;"><strong>Message:</strong></p>
                <p style="background-color: #fff; padding: 10px; border-radius: 5px; border: 1px solid #ddd;">${message}</p>
                <p style="color: #777;">Thank you for reaching out!</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.log('Error sending email:', error);
    }
};

export { sendMail };
