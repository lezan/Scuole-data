const computeData = require('./computeData.js');
const geocoder = require('./geocoder.js');

const main = async () => {
	const data = await computeData.getData();
	console.log(data[0]);

	const listAddress = computeData.getListAddress(data);
	console.log(listAddress[0]);

	const result = await geocoder.singleGeocoding(listAddress[0]);
	console.log(result);
};

main();