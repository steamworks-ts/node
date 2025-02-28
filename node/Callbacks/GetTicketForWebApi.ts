import {arrayConstructor, DataType, FFITypeTag, RecordFieldType} from "ffi-rs";
import {CallbackKeys, createSteamCallback, SteamAPI_RegisterCallback} from "./index";


export type nodeType = {
    handle: number,
    result: number,
    length: number,
    ticket: Buffer
}

export const ffiType  : RecordFieldType= {
        handle: DataType.I32,
        result: DataType.I32,
        length: DataType.I32,
        ticket: arrayConstructor({
        type: DataType.U8Array,
        length: 2560,
        ffiTypeTag: FFITypeTag.StackArray
    }),
}

export type handlerType = (data: nodeType) => void;

export const CALLBACK_TYPE = CallbackKeys.GetTicketForWebApi;



export function registerHandler(func: handlerType) {
    const callback = createSteamCallback(ffiType, func);
    SteamAPI_RegisterCallback(callback, CALLBACK_TYPE);
}