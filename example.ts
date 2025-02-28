import {SteamAPI} from "./node";

let client = SteamAPI.init_app(480);
//('mine');

function sleep(sleepInMs: number) {
    const prom = Promise.withResolvers();
    setTimeout(prom.resolve, sleepInMs);
    return prom.promise;
}
sleep(1000).then(async () => {
    let session = await client.steamuser.getAuthTicketForWebApi("");
    console.log('Session', session.hex);
})

console.log(client.steamuser);
async function main() {
    while(true) {
        client.runCallbacks();
        await sleep(100);
    }
}

main();