
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// প্রক্সি রুট যা রিকোয়েস্ট হ্যান্ডেল করবে
app.get('/', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).send('Missing "url" query parameter');
    }

    try {
        const response = await axios({
            method: 'get',
            url: targetUrl,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': new URL(targetUrl).origin
            },
            validateStatus: function (status) {
                return status >= 200 && status < 400;
            }
        });

        // অরিজিনাল হেডারগুলো ফরোয়ার্ড করা যাতে fMP4 বা m3u8 বুঝতে সমস্যা না হয়
        Object.keys(response.headers).forEach(header => {
            res.setHeader(header, response.headers[header]);
        });

        response.data.pipe(res);
    } catch (error) {
        console.error('Proxy error:', error.message);
        res.status(500).send('Failed to fetch the stream');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy Server is running on port ${PORT}`);
});
