export default steamworks;
declare namespace steamworks {
    /**
     *
     * @param {number|undefined} app_id The appid of your steam app. If appid is omitted, steam will try to find a steam_appid.txt or get it from the environment variable SteamAppId
     */
    function init(app_id: number | undefined): any;
    /**
     *
     * @param {number} interval_ms Interval in ms which is used to call SteamAPI_RunCallbacks. Must be between 1 and 1000
     */
    function setRunCallbacksInterval(interval_ms: number): void;
    function electronEnableSteamOverlay(disableEachFrameInvalidation?: boolean): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map