import { Request, Response } from "express"
import { ArtistService } from "../services/artist.service"
import queryValidator from "../validators/query.validator"
import { promises as fs } from 'fs'
import { resolve } from 'path'

export class ArtistController {
    static async search(req: Request, res: Response) {
        try {
            const { artist, csvname } = req.query
            queryValidator(artist)
            queryValidator(csvname)
            let data = (await ArtistService.search(artist as string)).results.artistmatches.artist
            if (data.length === 0) data = (await this.readJson()).map(elem => ({ name: elem }))

            this.csv(data.map((elem: any) => Object.values({ name: elem.name, url: elem.url, mbid: elem.mbid, image_small: elem.image?.filter((img: any) => img.size === 'small')[0]['#text'] })), csvname as string)
            res.send('ok')
        } catch (error: any) {
            console.error(error)
            res.status(400).send(error.message)
        }
    }

    static async readJson() { return JSON.parse(await fs.readFile(resolve('public', 'artists.json'), 'utf-8')) as [] }

    static csv(arr: any, name: string) {
        arr.unshift(['name', 'url', 'mbid', 'image_small'])
        let csvContent = '';
        arr.forEach((elem: any) => {
            const row = elem.join(',');
            csvContent += `${row}\r\n`;
        });
        fs.writeFile(resolve('public', `${name}.csv`), csvContent)

        return (csvContent)
    }
}