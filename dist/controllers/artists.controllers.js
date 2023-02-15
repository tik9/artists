var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ArtistService } from "../services/artist.service";
import queryValidator from "../validators/query.validator";
export class ArtistController {
    static search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { artist } = req.query;
                queryValidator(artist);
                // console.log(artist)
                const data = yield ArtistService.search(artist);
                const newdata = data.results.artistmatches.artist.map((elem) => ({ name: elem.name, url: elem.url, mbid: elem.mbid, image_small: elem.image.filter((img) => img.size === 'small') }))['#text'];
                res.json(newdata);
            }
            catch (error) {
                console.error(error);
                res.status(400).send(error.message);
            }
        });
    }
}
