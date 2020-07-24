const NodeGeocoder = require('node-geocoder');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const options = {
	provider: 'here',
 
	// Optional depending on the providers
	apiKey: process.env.HERE_API_KEY, // for Mapquest, OpenCage, Google Premier
	formatter: null // 'gpx', 'string', ...
};

module.exports = {
	/*
	Use node-geocoder.
	*/
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
	
	/*
	Use node-geocoder.
	*/
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

	/*
	Use new API:
	https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics-api/code-geocode-address.html
	*/
	newGeocoding: async (listAddress) => {
		const baseURL = 'https://geocode.search.hereapi.com/v1/geocode?';

		try {
			const result = await listAddress.map((d) => {
				const params = {
					api: options.apiKey,
					q: `${d.address} ${d.city} ${d.postalCode} ${d.country}`
				};

				const url = baseURL + queryString.stringify(params);

				const data = await axios.get(url);

				if (data.length > 1) {
					data.sort((a, b) => b.scoring - a.scoring);
				}

				return ({
					codiceScuola: d.codiceScuola,
					lat: data[0].position.lat || 0,
					long: data[0].position.lng || 0,
				});
			});

			return result;
		} catch (e) {
			console.error('Geocode error', e);
    		return {};
		}
	},
};