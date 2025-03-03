import bindings from "../bindings.js";
import {registerAuthTicketForWebApiHandle} from "./callbacks/GetAuthTicketForWebApiHandler.js";

export class ClientAuth {









    get #ISteamUser() {
        return bindings.SteamAPI_SteamUser_v023([]);
    }



    /**
     *
     * @param {string} identity
     * @returns {Promise<Ticket>}
     */
    getAuthTicketForWebApi(identity) {
        const handler = bindings.SteamAPI_ISteamUser_GetAuthTicketForWebApi([this.#ISteamUser, identity])
        if(handler === 0) {
            throw new Error(`Couldn't get handle for GetAuthTicketForWebApi`);
        }
        console.log('getAuthTicketForWebApi', identity, handler);
        /**
         *
         * @type {PromiseWithResolvers<Ticket>}
         */
        const promise = Promise.withResolvers();
        registerAuthTicketForWebApiHandle(handler, promise);
        return promise.promise;
    }
}