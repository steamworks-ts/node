import bindings from "../steam_bin/index";
import {open} from "ffi-rs";


const { platform, arch } = process;
if(typeof bindings[platform] === 'undefined') {
    throw new Error('platform not supported: ' + platform);
}
if(typeof bindings[platform][arch] === 'undefined') {
    throw new Error('arch not supported: ' + arch);
}
const binding = bindings[platform][arch];
console.log('loading', binding);

open({
    library: "steamworks",
    path: __dirname + "/../steam_bin/" + binding[0]
});

