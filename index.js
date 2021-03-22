const Discord = require("discord.js");
const config = require("./config.json");
const books = require("google-books-search");
const PriceFinder = require("price-finder");

const client = new Discord.Client();
client.login(config.BOT_TOKEN);

const priceFinder = new PriceFinder();

/* --------------------------------------- */
/*         Bot Triggers                    */
/* --------------------------------------- */
client.on('ready', () => {
		
    console.log('libretrieve bot up and running');
    
});

client.on('message', (message) => {
    if ((message.channel.name === 'book-club') && message.content.startsWith('!getbook')){
        sendSynopsis(message);
    }
});



/* --------------------------------------- */
/*    Customized Functionality             */
/* --------------------------------------- */
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