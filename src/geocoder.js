const NodeGeocoder = require('node-geocoder');
const dotenv = require('dotenv');

dotenv.config();

const options = {
	provider: 'here',
 
	// Optional depending on the providers
	apiKey: process.env.HERE_API_KEY, // for Mapquest, OpenCage, Google Premier
	formatter: null // 'gpx', 'string', ...
};
 
const geocoder = NodeGeocoder(options);
 
geocoder.geocode('29 champs elysée paris')
	.then((res) =>  {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
});