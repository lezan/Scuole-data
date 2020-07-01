const batchGeocoder = require('./batchGeocoder');
const fs = require('fs');

const main = async () => {
	const args = process.argv;
	const namefile = args[2];
	const requestId = JSON.parse(fs.readFileSync(`./data/${namefile}`, 'utf8'));
	batchGeocoder.checkStatusRequest(requestId);
};

main();