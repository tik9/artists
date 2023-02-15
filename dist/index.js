import express from 'express';
import { ArtistController } from './controllers/artists.controllers';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.get('/', (req, res) => {
    ArtistController.search(req, res);
});
app.listen(3000, () => {
    console.log('runs');
});
