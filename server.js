
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/api/live-score', async (req, res) => {
    try {
        const response = await axios.get('https://api.example.com/v1/live-matches', {
            headers: {
                'X-RapidAPI-Key': 'YOUR_API_KEY_HERE',
                'X-RapidAPI-Host': 'api.example.com'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch live score" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
