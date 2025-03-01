import {open, define} from "ffi-rs";
const { platform, arch } = process;


const mapping = {
    "win32": {
        "x64": ["win64/steam_api64.dll", "win64/steam_api64.lib"],
        "ia32": ["win64/steam_api.dll", "win64/steam_api.lib"]
    },
    "linux": {
        "x64": ["linux64/libsteam_api.so"],
        "ia32": ["linux32/libsteam_api.so"],
    },
    "darwin": {
        "x64": ["osx/libsteam_api.dylib"],
        "arm64": ["osx/libsteam_api.dylib"]
    }
}


if(typeof mapping[platform] === 'undefined') {
    throw new Error('platform not supported: ' + platform);
}
if(typeof mapping[platform][arch] === 'undefined') {
    throw new Error('arch not supported: ' + arch);
}
const binding = mapping[platform][arch];
console.log('loading', binding);

open({
    library: "steamworks",
    path: __dirname + "/steam_bin/" + binding[0]
});

const _bindings = define(
    {
        "SteamAPI_InitSafe": {
            library: "steamworks",
            retType: DataType.Boolean,
            paramsType: [],
        },
        "SteamAPI_RunCallbacks": {
            library: "steamworks",
            retType: DataType.Boolean,
            paramsType: []
        },

    })


export default _bindings;