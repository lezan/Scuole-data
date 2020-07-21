const dotenv = require('dotenv');
const superagent= require('superagent');
const fs = require('fs');
const unzipper = require('unzipper');
const etl = require('etl');
const csv = require("csvtojson");
const computeData = require('./computeData.js');

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
			'&inDelim=,',
			'&outDelim=,',
			'&outCols=displayLatitude,displayLongitude,houseNumber,street,city,postalCode',
        	'&outputcombined=false',
        	'&language=it-IT',
		].join('');
		// console.log(url);

		let i = 0;
		const body = 'recId,street,city,postalCode,country \n' + listAddress.map((d) => {
			return `${i++},${d.address},${d.city},${d.postalCode},${d.country}`;
		}).join('\n');
		// console.log(body);

		const timeRequest = new Date().getTime();

		const result = superagent.post(url)
        	.send(body)
			.set('Content-Type', 'text/plain')
			.then((response) => {
				const result = response.body.toString();
				// console.log(result);

				console.log('Status: ', findXmlTag(result, 'Status'));

				const requestId = findXmlTag(result, 'RequestId');
				fs.writeFileSync(`./data/requestId_${timeRequest}.txt`, requestId.toString());

				return requestId;

			})
			.catch((error) => {
				console.error('Error requesting batch geocode', error.message);
			})

		return result;
	},

	checkStatusRequest: (requestId) => {
		const url = [
			baseUrl,
			'/',
        	requestId,
        	'?action=status',
			'&apiKey=',
			hereApiKey,
		].join('');
		// console.log(url);
		
		superagent.get(url)
			.then((status) => {
				const result = status.body.toString();
				// console.log('Status: ', result);

				console.log('Status: ', findXmlTag(result, 'Status'));
				console.log('TotalCount: ', findXmlTag(result, 'TotalCount'));
				console.log('ValidCount: ', findXmlTag(result, 'ValidCount'));
				console.log('InvalidCount: ', findXmlTag(result, 'InvalidCount'));
				console.log('SuccessCount: ', findXmlTag(result, 'SuccessCount'));
				console.log('ErrorCount: ', findXmlTag(result, 'ErrorCount'));
			})
			.catch((error) => {
				console.error('Error checking batch job', error.message);
			});
	},

	getResult: (requestId, allData, filename) => {
		const url = [
			baseUrl,
			'/',
			requestId,
			'/result?',
			'apiKey=',
			hereApiKey,
		].join('');
		// console.log(url);

		const finalResult = superagent.get(url)
			.pipe(unzipper.Parse())
			.pipe(etl.map(async (d) => {
				const content = await d.buffer();
				const txt = content.toString();

				const one = [];
				const empty = [];
				const more = [];
				const unknown = [];

				const result = await csv({
						noheader: false,
						delimiter: ","
					})
					.fromString(txt)
					.subscribe((json) => {
						if (Number(json.seqLength) === 1) {
							one.push(json);
						} else if (Number(json.seqLength) < 0) {
							empty.push(json);
						} else if (Number(json.seqLength) > 1) {
							more.push(json);
						} else {
							unknown.push(json);
						}
					})
					.on("done", () => {
						console.log('------------');
						console.log('Empty: ', empty.length);
						console.log('More: ', more.length);
						console.log('Unknown: ', unknown.length);
						console.log('One: ', one.length);
						console.log('------------');

						const data = one.map((d) => ({
							lat: +d.displayLatitude,
							long: +d.displayLongitude,
						}));

						computeData.saveData(data, filename);

						const mergedData = computeData.mergeData(allData.slice(0, 51171), data); // No Aosta, Trento e Bolzano.
						// const mergedData = computeData.mergeData(allData.slice(51172, allData.length), data); // Solo Aosta, Trento e Bolzano.
						// const mergedData = computeData.mergeData(allData, data); // Tutto.

						computeData.saveData(mergedData, 'newData');

						// console.log('---------------------Data------------------');
						// console.log(data);

						// return data;
					});

				// console.log('---------------------Result------------------');
				// console.log(result);

				// return result;
			}));
		// console.log('---------------------FinalResult------------------');
		// console.log(finalResult);

		// return finalResult;
	},
};

// https://github.com/devbab/plex-ttp/blob/1a1a571861c1f755d5372c774894ce3b86741342/plex-place.js
// https://developer.here.com/documentation/batch-geocoder/dev_guide/topics/job-status.html
// https://developer.here.com/documentation/examples/rest/batch_geocoding/batch-geocode-addresses
// https://developer.here.com/documentation/batch-geocoder/dev_guide/topics/request-constructing.html

// https://github.com/Matheus1714/hackathon-ccr/blob/48c2cd789379c9ac760c01abef0fa01b7b71bb7f/server/modules/hereapi.js