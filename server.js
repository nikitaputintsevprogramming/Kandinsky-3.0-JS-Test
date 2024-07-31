import express from 'express';
import bodyParser from 'body-parser';
import { Text2ImageAPI } from './index.js'; // Импортируйте ваш класс Text2ImageAPI

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Подача статических файлов из папки 'public'

const api = new Text2ImageAPI('https://api-key.fusionbrain.ai/', '49DD740E7F41008F697EFE6E0B6A85E5', '4C1839187B9C923E8538B29EDA7FBD68');

app.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        const modelId = await api.getModels();
        const uuid = await api.generate(prompt, modelId);
        const images = await api.checkGeneration(uuid);
        const base64Image = images[0];
        res.json({ image: base64Image });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
