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


const promises = {
    getAuthTicketForWebApi: [] as PromiseWithResolvers<GetAuthTicketForWebApiResponse>[]
};


class GetAuthTicketForWebApiResponse {
    #buffer: Buffer;
    constructor(data: nodeType) {
        this.#buffer = Uint8Array.prototype.slice.call(data.ticket, 0, data.length);
    }

    get bytes() {
        return Buffer.from(this.#buffer)
    }

    get hex() {
        return this.#buffer.toString('hex');
    }


}

export class ISteamUser {
    #client: SteamAPI;
    #self: JsExternal;
    constructor(client: SteamAPI) {
        this.#client = client;
        this.#self = _binding.SteamAPI_SteamUser_v023([]);

        registerHandler(function TicketHandler(data: nodeType) {
            promises.getAuthTicketForWebApi.forEach(p => p.resolve(new GetAuthTicketForWebApiResponse(data)));
            promises.getAuthTicketForWebApi = [];
        })

    }


    getAuthTicketForWebApi(identity: string): Promise<GetAuthTicketForWebApiResponse> {
        let promise = Promise.withResolvers<GetAuthTicketForWebApiResponse>();
        const handle = _binding.SteamAPI_ISteamUser_GetAuthTicketForWebApi([this.#self, identity]);
        if(handle === 0) {
            promise.reject();
        } else {
            promises.getAuthTicketForWebApi.push(promise);
        }

        return promise.promise;
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