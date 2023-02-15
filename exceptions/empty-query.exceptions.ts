export class EmptyQueryException extends Error {
    constructor(msg: string) {
        super(msg)

        this.name = 'EmptyQueryError'
    }
}