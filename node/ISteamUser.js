"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISteamUser = void 0;
const ffi_rs_1 = require("ffi-rs");
const GetTicketForWebApi_1 = require("./Callbacks/GetTicketForWebApi");
const GetTicketForWebApiResponse_t = {
    handle: ffi_rs_1.DataType.I32,
    result: ffi_rs_1.DataType.I32,
    length: ffi_rs_1.DataType.I32,
    ticket: (0, ffi_rs_1.arrayConstructor)({
        type: ffi_rs_1.DataType.U8Array,
        length: 2560,
        ffiTypeTag: ffi_rs_1.FFITypeTag.StackArray
    }),
};
class ISteamUser {
    #client;
    #self;
    constructor(client) {
        this.#client = client;
        this.#self = _binding.SteamAPI_SteamUser_v023([]);
        (0, GetTicketForWebApi_1.registerHandler)(function TicketHandler(data) {
            console.log(data);
            console.log(data.ticket.slice(0, data.length).toString('hex'));
        });
    }
    getAuthTicketForWebApi(identity) {
        console.log(_binding.SteamAPI_ISteamUser_GetAuthTicketForWebApi([this.#self, identity]));
    }
    getSteamId() {
        return _binding.SteamAPI_ISteamUser_GetSteamID([this.#self]);
    }
}
exports.ISteamUser = ISteamUser;
const _binding = (0, ffi_rs_1.define)({
    "SteamAPI_ISteamUser_GetAuthTicketForWebApi": {
        paramsType: [ffi_rs_1.DataType.External, ffi_rs_1.DataType.String],
        retType: ffi_rs_1.DataType.I64,
        library: "steamworks"
    },
    "SteamAPI_ISteamUser_GetSteamID": {
        paramsType: [ffi_rs_1.DataType.External],
        retType: ffi_rs_1.DataType.I64,
        library: "steamworks"
    },
    "SteamAPI_SteamUser_v023": {
        paramsType: [],
        retType: ffi_rs_1.DataType.External,
        library: "steamworks"
    }
});
