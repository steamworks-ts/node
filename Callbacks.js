import {createPointer, DataType, funcConstructor, unwrapPointer, wrapPointer} from "ffi-rs";
import bindings from "./bindings.js";




/**
 *
 * @param {import("ffi-rs").FieldType} type
 * @param {Function} func
 * @returns {import("ffi-rs").JsExternal}
 */
export function createSteamCallback(type, func) {
    return createPointer(
        {
            paramsType: [
                funcConstructor({
                    paramsType: [{
                        _anything: {},
                        result: DataType.I32,
                        id: DataType.I32,
                    }, type],
                    retType: DataType.Void
                })
            ],
            paramsValue: [(meta, data) => {
                console.log('callback called', meta)
                func(data)
            }]
        }
    )[0]
}

export const CallbackKeys = {
    GetTicketForWebApi: 168
}

/**
 *
 * @param {import("ffi-rs").JsExternal} ptrToHandler
 * @param {number} key
 */
export function registerCallback(ptrToHandler, key) {
    console.log('register Callback', ptrToHandler, key);
    bindings.SteamAPI_RegisterCallback([...wrapPointer([ptrToHandler]), 168]);
}