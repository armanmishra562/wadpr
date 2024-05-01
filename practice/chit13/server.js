const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
// mongoose.connect('mongodb+srv://arman2004562:arman123@cluster0.mon8uqa.mongodb.net/DEPT1?retryWrites=true&w=majority&appName=Cluster0', ()=>{
//     console.log('Db connected');
// });
mongoose.connect('mongodb+srv://arman2004562:arman123456@cluster0.mon8uqa.mongodb.net/DEPT1?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Define Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

// Define Model
const User = mongoose.model('User', userSchema);

// CRUD Operations
// Create
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete
app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
