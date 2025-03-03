export default steamworks;
declare namespace steamworks {
    export { Client };
    /**
     *
     * @param {number|undefined} app_id The appid of your steam app. If appid is omitted, steam will try to find a steam_appid.txt or get it from the environment variable SteamAppId
     */
    export function init(app_id: number | undefined): Client;
    /**
     *
     * @param {number} interval_ms Interval in ms which is used to call SteamAPI_RunCallbacks. Must be between 1 and 1000
     */
    export function setRunCallbacksInterval(interval_ms: number): void;
    export function electronEnableSteamOverlay(disableEachFrameInvalidation?: boolean): void;
}
import { Client } from "./classes/Client.js";
//# sourceMappingURL=index.d.ts.map