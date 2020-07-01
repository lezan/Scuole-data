const dotenv = require('dotenv');
const superagent= require("superagent");

dotenv.config();

const hereApiKey = process.env.HERE_API_KEY;

const baseUrl = 'https://batch.geocoder.ls.hereapi.com/6.2/jobs';

const findXmlTag = (res, tag) => {
    const regex = new RegExp(`(<${tag}>)([A-z0-9]+)(</${tag}>)`);
    const id = res.match(regex);
    if (id) {
		return id[2];
	} else {
		return null;
	}
}

module.exports = {
	runBatchGeocode: (listAddress) => {
		if (listAddress.length === 0) {
			console.log('listAddress is empty.');
			return;
		}

		const url = [
			baseUrl,
			"?",
			"&apiKey=", hereApiKey,
			"&action=run",
			"&header=true",
			"&inDelim=|",
			"&outDelim=|",
			"&outCols=displayLatitude,displayLongitude,locationLabel,houseNumber,street,district,city,postalCode,county,state,country",
        	"&outputcombined=false",
        	"&language=it-IT",
		].join("");
		// console.log(url);

		let i = 0;
		const body = 'recId|street|city|postalCode|country \n' + listAddress.map((d) => {
			return `${i++}|${d.address}|${d.city}|${d.postalCode}|${d.country}`;
		}).join('\n');
		// console.log(body);
	},
};

