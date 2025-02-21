// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'https://bajaj-financ-assingmen.netlify.app'], // Add your deployed frontend URL later
    methods: ['GET', 'POST'], // Allow only GET and POST methods
    allowedHeaders: ['Content-Type'], // Allow Content-Type header
    optionsSuccessStatus: 200 // For legacy browser support
  };
  
app.use(cors(corsOptions));
app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }

        const numbers = data.filter(item => !isNaN(item) && item !== '');
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        
        const highest_alphabet = alphabets.length > 0 ? 
            [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]] : [];

        res.status(200).json({
            is_success: true,
            user_id: "john_doe_17091999", // Replace with your full_name_ddmmyyyy
            email: "john@xyz.com",        // Replace with your college email
            roll_number: "ABCD123",       // Replace with your roll number
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: error.message
        });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        "message":"Welcome to backend"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});