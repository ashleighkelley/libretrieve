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

    if(message.content.startsWith('!getbook')){
        sendSynopsis(message);
    } else if ((message.channel.name === 'book-club') && message.content.startsWith('!pastbooks')){
        sendHistory(message, db);
    } else if ((message.channel.name === 'book-club') && message.content.startsWith('!addbook')){
        addBook(message, db);
    } else if ((message.channel.name === 'book-club') && message.content.startsWith('!bookhelp')){
        sendHelp(message);
    } else if ((message.channel.name != 'all-things-circa') && (message.channel.name != 'circa-social-media') &&
	       (message.channel.name != 'introduce-yourselves') && 
	       (message.content.includes(' SA ') || message.content.includes(' SA') || message.content.includes(' SA') || message.content==='SA')){
        ripSA(message);
    } else if (message.content.includes('shleigh')) {
	    message.reply('Shleigh?', {files: ["./server/mariah.jpg"] });
    }
});

function sendSynopsis(message) {

    const searchString = message.content.substr(9);

    books.search(searchString, function(error, results) {
        if (!error){
            
            if (results[0].description != null && results[0].description.length > 2048){
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

function ripSA(message) {
    var description = '*moderation*';
    switch(Math.round(Math.random() * 42)) {
			case 1:
		    		description = '[If only someone had wished him a happy moderator day.](https://discord.com/channels/690677110603382814/697825393113301013/999013555103862805)';
				break;
			case 2:	
				description = '[Sage advice.](https://discord.com/channels/690677110603382814/697825393113301013/999010609477726249)';
				break;
			case 3:
				description = '[Dont let it keep you down.](https://discord.com/channels/690677110603382814/697825393113301013/998797762646786092)';
				break;
			case 4:
				description = '[Rock on. :metal:](https://discord.com/channels/690677110603382814/697825393113301013/998775645234548766)';
				break;
			case 5:
				description = '[weeb.](https://discord.com/channels/690677110603382814/697825393113301013/703257204974944409)';
				break;
			case 6:
				description = '[Me neither.](https://discord.com/channels/690677110603382814/697825393113301013/996902420468748379)';
				break;
			case 7:
				description = '[AF.](https://discord.com/channels/690677110603382814/697825393113301013/996551747441021039)';
				break;
			case 8:
				description = '[Gigachads get Gigavaxxed](https://discord.com/channels/690677110603382814/697825393113301013/996107208758669432)';
				break;
			case 9:
				description = '[Every day without SA is](https://discord.com/channels/690677110603382814/697825393113301013/994972671639035924)';
				break;
			case 10:
				description = '[microplastics.](https://discord.com/channels/690677110603382814/697825393113301013/992826461067157554)';
				break;
			case 11:
				description = '[Boom.done](https://discord.com/channels/690677110603382814/697825393113301013/992584108712669224)';
				break;
		    case 12:
				description = '[<3](https://discord.com/channels/690677110603382814/697825393113301013/992286561091719168)';
				break;
		    case 13:
				description = '[Thom Yorkes biggest fan.](https://discord.com/channels/690677110603382814/697825393113301013/981716202734878740)';
				break;
		    case 14:
				description = '[Pay your taxes.](https://discord.com/channels/690677110603382814/697825393113301013/954081787070537778)';
				break;
		    case 15:
				description = '[Based.](https://discord.com/channels/690677110603382814/697892553478897735/774447904005161020)';
				break;
		    case 16:
				description = '[Grandpa appreciation.](https://discord.com/channels/690677110603382814/697127199341412405/697872286228807760)';
				break;
		    case 17:
				description = '[Remember when he spent years begging for a smash competitor and then was "too busy" to play?](https://discord.com/channels/690677110603382814/697570845190520843/859449024112099338)';
				break;
		    case 18:
				description = '[Millenials.](https://discord.com/channels/690677110603382814/697825393113301013/698175337259073616)';
				break;
		    case 19:
				description = '[Obviously.](https://discord.com/channels/690677110603382814/697570845190520843/700376359045824613)';
				break;
		    case 20:
				description = '[Subscribe to egg facts.](https://discord.com/channels/690677110603382814/697825393113301013/702896126474453044)';
				break;
		    case 21:
				description = '[Boomer.](https://discord.com/channels/690677110603382814/697825393113301013/703247111436894298)';
				break;
		    case 22:
				description = '[hwat.](https://discord.com/channels/690677110603382814/690678981606899812/702948385040236646)';
				break;
		    case 23:
				description = '[Advice.](https://discord.com/channels/690677110603382814/697896969586081963/702966897758568569)';
				break;
		    case 24:
				description = '[Fortnite.](https://discord.com/channels/690677110603382814/697572972130467950/703050560403800104)';
				break;
		    case 25:
				description = '[Live life 5 seconds at a time.](https://discord.com/channels/690677110603382814/697825393113301013/703252641257488505)';
				break;
		    case 26:
				description = '[Space.](https://discord.com/channels/690677110603382814/697825393113301013/703269936017047672)';
				break;
		    case 27:
				description = '[!!!](https://discord.com/channels/690677110603382814/697825393113301013/703971924518109206)';
				break;
		    case 28:
				description = '[Now watch me whip.](https://discord.com/channels/690677110603382814/697825393113301013/703972942362443866)';
				break;
		    case 29:
				description = '[Rise and grind.](https://discord.com/channels/690677110603382814/697825393113301013/704286682182189096)';
				break;
		    case 30:
				description = '[Always on that sigma male grindset.](https://discord.com/channels/690677110603382814/697825393113301013/956229631936172133)';
				break;
		    case 31:
				description = '[frog.](https://discord.com/channels/690677110603382814/697570845190520843/899403676953739334)';
				break;
		    case 32:
				description = '[sorry.](https://discord.com/channels/690677110603382814/697825393113301013/863600297226010634)';
				break;
		    case 33:
				description = '[Good boy.](https://discord.com/channels/690677110603382814/697572972130467950/725110571468324865)';
				break;
		    case 34:
				description = '[Just like real life, amirite?](https://discord.com/channels/690677110603382814/697570845190520843/708849400138432584)';
				break;
		    case 35:
				description = '[Protect at all costs.](https://discord.com/channels/690677110603382814/697825393113301013/709781974293807117)';
				break;
		    case 36:
				description = '[Wear heelys (or soaps) to escape your feelies.](https://discord.com/channels/690677110603382814/697572972130467950/719052256334315531)';
				break;
		    case 37:
				description = '[trash.](https://discord.com/channels/690677110603382814/697825393113301013/713399866604126280)';
				break;
		    case 38:
				description = '[BYOD.](https://discord.com/channels/690677110603382814/697572972130467950/704050995386384414)';
				break;
		    case 39:
				description = '[Sock puppet.](https://discord.com/channels/690677110603382814/697825393113301013/703262963624312922)';
				break;
		    case 40:
				description = '[feet.](https://discord.com/channels/690677110603382814/697825393113301013/703257204974944409)';
				break;
		    case 41:
				description = '[Eat your vegetables.](https://discord.com/channels/690677110603382814/697825393113301013/875096695225057341)';
				break;
		    case 42:
				description = '[Still waiting on that recipe...](https://discord.com/channels/690677110603382814/697896969586081963/789170377741303828)';
				break;
		}
	const embed = new Discord.MessageEmbed()
		.setTitle('In Memoriam')
		.setDescription(description)
	    message.channel.send(embed);
}
