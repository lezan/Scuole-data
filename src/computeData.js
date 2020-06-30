const fs = require('fs');
const neatCsv = require('neat-csv');
const ObjectsToCsv = require('objects-to-csv');

module.exports = {
	getData: async () => {
		const importData = fs.readFileSync('./data/SCUANAGRAFESTAT20202120200901.csv');
	
		const data = await neatCsv(importData, { separator: ',' });
	
		return data;
	},
	
	getListAddress: (data) => {
		const listAddress = data.map((d) => `${d.INDIRIZZOSCUOLA}, ${d.CAPSCUOLA}, ${d.DESCRIZIONECOMUNE}, ${d.PROVINCIA} Italy`);
	
		return listAddress;
	},

	checkNumberResult: (data) => {
		data.forEach((d) => {
			if (d.value.length > 1) {
				console.log('Error. More entry from geocoding: ', d.value.length);
			}
		})
	},

	getLatLong: (data, type) => {
		if (type === 'single') {
			const result = data.map((d) => ({
				lat: d.latitude,
				long: d.longitude,
			}));

			return result;
		} else {
			const result = data.map((d) => ({
				lat: d.value[0].latitude,
				long: d.value[0].longitude,
			}));

			return result;
		}
	},

	mergeData: (data, latLong) => {
		if (data.length === latLong.length) {
			console.log('Ok. Same length.')
		} else {
			console.log('Error. Different length.');
		}

		const newData = [];
		data.forEach((d, index) => {
			const element = { ...d, ...latLong[index], };
			newData.push(element);
		});

		return newData;
	},

	saveListAddress: (listAddress) => {
		fs.writeFileSync('./data/listAddress.json', JSON.stringify(listAddress));
	},

	saveData: async (data, filename) => {
		const csvData = new ObjectsToCsv(data);
	 	await csvData.toDisk(`./data/${filename}.csv`);
	},
};