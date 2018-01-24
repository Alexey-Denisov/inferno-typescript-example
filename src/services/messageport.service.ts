export class MessagePortService {
    private static _instance: MessagePortService;

    public value: number = 1;

    private constructor() {
        //...
    }

    public static get Instance() {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }
}