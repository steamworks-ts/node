"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../steam_bin/index"));
const ffi_rs_1 = require("ffi-rs");
const { platform, arch } = process;
if (typeof index_1.default[platform] === 'undefined') {
    throw new Error('platform not supported: ' + platform);
}
if (typeof index_1.default[platform][arch] === 'undefined') {
    throw new Error('arch not supported: ' + arch);
}
const binding = index_1.default[platform][arch];
console.log('loading', binding);
(0, ffi_rs_1.open)({
    library: "steamworks",
    path: __dirname + "/../steam_bin/" + binding[0]
});
