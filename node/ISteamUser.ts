import {SteamAPI} from "./index";
import {arrayConstructor, createPointer, DataType, define, FFITypeTag, funcConstructor, JsExternal} from "ffi-rs";
import {nodeType, registerHandler} from "./Callbacks/GetTicketForWebApi";





const GetTicketForWebApiResponse_t = {
    handle: DataType.I32,
    result: DataType.I32,
    length: DataType.I32,
    ticket: arrayConstructor({
        type: DataType.U8Array,
        length: 2560,
        ffiTypeTag: FFITypeTag.StackArray
    }),
}


export class ISteamUser {
    #client: SteamAPI;
    #self: JsExternal;
    constructor(client: SteamAPI) {
        this.#client = client;
        this.#self = _binding.SteamAPI_SteamUser_v023([]);

        registerHandler(function TicketHandler(data: nodeType) {
            console.log(data);
            console.log(data.ticket.slice(0, data.length).toString('hex'));

        })

    }


    getAuthTicketForWebApi(identity: string|null) {
        console.log(_binding.SteamAPI_ISteamUser_GetAuthTicketForWebApi([this.#self, identity]));

    }

    getSteamId() {
        return _binding.SteamAPI_ISteamUser_GetSteamID([this.#self]);
    }
}

const _binding = define({
    "SteamAPI_ISteamUser_GetAuthTicketForWebApi": {
        paramsType: [DataType.External, DataType.String],
        retType: DataType.I64,
        library: "steamworks"
    },
    "SteamAPI_ISteamUser_GetSteamID": {
        paramsType: [DataType.External],
        retType: DataType.I64,
        library: "steamworks"
    }
    ,
    "SteamAPI_SteamUser_v023": {
        paramsType: [],
        retType: DataType.External,
        library: "steamworks"
    }
})