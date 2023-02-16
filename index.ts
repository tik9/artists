import express, { Express, Request, Response } from 'express'
import { ArtistController } from './controllers/artists.controllers'
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()

app.get('/', (req: Request, res) => { ArtistController.search(req, res) })

app.listen(3000, () => { console.log('runs') })