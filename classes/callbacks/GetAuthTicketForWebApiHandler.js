import {arrayConstructor, DataType, FFITypeTag, wrapPointer} from "ffi-rs";
import {CallbackKeys, createSteamCallback, registerCallback} from "../../Callbacks.js";
import {Ticket} from "../Ticket.js";


/**
 * @typedef {handle: number, result: number, length: number, ticket: Buffer} getAuthTicketForWebApiNodeType
 */


/**
 *
 * @type {import("ffi-rs").RecordFieldType}
 */
export const ffiType= {
    handle: DataType.I32,
    result: DataType.I32,
    length: DataType.I32,
    ticket: arrayConstructor({
        type: DataType.U8Array,
        length: 2560,
        ffiTypeTag: FFITypeTag.StackArray
    }),
}

export const CALLBACK_KEY = CallbackKeys.GetTicketForWebApi;

/**
 *
 * @type {Map<number, PromiseWithResolvers>}
 */
const getAuthTicketForWebApiHandlerMap = new Map();

/**
 *
 * @param {number} handle
 * @param {PromiseWithResolvers} promise
 * @constructor
 */
export function registerAuthTicketForWebApiHandle(handle, promise) {
    if(callback === null) {
        console.log('registering callback for getAuthTicketForWebApi');

        callback = createSteamCallback(ffiType,
            /**
             *
             * @param {getAuthTicketForWebApiNodeType} data
             */
            (data) => {
                console.log(data);
                if(getAuthTicketForWebApiHandlerMap.has(data.handle)) {
                    getAuthTicketForWebApiHandlerMap.get(data.handle).resolve(new Ticket(data));
                    getAuthTicketForWebApiHandlerMap.delete(data.handle);
                }
            });

        global.callbacks = callback;
        registerCallback(callback, CALLBACK_KEY)
    }
    getAuthTicketForWebApiHandlerMap.set(handle, promise);
}

/**
 *
 * @type {import("ffi-rs").JsExternal}
 */
let callback = null;
