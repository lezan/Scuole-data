const fs = require('fs');
const neatCsv = require('neat-csv');
const d3Collection = require('d3-collection');

module.exports = {
	readData: async () => {
		const importData = fs.readFileSync('./data/allData.csv');
		const data = await neatCsv(importData, { separator: ',' });
	
		return data;
	},

	filterData: (data, type,value) => {
		const dataFiltered = data.filter((d) => d[type] === value);

		return dataFiltered;
	},
	
	getDataByComune: (data) => {
		const dataNested = d3Collection.nest()
			.key((d) => d.DESCRIZIONECOMUNE)
			.entries(data)
			.map((d) => ({
				comune: d.key,
				value: d.values.length,
			}));

		dataNested.sort((a, b) => a.comune.localeCompare(b.comune));
	
		return dataNested;
	},
	
	getDataByProvincia: (data) => {
		const dataNested = d3Collection.nest()
			.key((d) => d.PROVINCIA)
			.entries(data)
			.map((d) => ({
				provincia: d.key,
				value: d.values.length,
			}));
		
		dataNested.sort((a, b) => a.provincia.localeCompare(b.provincia))
	
		return dataNested;
	},
	
	getDataByRegione: (data) => {
		const dataNested = d3Collection.nest()
			.key((d) => d.REGIONE)
			.entries(data)
			.map((d) => ({
				regione: d.key,
				value: d.values.length,
			}));
	
		dataNested.sort((a, b) => a.regione.localeCompare(b.regione))

		return dataNested;
	},

	getDataByArea: (data) => {
		const dataNested = d3Collection.nest()
			.key((d) => d.AREAGEOGRAFICA)
			.entries(data)
			.map((d) => ({
				area: d.key,
				value: d.values.length,
			}));

		dataNested.sort((a, b) => a.area.localCompare(b.area))
	
		return dataNested;
	},

	getMostFrequentNameIstituto: (data) => {
		const occurrences = getMostFrequentName(data, 'DENOMINAZIONEISTITUTORIFERIMENTO');

		return occurrences;
	},

	getMostFrequentNameScuola: (data) => {
		const occurrences = getMostFrequentName(data, 'DENOMINAZIONESCUOLA');

		return occurrences;
	},

	getMostFrequentNameScuolaByRegion: (data) => {
		const dataNested = d3Collection.nest()
			.key((d) => d.REGIONE)
			.entries(data)
			.map((d) => ({
				regione: d.key,
				values: d.values,
			}));

		dataNested.sort((a, b) => a.regione.localeCompare(b.regione))
		
		const occurrences = [];
		dataNested.forEach((item) => {
			const el = getMostFrequentName(item.values, 'DENOMINAZIONESCUOLA');
			occurrences.push(({
				regione: item.regione,
				occurrences: el,
			}));
		});

		return occurrences;
	}
};

getMostFrequentName = (data, type) => {
	const listRemoveName = [
		'di', 'a', 'da', 'in', 'con',
		'li', 'lo', 'la',
		'e',
		'via',
		'scuola',
		'infanzia', 'materna', 'primaria', 'media', 'superiore', 'liceo', 'istituto',
		'IC', 'I.C.', 'istituto comprensivo', 'I. C.',
	];

	const dataExtracted = [];
	data.forEach((d) => {
		const elements = d[type].split(/[,-]/);
		elements.forEach((el) => {
			dataExtracted.push(el);
		})
	});

	const dataFiltered = dataExtracted.map((d) => {
		let string = d;
		listRemoveName.forEach((el) => {
			if (d.includes(el)) {
				string = string.replace(el, '');
			}
		});
		const noNumber = string.replace(/[0-9]/g, '');
		const noSymbol = noNumber.replace(/"/g, '');
		return noSymbol;
	});

	const occurrences = dataFiltered.reduce((acc, curr) => (acc[curr] = ++acc[curr] || 1, acc), {});

	return occurrences;
}