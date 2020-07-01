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
		// const listAddress = data.map((d) => `Italy, ${d.REGIONE}, ${d.PROVINCIA}, ${d.DESCRIZIONECOMUNE}, ${d.INDIRIZZOSCUOLA}`);
		const listAddress = data.map((d) => `${d.INDIRIZZOSCUOLA}, ${d.DESCRIZIONECOMUNE}, ${d.PROVINCIA}`);
	
		return listAddress;
	},

	checkNumberResult: (data, type, listAddress) => {
		let countMore = 0;
		let countZero = 0;
		let countOne = 0;

		const listMore = {};

		if (type === 'single') {
			if (data.length > 1) {
				console.log('Error. More entry from geocoding: ', data.length);
				countMore++;
			} else if (data.length < 1) {
				console.log('Error. 0 entry from geocoding: ', data.length);
				countZero++;
			} else {
				countOne++;
			}
		} else {
			data.forEach((d, index) => {
				if (d.value.length > 1) {
					// console.log('Error. More entry from geocoding: ', d.value.length);
					// console.log(listAddress[index]);
					// console.log('-------------------');
					listMore[`${listAddress[index]}_${index}`] = d.value;
					countMore++;
				} else if (data.length < 1) {
					// console.log('Error. 0 entry from geocoding: ', data.length);
					// console.log(listAddress[index]);
					// console.log('-------------------');
					countZero++;
				} else {
					countOne++;
				}
			});
		}

		// console.log(Object.keys(listMore).length);
		fs.writeFileSync('./data/listMore.json', JSON.stringify(listMore));

		console.log('More entry: ', countMore);
		console.log('Zero entry: ', countZero);
		console.log('One entry: ', countOne);
	},

	getLatLong: (data, type) => {
		if (type === 'single') {
			const result = data.map((d) => ({
				lat: d.latitude || 0,
				long: d.longitude || 0,
			}));

			return result;
		} else {
			const result = data.map((d) => ({
				lat: d.value[0].latitude || 0,
				long: d.value[0].longitude || 0,
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

	saveGeocoderResponse: (response) => {
		fs.writeFileSync('./data/geocoderResponse.json', JSON.stringify(response));
	},

	saveLatLong: (listLatLong) => {
		fs.writeFileSync('./data/listLatLong.json', JSON.stringify(listLatLong));
	},

	saveData: async (data, filename) => {
		const csvData = new ObjectsToCsv(data);
	 	await csvData.toDisk(`./data/${filename}.csv`);
	},
};