const http = require('node:http');
const { Writable } = require('node:stream');
var fs = require('fs');
var writableStream = fs.createWriteStream('file2.txt');


const server = http.createServer((req, res) => {
    // `req` is an http.IncomingMessage, which is a readable stream.
    // `res` is an http.ServerResponse, which is a writable stream.

    let body = '';
    // Get the data as utf8 strings.
    // If an encoding is not set, Buffer objects will be received.
    req.setEncoding('utf8');

    // Readable streams emit 'data' events once a listener is added.
    req.on('data', (chunk) => {
        body += chunk;
    });

    // The 'end' event indicates that the entire body has been received.
    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            // Write back something interesting to the user:
            res.write(typeof data);
            res.end();
        } catch (er) {
            // uh oh! bad json!
            res.statusCode = 400;
            return res.end(`error: ${er.message}`);
        }
    });
});



server.listen(1337);


const sleep = async (timeout) => {
    console.log("Waiting for " + timeout + "ms...")

    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, timeout)
    })

    console.log("Resume!")
}

const run = async () => {
    console.log("Start!")

    writableStream.on('write', (chunk, encoding, callback) => {
        console.log("chunk :>>", chunk)
        console.log("encoding :>>", encoding)
    })

    writableStream.on('finish', () => {
        console.log("Finish!")
    })

    writableStream.write("Hello")

    await sleep(5000)

    writableStream.write("World")
    await sleep(5000)
    writableStream.end()

    console.log("Stop!")
}


run().then(() => {
    console.log("Finish run()")
})

