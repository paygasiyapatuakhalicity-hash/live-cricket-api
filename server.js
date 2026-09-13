
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// আপনার লাইভ টিভির স্ট্রিম লিংক (m3u8 বা embed লিংক এখানে বসাবেন)
app.get('/api/live-tv', (req, res) => {
    const streamData = {
        channelName: "Live Cricket TV",
        streamUrl: "আপনার_লাইভ_টিভি_বা_m3u8_লিংক_এখানে_দিন"
    };
    res.json(streamData);
});

app.listen(PORT, () => {
    console.log(`Live TV Server is running on port ${PORT}`);
});
