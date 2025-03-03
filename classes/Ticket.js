export class Ticket {
    /**
     *
     * @param {import("./callbacks/GetAuthTicketForWebApiHandler.js").getAuthTicketForWebApiNodeType} data
     */
    constructor(data) {
        this.#bytes = Uint8Array.prototype.slice.call(data.ticket, 0, data.length);
    }

    /**
     * @type {Buffer}
     */
    #bytes;

    /**
     *
     * @returns {Buffer}
     */
    getBytes() {
        return this.#bytes;
    }


    cancel() {
        throw new Error('Not implemented');
    }
}