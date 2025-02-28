"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackKeys = void 0;
exports.SteamAPI_RegisterCallback = SteamAPI_RegisterCallback;
exports.createSteamCallback = createSteamCallback;
const ffi_rs_1 = require("ffi-rs");
var CallbackKeys;
(function (CallbackKeys) {
    CallbackKeys[CallbackKeys["GetTicketForWebApi"] = 168] = "GetTicketForWebApi";
})(CallbackKeys || (exports.CallbackKeys = CallbackKeys = {}));
const bindings = (0, ffi_rs_1.define)({
    "SteamAPI_RegisterCallback": {
        library: "steamworks",
        retType: ffi_rs_1.DataType.Void,
        paramsType: [ffi_rs_1.DataType.External, ffi_rs_1.DataType.I32]
    },
    "SteamAPI_RegisterCallResult": {
        library: "steamworks",
        retType: ffi_rs_1.DataType.Void,
        paramsType: [ffi_rs_1.DataType.External, ffi_rs_1.DataType.I32]
    }
});
function SteamAPI_RegisterCallback(ptrToHandler, key) {
    bindings.SteamAPI_RegisterCallback([...(0, ffi_rs_1.wrapPointer)([ptrToHandler]), key]);
}
function createSteamCallback(type, func) {
    return (0, ffi_rs_1.createPointer)({
        paramsType: [
            (0, ffi_rs_1.funcConstructor)({
                paramsType: [{
                        _1: ffi_rs_1.DataType.I32,
                        _2: ffi_rs_1.DataType.I32,
                        result: ffi_rs_1.DataType.I32,
                        id: ffi_rs_1.DataType.I32,
                    }, type],
                retType: ffi_rs_1.DataType.Void
            })
        ],
        paramsValue: [(meta, data) => func(data)]
    })[0];
}
