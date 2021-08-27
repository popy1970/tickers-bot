/** @format */

console.clear();

const Client = require("./Structures/Client.js");

const config = require("./Data/config.json");

const client = new Client();

// catch the uncaught errors that weren't wrapped in a domain or try catch statement

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err)
   
})

client.start(config.token);
