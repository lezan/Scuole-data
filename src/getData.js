const fs = require('fs');
const neatCsv = require('neat-csv');
const d3Collection = require('d3-collection');

module.exports = {
	readData = () => {
		const importData = fs.readFileSync('./data/SCUANAGRAFESTAT20202120200901.csv');
		const data = await neatCsv(importData, { separator: ',' });
	
		return data;
	},
	
	getDataByComune = (data) => {
		const dataNested = d3Collection.nest()
			.key((d) => d.DESCRIZIONECOMUNE)
			.sortKeys((a, b) => a.DESCRIZIONECOMUNE.localeCompare(b.DESCRIZIONECOMUNE))
			.entries(data)
			.map((d) => ({
				comune: d.key,
				value: d.values.length,
			}));
	
		return dataNested;
	},
	
	getDataByProvincia = (data) => {
		const dataNested = d3Collection.nest()
			.key((d) => d.PROVINCIA)
			.sortKeys((a, b) => a.PROVINCIA.localeCompare(b.PROVINCIA))
			.entries(data)
			.map((d) => ({
				comune: d.key,
				value: d.values.length,
			}));
	
		return dataNested;
	},
	
	getDataByRegione = (data) => {
		const dataNested = d3Collection.nest()
			.key((d) => d.REGIONE)
			.sortKeys((a, b) => a.REGIONE.localeCompare(b.REGIONE))
			.entries(data)
			.map((d) => ({
				comune: d.key,
				value: d.values.length,
			}));
	
		return dataNested;
	},	
};