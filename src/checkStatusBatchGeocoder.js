const batchGeocoder = require('./batchGeocoder');
const fs = require('fs');

const main = async () => {
	const args = process.argv;
	const namefile = args[2];
	const requestId = fs.readFileSync(`./data/${namefile}`);
	batchGeocoder.checkStatusRequest(requestId);
};

main();