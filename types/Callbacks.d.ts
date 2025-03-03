/**
 *
 * @param {import("ffi-rs").FieldType} type
 * @param {Function} func
 * @returns {import("ffi-rs").JsExternal}
 */
export function createSteamCallback(type: import("ffi-rs").FieldType, func: Function): import("ffi-rs").JsExternal;
/**
 *
 * @param {import("ffi-rs").JsExternal} ptrToHandler
 * @param {number} key
 */
export function registerCallback(ptrToHandler: import("ffi-rs").JsExternal, key: number): void;
export namespace CallbackKeys {
    let GetTicketForWebApi: number;
}
//# sourceMappingURL=Callbacks.d.ts.map