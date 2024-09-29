import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import { sendMail } from './mail.js';

config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await sendMail(email, name, message);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (err) {
        // console.error('Error sending email:', err); 
        res.status(500).json({ message: 'Server error, please try again later.' });
    }


});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
