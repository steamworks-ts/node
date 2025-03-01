import bindings from "./bindings";

const steamworks = {
    /**
     *
     * @param {number|undefined} app_id The appid of your steam app. If appid is omitted, steam will try to find a steam_appid.txt or get it from the environment variable SteamAppId
     */
    init(app_id) {
        if(typeof app_id !== "number") {
            process.env['SteamAppId'] = app_id.toString()
        }

    }
}
/**
 *
 * @type {}
 * @private
 */
let _callbacksInterval = null;

export default steamworks;
