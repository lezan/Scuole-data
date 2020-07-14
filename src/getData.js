const fs = require('fs');
const neatCsv = require('neat-csv');
const d3Collection = require('d3-collection');

module.exports = {
	readDataCsv: async (filename) => {
		const importData = fs.readFileSync(`./data/${filename}`);
		const data = await neatCsv(importData, { separator: ',' });
	
		return data;
	},

	readDataGeoJson: async (filename) => {
		const importData = fs.readFileSync(`./data/${filename}`);
		const geoJson = JSON.parse(importData);
	
		return geoJson;
	},

	filterData: (data, type,value) => {
		const dataFiltered = data.filter((d) => d[type] === value);

		return dataFiltered;
	},

	getNestedDataLength: (data, group) => {
		const dataNested = d3Collection.nest()
				.key((d) => d[group])
				.entries(data)
				.map((d) => ({
					key: d.key,
					value: d.values.length,
				}));
	
		dataNested.sort((a, b) => a.key.localeCompare(b.key));
	
		return dataNested;
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

	getMostFrequentNameScuolaByComune: (data) => {
		const occurrences = getMostFrequentNameScuolaBy(data, 'DESCRIZIONECOMUNE', 'comune')

		return occurrences;
	},

	getMostFrequentNameScuolaByProvincia: (data) => {
		const occurrences = getMostFrequentNameScuolaBy(data, 'PROVINCIA', 'provincia')

		return occurrences;
	},

	getMostFrequentNameScuolaByRegione: (data) => {
		const occurrences = getMostFrequentNameScuolaBy(data, 'REGIONE', 'regione')

		return occurrences;
	},

	getFrequentNameIstitutoByComuneInList: (data, listName) => {
		const result = getFrequentNameInList(data, listName, 'DENOMINAZIONEISTITUTORIFERIMENTO', 'DESCRIZIONECOMUNE', 'comune');

		return result;
	},

	getFrequentNameScuolaByComuneInList: (data, listName) => {
		const result = getFrequentNameInList(data, listName, 'DENOMINAZIONESCUOLA', 'DESCRIZIONECOMUNE', 'comune');

		return result;
	},

	getFrequentNameIstitutoByProvinciaInList: (data, listName) => {
		const result = getFrequentNameInList(data, listName, 'DENOMINAZIONEISTITUTORIFERIMENTO', 'PROVINCIA', 'provincia');

		return result;
	},

	getFrequentNameScuolaByProvinciaInList: (data, listName) => {
		const result = getFrequentNameInList(data, listName, 'DENOMINAZIONESCUOLA', 'PROVINCIA', 'provincia');

		return result;
	},

	getFrequentNameIstitutoByRegioneInList: (data, listName) => {
		const result = getFrequentNameInList(data, listName, 'DENOMINAZIONEISTITUTORIFERIMENTO', 'REGIONE', 'regione');

		return result;
	},

	getFrequentNameScuolaByRegioneInList: (data, listName) => {
		const result = getFrequentNameInList(data, listName, 'DENOMINAZIONESCUOLA', 'REGIONE', 'regione');

		return result;
	},

	getAlunniScuolaByComune: (dataScuola, dataAlunni) => {
		const result = getAlunniScuolaByGroup(dataScuola, dataAlunni, 'DESCRIZIONECOMUNE');

		return result;
	},

	getAlunniScuolaByProvincia: (dataScuola, dataAlunni) => {
		const result = getAlunniScuolaByGroup(dataScuola, dataAlunni, 'PROVINCIA');

		return result;
	},

	getAlunniScuolaByRegione: (dataScuola, dataAlunni) => {
		const result = getAlunniScuolaByGroup(dataScuola, dataAlunni, 'REGIONE');

		return result;
	},

	getAlunniOrdineByRegione: (dataScuola, dataAlunni) => {
		const mapScuolaGroup = {};
		dataScuola.forEach((d) => {
			mapScuolaGroup[d.CODICESCUOLA] = d.REGIONE;
		});

		const result = {};
		dataAlunni.forEach((item) => {
			const codiceScuola = item.CODICESCUOLA;
			const numeroAlunni = Number(item.ALUNNI);
			const ordine = item.ORDINESCUOLA;

			const index = mapScuolaGroup[codiceScuola];

			if (result[index] !== undefined) {
				if (result[index][ordine] !== undefined) {
					result[index][ordine] += numeroAlunni;
				} else {
					result[index][ordine] = numeroAlunni;
				}
			} else {
				result[index] = {[ordine]: numeroAlunni};
			}
		});

		return result;
	},
};

checkWord = (word, string) => {
	const allowedSeparator = '\\\s-,.;"\'|/()+_=';

	const regex = new RegExp(
    	`(^.*[${allowedSeparator}]${word}$)|(^${word}[${allowedSeparator}].*)|(^${word}$)|(^.*[${allowedSeparator}]${word}[${allowedSeparator}].*$)`,
    	'i',
	);

	return regex.test(string);
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

getMostFrequentNameScuolaBy = (data, group, key) => {
	const dataNested = d3Collection.nest()
		.key((d) => d[group])
		.entries(data)
		.map((d) => ({
			[key]: d.key,
			values: d.values,
		}));

	dataNested.sort((a, b) => a[key].localeCompare(b[key]))
	
	const occurrences = [];
	dataNested.forEach((item) => {
		const el = getMostFrequentName(item.values, 'DENOMINAZIONESCUOLA');
		occurrences.push(({
			[key]: item[key],
			occurrences: el,
		}));
	});

	return occurrences;
},

getFrequentNameInList = (data, listName, type, group, key) => {
	const dataNested = getNestedData(data, group, key);
		
	const occurrences = [];

	dataNested.forEach((item) => {
		const elements = [];
		item.values.forEach((d) => {
			listName.forEach((el) => {
				// if (d[type].toLowerCase().includes(el)) {
				if (checkWord(el, d[type].replace(/[0-9]/g, ''))) {
					elements.push(el);
				}

				if (el === 'gasperi') {
					if (checkWord('degasperi', d[type].replace(/[0-9]/g, ''))) {
						elements.push(el);
					}
				}
				if (el === 'majorana') {
					if (checkWord('maiorana', d[type].replace(/[0-9]/g, ''))) {
						elements.push(el);
					}
				}
				if (el === 'milani') {
					if (checkWord('donmilani', d[type].replace(/[0-9]/g, ''))) {
						elements.push(el);
					}
					if (checkWord('dmilani', d[type].replace(/[0-9]/g, ''))) {
						elements.push(el);
					}
				}

				// if (!checkWord(el, d[type].replace(/[0-9]/g, '')) && d[type].toLowerCase().includes(el)) {
				// 	console.log(`${group}: ${item[key]} | Lista: ${el} | Nome: ${d[type]}`);
				// }
			})
		});

		const occurrencesRegione = elements.reduce((acc, curr) => (acc[curr] = ++acc[curr] || 1, acc), {});

		const result = sortOccurrencesByValue(occurrencesRegione);

		occurrences.push(({
			[key]: item[key],
			values: result,
		}));
	});

	return occurrences;
};

getAlunniScuolaByGroup = (dataScuola, dataAlunni, group) => {
	const mapScuolaGroup = {};
	dataScuola.forEach((d) => {
		mapScuolaGroup[d.CODICESCUOLA] = d[group];
	});

	const result = {};

	dataAlunni.forEach((item) => {
		const codiceScuola = item.CODICESCUOLA;
		const numeroAlunni = Number(item.ALUNNI);

		const index = mapScuolaGroup[codiceScuola];

		if (result[index] !== undefined) {
			result[index] += numeroAlunni;
		} else {
			result[index] = numeroAlunni;
		}
	});

	return result;
};

getNestedData = (data, group, key) => {
	const dataNested = d3Collection.nest()
		.key((d) => d[group])
		.entries(data)
		.map((d) => ({
			[key]: d.key,
			values: d.values,
		}));

	dataNested.sort((a, b) => a[key].localeCompare(b[key]));

	return dataNested;
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

sortOccurrencesByValue = (occurrences) => {
	const entries = Object.entries(occurrences);
	const sorted = entries.sort((a, b) => b[1] - a[1]);
	const result = {};
	sorted.forEach((d) => {
		result[d[0]] = d[1];
	});

	return result;
};