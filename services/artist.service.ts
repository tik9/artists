export class ArtistService {

    static async search(artist: string) {
        var url = 'https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + artist + '&api_key=' + process.env.lastfm + '&format=json'
        return await (await fetch(url)).json()
    }
}