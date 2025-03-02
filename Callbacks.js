import {createPointer, DataType, FieldType, funcConstructor, JsExternal} from "ffi-rs";

/**
 *
 * @param {FieldType} type
 * @param {Function} func
 * @returns {JsExternal}
 */
export function createSteamCallback(type, func) {
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