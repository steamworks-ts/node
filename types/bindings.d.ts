export default _bindings;
declare const _bindings: {
    SteamAPI_InitSafe: (paramsValue: unknown[]) => boolean;
    SteamAPI_RunCallbacks: (paramsValue: unknown[]) => boolean;
    SteamAPI_RegisterCallback: (paramsValue: unknown[]) => undefined;
    SteamAPI_RegisterCallResult: (paramsValue: unknown[]) => undefined;
    SteamAPI_ISteamUser_GetAuthTicketForWebApi: (paramsValue: unknown[]) => number;
    SteamAPI_ISteamUser_GetSteamID: (paramsValue: unknown[]) => number;
    SteamAPI_SteamUser_v023: (paramsValue: unknown[]) => import("ffi-rs").JsExternal;
};
//# sourceMappingURL=bindings.d.ts.map