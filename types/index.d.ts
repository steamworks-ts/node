export default SteamWorks;
declare class SteamWorks {
    static Client: typeof Client;
    /**
     *
     * @param {number|undefined} app_id The appid of your steam app. If appid is omitted, steam will try to find a steam_appid.txt or get it from the environment variable SteamAppId
     */
    static init(app_id: number | undefined): Client;
    /**
     *
     * @param {number} interval_ms Interval in ms which is used to call SteamAPI_RunCallbacks. Must be between 1 and 1000
     */
    static setRunCallbacksInterval(interval_ms: number): void;
    /**
     * Enables GPU to allow steam to hook into render process to inject steamoverlay
     * @param {boolean} disableEachFrameInvalidation
     */
    static electronEnableSteamOverlay(disableEachFrameInvalidation?: boolean): Promise<void>;
}
import { Client } from "./classes/Client.js";
//# sourceMappingURL=index.d.ts.map