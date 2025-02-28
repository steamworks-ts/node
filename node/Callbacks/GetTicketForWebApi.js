"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CALLBACK_TYPE = exports.ffiType = void 0;
exports.registerHandler = registerHandler;
const ffi_rs_1 = require("ffi-rs");
const index_1 = require("./index");
exports.ffiType = {
    handle: ffi_rs_1.DataType.I32,
    result: ffi_rs_1.DataType.I32,
    length: ffi_rs_1.DataType.I32,
    ticket: (0, ffi_rs_1.arrayConstructor)({
        type: ffi_rs_1.DataType.U8Array,
        length: 2560,
        ffiTypeTag: ffi_rs_1.FFITypeTag.StackArray
    }),
};
exports.CALLBACK_TYPE = index_1.CallbackKeys.GetTicketForWebApi;
function registerHandler(func) {
    const callback = (0, index_1.createSteamCallback)(exports.ffiType, func);
    (0, index_1.SteamAPI_RegisterCallback)(callback, exports.CALLBACK_TYPE);
}
