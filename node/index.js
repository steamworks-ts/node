"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SteamAPI = void 0;
require("./bindings");
const ffi_rs_1 = require("ffi-rs");
const ISteamUser_1 = require("./ISteamUser");
let instance = null;
class SteamAPI {
    constructor() {
        console.log('SteamAPI Client initiated');
    }
    static init_app(appId) {
        process.env["SteamAppId"] = appId.toString();
        if (!_bindings.SteamAPI_InitSafe([]))
            throw new Error('SteamAPI could not init');
        return instance ?? (instance = new SteamAPI());
    }
    #isteamuser;
    get steamuser() {
        if (!this.#isteamuser) {
            this.#isteamuser = new ISteamUser_1.ISteamUser(this);
        }
        return this.#isteamuser;
    }
    runCallbacks() {
        _bindings.SteamAPI_RunCallbacks([]);
    }
}
exports.SteamAPI = SteamAPI;
const _bindings = (0, ffi_rs_1.define)({
    "SteamAPI_InitSafe": {
        library: "steamworks",
        retType: ffi_rs_1.DataType.Boolean,
        paramsType: [],
    },
    "SteamAPI_RunCallbacks": {
        library: "steamworks",
        retType: ffi_rs_1.DataType.Boolean,
        paramsType: []
    },
});
