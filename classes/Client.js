import {ClientAuth} from "./ClientAuth.js";


export class Client {


    /**
     *
     * @type {ClientAuth}
     */
    #_swjsAuth = null;

    /**
     *
     * @returns {ClientAuth}
     */
    get auth() {
        if(this.#_swjsAuth === null) {
            this.#_swjsAuth = new ClientAuth();
        }
        return this.#_swjsAuth;
    }
}