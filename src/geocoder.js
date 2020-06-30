const NodeGeocoder = require('node-geocoder');
const dotenv = require('dotenv');

dotenv.config();

const options = {
	provider: 'here',
 
	// Optional depending on the providers
	apiKey: process.env.HERE_API_KEY, // for Mapquest, OpenCage, Google Premier
	formatter: null // 'gpx', 'string', ...
};

module.exports = {
	singleGeocoding: (address) => {	 
		const geocoder = NodeGeocoder(options);
		 
		const resultData = geocoder.geocode(address)
			.then((result) =>  {
				// console.log(result);

				return result;
			})
			.catch((error) => {
				console.log(error);
		});

		return resultData;
	},
	
	batchGeocoding: (listAddress) => {
		const geocoder = NodeGeocoder(options);
		 
		const resultData = geocoder.batchGeocode(listAddress)
			.then((result) => {
				return result;
			})
			.catch((error) => {
				console.log(error);
			});

		return resultData;
	},
};