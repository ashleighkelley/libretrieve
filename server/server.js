const Discord = require("discord.js");
const books = require("google-books-search");
const express = require("express");
//const config = require("./config.json");
const commands = require("./botCommands");
const { Pool, Client } = require('pg');

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    //connectionString: 'postgres://qrplmiireoeccx:caa342b4d66e9a7c7b0ce20e9f879868124642b83a9b9e75576597ee44c67fd4@ec2-107-22-245-82.compute-1.amazonaws.com:5432/d64itfacvicl7j',

    ssl: {
        rejectUnauthorized: false
    }
});

/* --------------------------------------- */
/*      Front End Functionality            */
/* --------------------------------------- */
const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(express.static('client/build'));

app.get('*/picks', (req, res) => {
    console.log('Retrieving picks...');
    db.connect();

    db
        .query('SELECT * FROM public."PastBooks" ORDER BY date desc')
        .then (results => {
            return res.send(results);
        })
        .catch(err => {
            console.log('Error retrieving history: ' + err);
            return res.send(err);
        });
});

app.get('*/suggestions', (req, res) => {
    console.log('Retrieving suggestions... NOT YET IMPLEMENTED');
    /*db.connect();

    db
        .query('SELECT * FROM public."PastBooks" ORDER BY date desc')
        .then (results => {
            //console.log(results);
            return res.send(results);
        })
        .catch(err => {
            console.log('Error retrieving history: ' + err);
            return res.send(err);
        });*/
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


/* --------------------------------------- */
/*          Discord Bot Login              */
/* --------------------------------------- */
const client = new Discord.Client();
//client.login(config.BOT_TOKEN);
client.login(process.env.BOT_TOKEN);



/* --------------------------------------- */
/*         Bot Triggers                    */
/* --------------------------------------- */
client.on('ready', () => {	
    console.log('libretrieve bot up and running');
});

client.on('message', (message) => {

    if ((message.channel.name === 'book-club') && message.content.startsWith('!getbook')){
        commands.sendSynopsis(message);
    } else if ((message.channel.name === 'book-club') && message.content.startsWith('!pastbooks')){
        commands.sendHistory(message, db);
    } else if ((message.channel.name === 'book-club') && message.content.startsWith('!addbook')){
        commands.addBook(message, db);
    } else if ((message.channel.name === 'book-club') && message.content.startsWith('!bookhelp')){
        commands.sendHelp(message);
    }
});
