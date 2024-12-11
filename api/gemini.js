const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        console.log('Invalid request method:', req.method);
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    const { input } = req.body;
    if (!input) {
        console.log('Missing input data in request body.');
        return res.status(400).json({ error: 'Input data is required.' });
    }

    try {
        const response = await axios.post(
            'https://api.gemini.com/v1/analyze',
            { input },
            {
                headers: {
                    'Authorization': `Bearer ${GEMINI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.log('Error communicating with Gemini API:', error.message);
        res.status(500).json({ error: 'Failed to process the request.' });
    }
};
