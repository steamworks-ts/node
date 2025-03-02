import bindings from "./bindings";
import {Client} from "./classes/Client.js";

class SteamWorks {
    static Client = Client;

    /**
     *
     * @param {number|undefined} app_id The appid of your steam app. If appid is omitted, steam will try to find a steam_appid.txt or get it from the environment variable SteamAppId
     */
    init(app_id) {
        if(typeof app_id !== "number") {
            process.env['SteamAppId'] = app_id.toString()
        }
        bindings.init();
        startRunCallbacks();
        return new Client();
    }

    /**
     *
     * @param {number} interval_ms Interval in ms which is used to call SteamAPI_RunCallbacks. Must be between 1 and 1000
     */
    setRunCallbacksInterval(interval_ms) {
        if(typeof interval_ms !== "number") {
            throw new TypeError('Interval has to be a number representing the delay in milliseconds')
        }
        interval_ms = Math.min(1000, Math.max(1));

        if(interval_ms !== _callbackIntervalDelay) {
            _callbackIntervalDelay = interval_ms;
            if(_callbacksInterval !== null) {
                startRunCallbacks();
            }
        }
    }

    /**
     * Enables GPU to allow steam to hook into render process to inject steamoverlay
     * @param {boolean} disableEachFrameInvalidation
     */
    async electronEnableSteamOverlay(disableEachFrameInvalidation = false) {
        /**
         *
         */
        const electron = (await import('electron'));
        if (!electron) {
            throw new Error('Electron module not found')
        }

        electron.app.commandLine.appendSwitch('in-process-gpu')
        electron.app.commandLine.appendSwitch('disable-direct-composition')

        if (!disableEachFrameInvalidation) {
            /** @param {electron.BrowserWindow} browserWindow */
            const attachFrameInvalidator = (browserWindow) => {
                browserWindow.steamworksRepaintInterval = setInterval(() => {
                    if (browserWindow.isDestroyed()) {
                        clearInterval(browserWindow.steamworksRepaintInterval)
                    } else if (!browserWindow.webContents.isPainting()) {
                        browserWindow.webContents.invalidate()
                    }
                }, 1000 / 60)
            }

            electron.BrowserWindow.getAllWindows().forEach(attachFrameInvalidator)
            electron.app.on('browser-window-created', (_, bw) => attachFrameInvalidator(bw))
        }
    }
}
/**
 *
 * @type {NodeJS.Timeout|number|null}
 * @private
 */
let _callbacksInterval = null;
/**
 *
 * @type {number}
 * @private
 */
let _callbackIntervalDelay = 33;


function startRunCallbacks() {
    clearInterval(_callbacksInterval);
    _callbacksInterval = setInterval(
        () => bindings.SteamAPI_RunCallbacks([]),
        _callbackIntervalDelay
    );
}

export default SteamWorks;
