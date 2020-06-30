const NodeGeocoder = require('node-geocoder');
const dotenv = require('dotenv');

dotenv.config();

const options = {
	provider: 'here',
 
	// Optional depending on the providers
	apiKey: process.env.HERE_API_KEY, // for Mapquest, OpenCage, Google Premier
	formatter: null // 'gpx', 'string', ...
};

const singleGeocoding = (address) => {	 
	const geocoder = NodeGeocoder(options);
	 
	geocoder.geocode(address)
		.then((resulst) =>  {
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
	});
};

const batchGeocoding = (listAddress) => {	 
	const geocoder = NodeGeocoder(options);
	 
	geocoder.batchGeocode(listAddress, (result) => {
		console.log(results);
	});
};

export {
	singleGeocoding,
	batchGeocoding,
};