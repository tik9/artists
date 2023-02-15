import { Request, Response } from "express"
import { ArtistService } from "../services/artist.service"
import queryValidator from "../validators/query.validator"


export class ArtistController {
    static async search(req: Request, res: Response) {
        try {
            const { artist } = req.query
            queryValidator(artist)
            // console.log(artist)
            const data = await ArtistService.search(artist as string)
            const newdata = data.results.artistmatches.artist.map((elem: any) => ({ name: elem.name, url: elem.url, mbid: elem.mbid, image_small: elem.image.filter((img: any) => img.size === 'small') }))['#text']
            res.json(newdata)
        } catch (error: any) {
            console.error(error)
            res.status(400).send(error.message)
        }
    }
}