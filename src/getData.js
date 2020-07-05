const fs = require('fs');
const neatCsv = require('neat-csv');
const d3Collection = require('d3-collection');
const { getData } = require('./computeData');

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
		const result = getNestedDataLength(data, 'DESCRIZIONECOMUNE')
	
		return result;
	},
	
	getDataByProvincia: (data) => {
		const result = getNestedDataLength(data, 'PROVINCIA');
	
		return result;
	},
	
	getDataByRegione: (data) => {
		const result = getNestedDataLength(data, 'REGIONE');

		return result;
	},

	getDataByArea: (data) => {
		const result = getNestedDataLength(data, 'AREAGEOGRAFICA');
	
		return result;
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
	},

	getFrequentNameIstitutoByRegionInList: (data, listName) => {
		const result = getFrequentNameByRegionInList(data, listName, 'DENOMINAZIONEISTITUTORIFERIMENTO');

		return result;
	},

	getFrequentNameScuolaByRegionInList: (data, listName) => {
		const result = getFrequentNameByRegionInList(data, listName, 'DENOMINAZIONESCUOLA');

		return result;
	},
};

getMostFrequentName = (data, type) => {
	const listRemoveName = [
		'di', 'a', 'da', 'in', 'con',
		'li', 'lo', 'la',
		'del', 'della', 'dello',
		'e',
		'via', 'P.ZZA',
		'scuola',
		'infanzia', 'materna', 'primaria', 'media', 'superiore', 'liceo', 'istituto', 'elem.', 'sc.', 'SC.M.',
		'scientifico', 
		'IC', 'I.C.', 'istituto comprensivo', 'I. C.', 'I.I.S.', 'I.T.I.S.',
	];

	const dataExtracted = [];
	data.forEach((d) => {
		const elements = d[type].split(/[ ,-]+/);
		elements.forEach((el) => {
			dataExtracted.push(el);
		})
	});

	const dataFiltered = dataExtracted.map((d) => {
		let string = d;
		// listRemoveName.forEach((el) => {
		// 	if (string.includes(el.toUpperCase())) {
		// 		const regex = new RegExp('\\b' + el.toUpperCase() + '\\b', 'g')
		// 		const newString = string.replace(regex, '');
		// 		string = newString;
		// 	}
		// });
		const noNumber = string.replace(/[0-9]/g, '');
		const noSymbol = noNumber.replace(/"/g, '');
		return noSymbol;
	});

	const occurrences = dataFiltered.reduce((acc, curr) => (acc[curr] = ++acc[curr] || 1, acc), {});

	const result = sortOccurrencesByValue(occurrences);

	return result;
};

getFrequentNameByRegionInList = (data, listName, type) => {
	const dataNested = getNestedData(data, 'REGIONE');
		
	const occurrences = [];

	dataNested.forEach((item) => {
		const elements = [];
		item.values.forEach((d) => {
			listName.forEach((el) => {
				if (d[type].includes(el.toUpperCase())) {
					elements.push(el);
				}
			})
		});

		const occurrencesRegion = elements.reduce((acc, curr) => (acc[curr] = ++acc[curr] || 1, acc), {});

		const result = sortOccurrencesByValue(occurrencesRegion);

		occurrences.push(({
			regione: item.regione,
			values: result,
		}));
	});

	return occurrences;
};

getNestedDataLength = (data, group) => {
	const dataNested = d3Collection.nest()
			.key((d) => d[group])
			.entries(data)
			.map((d) => ({
				key: d.key,
				value: d.values.length,
			}));

	dataNested.sort((a, b) => a.key.localeCompare(b.key));

	return dataNested;
};

getNestedData = (data, group) => {
	const dataNested = d3Collection.nest()
		.key((d) => d[group])
		.entries(data)
		.map((d) => ({
			regione: d.key,
			values: d.values,
		}));

	dataNested.sort((a, b) => a.regione.localeCompare(b.regione));

	return dataNested;
};

sortOccurrencesByValue = (occurrences) => {
	const entries = Object.entries(occurrences);
	const sorted = entries.sort((a, b) => b[1] - a[1]);
	const result = {};
	sorted.forEach((d) => {
		result[d[0]] = d[1];
	});

	return result;
};