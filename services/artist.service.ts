export class ArtistService {

    static async search(artist: string) {
        return await (await fetch('https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + artist + '&api_key=' + process.env.lastfm + '&format=json')).json()
    }
}