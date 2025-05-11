const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test');
const { connectDB } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));