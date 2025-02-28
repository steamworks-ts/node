"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
};
