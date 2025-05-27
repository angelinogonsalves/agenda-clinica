// Importing required modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import appointmentRoutes from '../routes/appointmentRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Register appointment routes
app.use('/api/appointments', appointmentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});