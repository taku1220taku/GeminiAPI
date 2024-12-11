document.getElementById('api-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = document.getElementById('user-input').value.trim();
    if (!input) {
        alert('Please enter a valid query.');
        return;
    }

    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        const output = data.candidates[0]?.content?.parts[0]?.text || 'No result found.';
        document.getElementById('output').textContent = output;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').textContent = 'An error occurred. Please try again.';
    }
});
