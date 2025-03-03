import bindings from "./bindings.js";
import {Client} from "./classes/Client.js";


if(typeof Promise.withResolvers === 'undefined') {
    console.log('injecting Promise.withResolvers polyfill')
    Promise.withResolvers = function () {
        let resolve, reject
        const promise = new Promise((res, rej) => {
            resolve = res
            reject = rej
        })
        return { promise, resolve, reject }
    }
}

const steamworks = {

    Client,

    /**
     *
     * @param {number|undefined} app_id The appid of your steam app. If appid is omitted, steam will try to find a steam_appid.txt or get it from the environment variable SteamAppId
     */
    init(app_id) {
        if(typeof app_id !== "undefined") {
            app_id = parseInt(app_id);
            if(isNaN(app_id)) {
                throw new Error('AppId is NaN');
            }
            process.env['SteamAppId'] = app_id.toString()
        }
        if(!bindings.SteamAPI_InitSafe([])) {
            throw new Error('SteamAPI could not be initiated');
        }
        startRunCallbacks();




        return new Client();
    },

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
    },

    /**
     * Enables GPU to allow steam to hook into render process to inject steamoverlay
     * @param {boolean} disableEachFrameInvalidation
     */
    electronEnableSteamOverlay: (disableEachFrameInvalidation = false) => {
        /**
         *
         */
        import('electron').then((electron) => {
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
        })

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
 * @type {number}‚
 * @private
 */
let _callbackIntervalDelay = 100;


function startRunCallbacks() {
    clearInterval(_callbacksInterval);
    _callbacksInterval = setInterval(
        () => {
            bindings.SteamAPI_RunCallbacks([]);
        },
        _callbackIntervalDelay
    );
}


function sleep(i) {
    const p = Promise.withResolvers();
    setTimeout(p.resolve, i);
    return p.promise;
}



export default steamworks;
console.log(process.versions.node);