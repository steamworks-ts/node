"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
let client = node_1.SteamAPI.init_app(480);
//('mine');
function sleep(sleepInMs) {
    const prom = Promise.withResolvers();
    setTimeout(prom.resolve, sleepInMs);
    return prom.promise;
}
sleep(1000).then(async () => {
    let session = await client.steamuser.getAuthTicketForWebApi("");
    console.log('Session', session.hex);
});
console.log(client.steamuser);
async function main() {
    while (true) {
        client.runCallbacks();
        await sleep(100);
    }
}
main();
