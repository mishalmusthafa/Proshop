import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;

connectDB(); //connecting DB using mongoose;
const app = express();
app.get('/', (req, res) => {
    res.send('Api is running');
});

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Paypal route
app.get('/api/config/paypal', (req, res) =>
    // This way we dont wanna pass clientid through frontend to the paypal
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
