const computeData = require('./computeData.js');
const geocoder = require('./geocoder.js');

const main = async () => {
	const data = await computeData.getData();
	console.log(data[0]);

	const listAddress = computeData.getListAddress(data);
	console.log(listAddress[0]);

	// const geocoderResponse = await geocoder.singleGeocoding([listAddress[0]]);
	// console.log(geocoderResponse);

	const geocoderResponse = await geocoder.batchGeocoding([listAddress[0]]);
	// Solo per batchGeocoding.
	computeData.checkNumberResult(geocoderResponse);

	// const listLatLong = computeData.getLatLong(geocoderResponse, 'single');
	const listLatLong = computeData.getLatLong(geocoderResponse, 'batch');
	console.log(listLatLong[0]);
	
	computeData.saveListAddress(listLatLong);

	const mergedData = computeData.mergeData([data[0]], listLatLong);
	console.log(mergedData);

	computeData.saveData(mergedData, 'test');
};

main();