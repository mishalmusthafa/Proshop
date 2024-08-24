import express from 'express';
import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;

connectDB(); //connecting DB using mongoose;
const app = express();
app.get('/', (req, res) => {
    res.send('Api is running');
});

app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
