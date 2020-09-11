
const {Client} = require('discord.js');
require('dotenv').config();

const msgcontroller = require('./command/commandcontroller');
const token = process.env.TOKEN;
const prefix = '>';

const client = new Client();

client.on("ready", () => {
    console.log('Bot Now connected!');
    console.log('Logged In as', client.user.tag)
    client.user.setStatus('dnd');
});

client.on('message', msg => {
    msgcontroller.controller(client,msg,prefix);
});

client.login(token);