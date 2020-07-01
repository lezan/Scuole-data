const computeData = require('./computeData');
const batchGeocoder = require('./batchGeocoder');

const main = async () => {
	const data = await computeData.getData();

	const listAddress = computeData.getListAddressQualified(data.slice(0, 5));

	computeData.saveListAddress(listAddress);

	const requestId = await batchGeocoder.runBatchGeocode(listAddress);
	console.log('RequestId: ', requestId);
};

main();