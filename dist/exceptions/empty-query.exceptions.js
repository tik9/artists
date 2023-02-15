export class EmptyQueryException extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'EmptyQueryError';
    }
}
