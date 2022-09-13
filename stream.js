const { PassThrough, Writable } = require('node:stream');
const pass = new PassThrough();
const writable = new Writable();

const run = async () => {
    // pass.pipe(writable);
    // pass.unpipe(writable);

    pass.on('data', (chunk) => {
        console.log(chunk.toString());
    });
    pass.pause();
    pass.write('1');  // Will not emit 'data'.
    pass.resume();     // Must be called to make stream emit 'data'.
    await sleep(1000)
    pass.write('2');
    pass.write('3');
    await sleep(1000)
    pass.write('4');  // Will not emit 'data'.
    pass.end()
}

const sleep = async (timeout) => {
    console.log("Waiting for " + timeout + "ms...")

    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, timeout)
    })

    console.log("Resume!")
}

run()