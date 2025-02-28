import {SteamAPI} from "./node";

let client = SteamAPI.init_app(480);
//('mine');

function sleep(sleepInMs: number) {
    const prom = Promise.withResolvers();
    setTimeout(prom.resolve, sleepInMs);
    return prom.promise;
}
sleep(1000).then(() => {
    let session = client.steamuser.getAuthTicketForWebApi("beasthunter");
})

console.log(client.steamuser);
async function main() {
    while(true) {
        client.runCallbacks();
        await sleep(100);
    }
}

main();