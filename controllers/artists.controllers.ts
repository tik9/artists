import { Request, Response } from "express"
import { ArtistService } from "../services/artist.service"
import queryValidator from "../validators/query.validator"
import { promises as fs } from 'fs'
import { resolve } from 'path'

export class ArtistController {
    static async search(req: Request, res: Response) {
        try {
            //  xssx
            const { artist } = req.query
            queryValidator(artist)
            const data = (await ArtistService.search(artist as string)).results.artistmatches.artist
            if (data.length === 0) {
                const newData = this.readJson()
                res.json(newData)
                return
            }

            const newData = data.map((elem: any) => ({ name: elem.name, url: elem.url, mbid: elem.mbid, image_small: elem.image.filter((img: any) => img.size === 'small')[0]['#text'] }))
            this.csv(newData)
            res.json(newData)
        } catch (error: any) {
            console.error(error)
            res.status(400).send(error.message)
        }
    }

    static async readJson() {
        const res = JSON.parse(await fs.readFile(resolve('public', 'artists.json'), 'utf-8'))
        return res
    }

    static csv(arr: any) {
        const array = [Object.keys(arr[0])].concat(arr)
        const res = array.map(it => { return Object.values(it).toString() }).join('\n')
        fs.writeFile(resolve('public', 'res.csv'), JSON.stringify(res))
        // return res
        // let csvContent = '';
        // data.forEach((elem: any) => {
        //     const row = elem.toString().join(',');
        //     csvContent += `${row}\r\n`;
        // });
        // return (csvContent)
    }
}