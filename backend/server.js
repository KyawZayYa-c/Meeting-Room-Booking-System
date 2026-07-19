const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();

const seedAdmin = require('./seed');
const { globalErrorHandler, notFoundHandler } = require('./src/utils/errorHandler');
const { Msg } = require('./src/utils/responseHelper');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const summaryRoutes = require('./src/routes/summaryRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/summary', summaryRoutes);

app.get('/', (req, res) => {
    Msg(res, 'Meeting Room Booking System API is running', {}, 200);
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/meeting-room-booking')
    .then(async () => {
        console.log('✅ Connected to MongoDB');
        await seedAdmin();
        //Server ready start
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    });