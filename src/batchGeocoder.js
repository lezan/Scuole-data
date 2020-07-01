const dotenv = require('dotenv');
const superagent= require('superagent');
const fs = require('fs');
const unzipper = require('unzipper');
const etl = require('etl');

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
			'?',
			'&apiKey=',
			hereApiKey,
			'&action=run',
			'&header=true',
			'&inDelim=|',
			'&outDelim=|',
			'&outCols=displayLatitude,displayLongitude',
        	'&outputcombined=false',
        	'&language=it-IT',
		].join("");
		// console.log(url);

		let i = 0;
		const body = 'recId|street|city|postalCode|country \n' + listAddress.map((d) => {
			return `${i++}|${d.address}|${d.city}|${d.postalCode}|${d.country}`;
		}).join('\n');
		console.log(body);

		const timeRequest = new Date().getTime();

		superagent.post(url)
        	.send(body)
			.set('Content-Type', 'text/plain')
			.then((response) => {
				const result = response.body.toString();
				console.log(result);

				const requestId = findXmlTag(result, 'RequestId');
				fs.writeFileSync(`./data/requestId_${timeRequest}.txt`, JSON.stringify(requestId));

				return requestId;

			})
			.catch((error) => {
				console.error('Error requesting batch geocode', error.message);
			})
	},

	checkStatusRequest: (requestId) => {
		const url = [
			baseUrl,
			'/',
        	requestId,
        	'?action=status',
			'&apiKey=',
			hereApiKey,
		].join("");
		
		superagent.get(url)
			.then((status) => {
				const result = status.body.toString();
				console.log('Status: ', result);

				console.log('Status: ', findXmlTag(result, 'Status'));
				console.log('TotalCount: ', findXmlTag(result, 'TotalCount'));
				console.log('ValidCount: ', findXmlTag(result, 'ValidCount'));
				console.log('InvalidCount: ', findXmlTag(result, 'InvalidCount'));
			})
			.catch((error) => {
				console.error('Error checking batch job', error.message);
			});
	},

	getResult: (requestId) => {
		const url = [
			baseUrl,
			'/',
			requestId,
			'/result?',
			'apiKey=',
			hereApiKey,
		].join("");

		superagent.get(url)
			.pipe(unzipper.Parse())
			.pipe(etl.map(async (d) => {
				const content = await d.buffer();
				const txt = content.toString();

				fs.writeFileSync(`./data/txt_${timeRequest}.json`, JSON.stringify(txt));
			}));
	},
};