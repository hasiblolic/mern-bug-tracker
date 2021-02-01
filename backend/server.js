import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// importing routes
import trackerRoutes from './routes/trackers.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// routes being used
app.use('/api/trackers', trackerRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});