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
	
	// const saveCsvData = (data) => {
	// 	const csvData = new ObjectsToCsv(data);
	// 	await csvData.toDisk('./newData.csv');
	// };
};