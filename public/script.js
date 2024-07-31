document.getElementById('generate').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    if (!prompt) {
        alert('Please enter a prompt');
        return;
    }

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const imageUrl = `data:image/jpeg;base64,${result.image}`;
        
        document.getElementById('output').innerHTML = `<img src="${imageUrl}" alt="Generated Image" />`;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating the image');
    }
});
