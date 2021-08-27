/** @format */

const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const rp = require('request-promise');
const currency = require("currency.js");
const emoup = "<:uptrend:880398405678014544>";
const emodown = "<:down:880398434237046854>";
module.exports = new Command({

	//cmcApi = new cmcApi(),
	 const : isString = function(value) {
		return typeof value === 'string' || value instanceof String;
	},
	
	name: "price",
	description: "show the price ticker!",
	type: "BOTH",
	slashCommandOptions: [{
		name: "crypto",
		description: "Crypto symbol",
		type: "STRING",
		required: true
	}],
	//cmc data
	const:api_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency',
    const : requestOptions = {
      method: 'GET',
      uri: api_url,
      qs: {
      },
      headers: {
        'X-CMC_PRO_API_KEY': 'e425acd6-5a94-4079-8819-172083d6ae70'
      },
      json: true,
      gzip: true
    },
	//end cmc
	permission: "SEND_MESSAGES",
	const : coin="",
	async run(message, args, client) {
		
		let symbol = args[1];
		symbol = symbol.toUpperCase();
		
		if (!symbol || !isString(symbol))
		{
			return message.reply(
				`${
					symbol == undefined ? "Nothing" : symbol
				} is not a valid string! (ex: BTC)`
			);
		}
		//console.log (this.requestOptions);
		requestOptions.uri =  api_url + "/quotes/latest"
		requestOptions.qs = {"symbol" : symbol};
		//console.log (requestOptions);
		rp(requestOptions).then(response => {
			
			const majeur = value => currency(value);
			const minor = value => currency(value, { precision: 4});
			const mini = value => currency(value, { precision: 10});
			const volume = value => currency(value, { precision: 4});
			//console.log('API call response:', response.data[symbol]);
			coin = response.data[symbol];
			//console.log(coin);
			// return response;
			const embed = new Discord.MessageEmbed();
			const user = message instanceof Discord.CommandInteraction ? message.user : message.author;
		//	console.log(coin);
			let price = coin.quote.USD.price;
			let valuequote;
		//	console.log(price);
			if (price > 10)
			{
				 valuequote = majeur(coin.quote.USD.price).format();
			}
			else if (price < 10 && price > 0.01)
			{
				 valuequote = minor(coin.quote.USD.price).format();
			}
			else if (price < 0.01)
			{
				 valuequote = mini(coin.quote.USD.price).format();
			}
			var variation_24 = coin.quote.USD.percent_change_24h.toFixed(2);
			var variation_1 = coin.quote.USD.percent_change_1h.toFixed(2);
			var variation_7 = coin.quote.USD.percent_change_7d.toFixed(2);
			var variation_1h;
			var variation_24h;
			var variation_7d;
			if (variation_24 > 0)
			{
				variation_24h = emoup +" " + variation_24 +" %"
			}
			if (variation_24 < 0)
			{
				variation_24h = emodown +" " + variation_24 +" %"
			}

			if (variation_1 > 0)
			{
				variation_1h = emoup +" " + variation_1 +" %"
			}
			if (variation_1 < 0)
			{
				variation_1h = emodown +" " + variation_1 +" %"
			}
			if (variation_7 > 0)
			{
				variation_7d = emoup +" " + variation_7 +" %"
			}
			if (variation_7 < 0)
			{
				variation_7d = emodown +" " + variation_7 +" %"
			}
			var marketcap = majeur(coin.quote.USD.market_cap).format();
			//console.log("value="+valuequote);
			let vol = volume(coin.quote.USD.volume_24h).format();
			//display response
			embed
			.setTitle("Market price for "+coin.slug)
			//.setURL("https://ferotiq.dev")
			.setAuthor(
				user.username,
				user.avatarURL({ dynamic: true }),
				//"https://ferotiq.dev/"
			)
			.setDescription(
				""
			)
			.setColor("BLURPLE")
			.setThumbnail(user.avatarURL({ dynamic: true }))
			.setTimestamp()
			.setImage(
				"https://s2.coinmarketcap.com/static/img/coins/128x128/"+coin.id+".png"
			)
			.addFields(
				{
					name: "Price",
					value: valuequote.toString(),
					inline: true
				},
				{
					name: "Volume 24H",
					value: vol.toString(),
					inline: true
				},
				{
					name: "Market Cap",
					value: marketcap.toString(),
					inline: true
				},
				{
					name: "Variation 1H",
					value : variation_1h,
					inline : true
				},
				{
					name: "Variation 24H",
					value : variation_24h,
					inline : true
				},
				{
					name: "Variation 7D",
					value : variation_7d,
					inline : true
				},
				{
					name : "Source",
					value :  "[Coinmarketcap](https://coinmarketcap.com/currencies/"+coin.slug+")",
					inline : true
				}
			);
 
		message.reply({ embeds: [embed] });
			//end response






		   }).catch((err) => {
			 console.log('API call error:', err.message);
		   });

		//const m = await message.reply(`Ping: ${client.ws.ping} ms.`);

	//	const msg = message instanceof Discord.CommandInteraction ? await message.fetchReply() : m;

	/*	msg.edit(
			`Ping: ${client.ws.ping} ms.\nMessage Ping: ${
				msg.createdTimestamp - message.createdTimestamp
			}`
		);*/
	}

	
});
