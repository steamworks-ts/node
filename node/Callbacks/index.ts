import {
    createPointer,
    DataType,
    define,
    FieldType,
    funcConstructor,
    JsExternal,
    wrapPointer
} from "ffi-rs";


export enum CallbackKeys {
    GetTicketForWebApi = 168
}




const bindings = define(
    {
        "SteamAPI_RegisterCallback": {
            library: "steamworks",
            retType: DataType.Void,
            paramsType: [DataType.External, DataType.I32]
        },
        "SteamAPI_RegisterCallResult": {
            library: "steamworks",
            retType: DataType.Void,
            paramsType: [DataType.External, DataType.I32]
        }
    });

export function SteamAPI_RegisterCallback(ptrToHandler: JsExternal, key: CallbackKeys|number) {
    bindings.SteamAPI_RegisterCallback([...wrapPointer([ptrToHandler]), key]);
}


export function createSteamCallback(type: FieldType, func: Function) {
    return createPointer(
        {
            paramsType: [
                funcConstructor({
                    paramsType: [{
                        _1: DataType.I32,
                        _2: DataType.I32,
                        result: DataType.I32,
                        id: DataType.I32,
                    }, type],
                    retType: DataType.Void
                })
            ],
            paramsValue: [(meta, data) => func(data)]
        }
    )[0]
}