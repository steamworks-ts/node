import steamworks from "../index.js";


const client = steamworks.init(480);
client.auth.getAuthTicketForWebApi('bh').then(() => console.log('x'));


function sleep(i) {
    const p = Promise.withResolvers();
    setTimeout(p.resolve, i);
    return p.promise;
}

async function main() {
    while(true) {
        await sleep(1);
    }
}

main();