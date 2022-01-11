const Discord = require("discord.js");
const books = require("google-books-search");
const express = require("express");
//const config = require("./config.json");
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
        sendSynopsis(message);
    } else if ((message.channel.name === 'book-club') && message.content.startsWith('!pastbooks')){
        sendHistory(message, db);
    } else if ((message.channel.name === 'book-club') && message.content.startsWith('!addbook')){
        addBook(message, db);
    } else if ((message.channel.name === 'book-club') && message.content.startsWith('!bookhelp')){
        sendHelp(message);
    }
});

function sendSynopsis(message) {

    const searchString = message.content.substr(9);

    books.search(searchString, function(error, results) {
        if (!error){
            
            if (results[0].description.length > 2048){
                var description = results[0].description.substring(0, 2000) + '...';
            } else {
                var description = results[0].description;
            }

            const embed = new Discord.MessageEmbed()
                .setTitle(results[0].title + ' by ' + results[0].authors)
                .setImage(results[0].thumbnail)
                .setDescription(description)
                .addField('Page Count', results[0].pageCount)
                .addField('Rating (out of 5)', results[0].averageRating + ' (' + results[0].ratingsCount + ' ratings)')
                .addField('More Info', results[0].link);
            message.channel.send(embed);

            console.log('Successful search: ' + searchString);
            //console.log(JSON.stringify(results[0]));
        } else {
            console.log('Encountered an error: ' + error);
        }
    });
}

function sendHistory(message, db) {
    db.connect();

    db
        .query('SELECT * FROM public."PastBooks" ORDER BY date desc')
        .then (res => {
            var pastBooks='';

            if (res.rowCount > 5) {
                for (let i = 0; i < 5; i++){
                    pastBooks += '\n' + res.rows[i].title + ' by ' + res.rows[i].author;
                }
            } else {
                for (let row of res.rows) {
                    pastBooks += '\n' + row.title + ' by ' + row.author;
                }
            }

            message.channel.send(
                '>>> Here are the most recent book picks:\n' + pastBooks + 
                '\n\nView all previous picks here: https://libretrieve.herokuapp.com'
            );
        })
        .catch(err => {
            console.log('Error retrieving history: ' + err);
            message.channel.send('Uh oh! Something went wrong. [' + err + ']');
        });
}

function addBook(message, db) {
    const queryString = message.content.substr(9);
    const queryValues = queryString.split(" - ");

    if (queryValues.length === 2){
        
        const queryString = 'INSERT INTO public."PastBooks" VALUES($1, $2, CURRENT_DATE)';
        db.connect();
        db
            .query(queryString, queryValues)
            .then(res => {
                message.channel.send(queryValues[0] + ' has been successfully added.');
                //db.end();
            })
            .catch(err => {
                message.channel.send('Uh oh, something went wrong inserting this book.');
                console.log(err);
            });
    } else {
        message.channel.send("Uh oh, something went wrong. I might not be smart enough to handle this book. Please confirm command used proper *title - author*  format");
    }
}

function sendHelp(message) {
    var helpResponse = '__Commands:__ \n' +
        '**!getbook searchString** : returns synopsis/book details \n' +
        '**!pastbooks** : returns most recent book club picks \n' +
        '**!addbook title - author** : adds book to the list of book club picks \n';
    message.channel.send(helpResponse);
}

function getFullHistory() {
    db.connect();

    db
        .query('SELECT * FROM public."PastBooks" ORDER BY date desc')
        .then (res => {
            var pastBooks='';
            for (let row of res.rows) {
                pastBooks += '\n' + row.title + ' by ' + row.author;
            }
        })
        .catch(err => {
            console.log('Error retrieving history: ' + err);
        });
    }
