import "./bindings";
import {DataType, define, FuncConstructorOptions, JsExternal, unwrapPointer, wrapPointer} from "ffi-rs";
import {ISteamUser} from "./ISteamUser";


let instance: SteamAPI|null = null;
export class SteamAPI {
    private constructor() {
        console.log('SteamAPI Client initiated');
    }

    static init_app(appId: number) {
        process.env["SteamAppId"] = appId.toString();
        if(!_bindings.SteamAPI_InitSafe([]))
            throw new Error('SteamAPI could not init');
        return instance ?? (instance = new SteamAPI());
    }

    #isteamuser: ISteamUser;
    get steamuser(): ISteamUser {
        if(!this.#isteamuser) {
            this.#isteamuser = new ISteamUser(this);
        }
        return this.#isteamuser;
    }

    runCallbacks() {
        _bindings.SteamAPI_RunCallbacks([]);
    }
}

const _bindings = define(
    {
        "SteamAPI_InitSafe": {
            library: "steamworks",
            retType: DataType.Boolean,
            paramsType: [],
        },
        "SteamAPI_RunCallbacks": {
            library: "steamworks",
            retType: DataType.Boolean,
            paramsType: []
        },

})