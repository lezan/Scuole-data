const getData = require('./getData.js');
const computeData = require('./computeData.js');
const commander = require('commander');

// With allData because Alunni is not involved.
const getDataByComune = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const dataComune = getData.getDataByComune(data);
	computeData.saveData(dataComune, 'dataComune');
};

// With allData because Alunni is not involved.
const getDataByProvincia = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const dataProvincia = getData.getDataByProvincia(data);
	computeData.saveData(dataProvincia, 'dataProvincia');
};

// With allData because Alunni is not involved.
const getDataByRegion = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const dataRegione = getData.getDataByRegione(data);
	computeData.saveData(dataRegione, 'dataRegione');
};

// With allData because Alunni is not involved.
const getOccurrencesIstituto = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesIstituto = getData.getMostFrequentNameIstituto(data);
	computeData.saveJson(occurrencesIstituto, 'occurrencesIstituto');
};

// With allData because Alunni is not involved.
const getOccurrencesScuola = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesScuola = getData.getMostFrequentNameScuola(data);
	computeData.saveJson(occurrencesScuola, 'occurrencesScuola');
};

// With allData because Alunni is not involved.
const getOccurrencesScuolaByComune = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesScuolaByComune = getData.getMostFrequentNameScuolaByComune(data);
	computeData.saveJson(occurrencesScuolaByComune, 'occurrencesScuolaByComune');
};

// With allData because Alunni is not involved.
const getOccurrencesScuolaByProvincia = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesScuolaByProvincia = getData.getMostFrequentNameScuolaByProvincia(data);
	computeData.saveJson(occurrencesScuolaByProvincia, 'occurrencesScuolaByProvincia');
};

// With allData because Alunni is not involved.
const getOccurrencesScuolaByRegione = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesScuolaByRegione = getData.getMostFrequentNameScuolaByRegione(data);
	computeData.saveJson(occurrencesScuolaByRegione, 'occurrencesScuolaByRegione');
};

const catName = [
	'Politici',
	'Religiosi',
	'Letterati',
	'Scienziati',
	'Artisti',
	'Altro'
];

const mapCatName = {
	'alfieri': 'Letterati',
	'alighieri': 'Letterati',
	'allende': 'Politici',
	'amicis': 'Letterati',
	'archimede': 'Scienziati',
	'azeglio': 'Politici',
	'berlinguer': 'Politici',
	'borsellino': 'Altro',
	'bosco': 'Religiosi',
	'bruno': 'Letterati',
	'carducci': 'Letterati',
	'cavour': 'Politici',
	'collodi': 'Letterati',
	'crispi': 'Politici',
	"d'annunzio": 'Letterati',
	"d'aquino": 'Letterati',
	'diaz': 'Politici',
	'einaudi': 'Letterati',
	'einstein': 'Scienziati',
	'falcone': 'Altro',
	'fermi': 'Scienziati',
	'foscolo': 'Letterati',
	'galilei': 'Scienziati',
	'garibaldi': 'Politici',
	'gasperi': 'Politici',
	'gennaro': 'Religiosi',
	'giotto': 'Artisti',
	'gramsci': 'Politici',
	'guttuso': 'Artisti',
	'leopardi': 'Letterati',
	'majorana': 'Scienziati',
	'mameli': 'Artisti',
	'manzoni': 'Letterati',
	'marconi': 'Scienziati',
	'matteotti': 'Politici',
	'mazzini': 'Politici',
	'meli': 'Letterati',
	'milani': 'Religiosi',
	'montalcini': 'Scienziati',
	'montessori': 'Letterati',
	'moro': 'Politici',
	'pascal': 'Scienziati',
	'pascoli': 'Letterati',
	'pasolini': 'Letterati',
	'pellico': 'Letterati',
	'pertini': 'Politici',
	'petrarca': 'Letterati',
	'pirandello': 'Letterati',
	'pitagora': 'Scienziati',
	'platone': 'Letterati',
	'plinio': 'Letterati',
	'quasimodo': 'Letterati',
	'rodari': 'Letterati',
	'salvemini': 'Politici',
	'sciascia': 'Letterati',
	'sturzo': 'Politici',
	'tasso': 'Letterati',
	'umberto': 'Politici',
	'verdi': 'Letterati',
	'verga': 'Letterati',
	'vinci': 'Scienziati',
};

const listName = [
	'alfieri',
	'alighieri',
	'allende',
	'amicis',
	'archimede',
	'azeglio',
	'berlinguer',
	'borsellino',
	'bosco',
	'bruno',
	'carducci',
	'cavour',
	'collodi',
	'crispi',
	"d'annunzio",
	"d'aquino",
	'diaz',
	'einaudi',
	'einstein',
	'falcone',
	'fermi',
	'foscolo',
	'galilei',
	'garibaldi',
	'gasperi',
	'gennaro',
	'giotto',
	'gramsci',
	'guttuso',
	'leopardi',
	'majorana',
	'mameli',
	'manzoni',
	'marconi',
	'matteotti',
	'mazzini',
	'meli',
	'milani',
	'montalcini',
	'montessori',
	'moro',
	'pascal',
	'pascoli',
	'pasolini',
	'pellico',
	'pertini',
	'petrarca',
	'pirandello',
	'pitagora',
	'platone',
	'plinio',
	'quasimodo',
	'rodari',
	'salvemini',
	'sciascia',
	'sturzo',
	'tasso',
	'umberto',
	'verdi',
	'verga',
	'vinci',
];

// With allData because Alunni is not involved.
const getOccurrencesScuolaByComuneInList = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesScuolaByComuneInList = getData.getFrequentNameScuolaByComuneInList(data, listName);
	computeData.saveJson(occurrencesScuolaByComuneInList, 'occurrencesScuolaByComuneInList');

	const comuneNameSet = new Set();
	occurrencesScuolaByComuneInList.forEach((d) => {
		const value = Object.keys(d.values)[0];
		comuneNameSet.add(value);
	});
	console.log('Comune');
	console.log(comuneNameSet);
	console.log('-------------------');

	return occurrencesScuolaByComuneInList;
};

// With allData because Alunni is not involved.
const getOccurrencesScuolaByProvinciaInList = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesScuolaByProvinciaInList = getData.getFrequentNameScuolaByProvinciaInList(data, listName);
	computeData.saveJson(occurrencesScuolaByProvinciaInList, 'occurrencesScuolaByProvinciaInList');

	const provinciaNameSet = new Set();
	occurrencesScuolaByProvinciaInList.forEach((d) => {
		const value = Object.keys(d.values)[0];
		provinciaNameSet.add(value);
	});
	console.log('Provincia');
	console.log(provinciaNameSet);
	console.log('-------------------');

	return occurrencesScuolaByProvinciaInList;
};

// With allData because Alunni is not involved.
const getOccurrencesScuolaByRegioneInList = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesScuolaByRegioneInList = getData.getFrequentNameScuolaByRegioneInList(data, listName);
	computeData.saveJson(occurrencesScuolaByRegioneInList, 'occurrencesScuolaByRegioneInList');

	const regioneNameSet = new Set();
	occurrencesScuolaByRegioneInList.forEach((d) => {
		const value = Object.keys(d.values)[0];
		regioneNameSet.add(value);
	});
	console.log('Regione');
	console.log(regioneNameSet);
	console.log('-------------------');

	return occurrencesScuolaByRegioneInList;
};

// With allData because Alunni is not involved.
const getNameScuolaByComuneInList = async () => {
	const occurrencesScuolaByComuneInList = await getOccurrencesScuolaByComuneInList();
	const comuneGeoJson = await getData.readDataGeoJson('limits_IT_municipalities.geojson');
	comuneGeoJson.features.forEach((item) => {
		occurrencesScuolaByComuneInList.forEach((d) => {
			if (d.comune.toLowerCase() === item.properties.name.toLowerCase()) {
				const value = Object.keys(d.values)[0];
				item.properties['nameScuolaCat'] = mapCatName[value];
				item.properties['nameScuola'] = value !== undefined ? doCamelCase(value) : '';
			}
		})
	});

	computeData.saveJson(comuneGeoJson, 'comuneNameScuola');
};

// With allData because Alunni is not involved.
const getNameScuolaByProvinciaInList = async () => {
	const occurrencesScuolaByProvinciaInList = await getOccurrencesScuolaByProvinciaInList();

	const provinciaGeoJson = await getData.readDataGeoJson('limits_IT_provinces.geojson');
	provinciaGeoJson.features.forEach((item) => {
		occurrencesScuolaByProvinciaInList.forEach((d) => {
			if (d.provincia.toLowerCase() === item.properties.prov_name.toLowerCase()) {
				const value = Object.keys(d.values)[0];
				item.properties['nameScuolaCat'] = mapCatName[value];
				item.properties['nameScuola'] = value !== undefined ? doCamelCase(value) : '';
			}
		})
	});

	computeData.saveJson(provinciaGeoJson, 'provinciaNameScuola');
};

// With allData because Alunni is not involved.
const getNameScuolaByRegioneInList = async () => {
	const occurrencesScuolaByRegioneInList = await getOccurrencesScuolaByRegioneInList();

	const regioneGeoJson = await getData.readDataGeoJson('limits_IT_regions.geojson');
	regioneGeoJson.features.forEach((item) => {
		occurrencesScuolaByRegioneInList.forEach((d) => {
			if (d.regione.toLowerCase() === item.properties.reg_name.toLowerCase()) {
				const value = Object.keys(d.values)[0];
				item.properties['nameScuola'] = doCamelCase(value);
			}
		})
	});

	computeData.saveJson(regioneGeoJson, 'regioneNameScuola');
};

const colorsRegione = ['#0b2852',
	'#087c58',
	'#fc6600',
	'#b6e3ff',
	'#e58d23',
	'#88c46c',
	'#31999b',
	'#e54535',
	'#d17474',
	'#5b1a4c',
	'#5e95b7',
	'#f7c97f',
	'#233a22',
	'#f9d4d4',
	'#d60010',
	'#936cff',
	'#66290e',
	'#376cb7',
	'#517707',
	'#9e1255'
];

const getFlowerScuolaByComuneInList = async () => {
	const occurrencesScuolaByComuneInList = await getOccurrencesScuolaByComuneInList();

	const result = [];
	occurrencesScuolaByComuneInList.forEach((d, index) => {
		const el = {
			key: doCamelCase(d.comune),
			data: Object.entries(d.values).map(([key, value]) => ({
				name: doCamelCase(key),
				value,
			})).slice(0, 10),
			color: colorsRegione[index],
		};

		result.push(el);
	});

	computeData.saveJson(result, 'dataFlowerComune');
};

const getFlowerScuolaByProvinciaInList = async () => {
	const occurrencesScuolaByProvinciaInList = await getOccurrencesScuolaByProvinciaInList();

	const result = [];
	occurrencesScuolaByProvinciaInList.forEach((d, index) => {
		const el = {
			key: doCamelCase(d.provincia),
			data: Object.entries(d.values).map(([key, value]) => ({
				name: doCamelCase(key),
				value,
			})).slice(0, 10),
			color: colorsRegione[index],
		};

		result.push(el);
	});

	computeData.saveJson(result, 'dataFlowerProvincia');
};

const getFlowerScuolaByRegioneInList = async () => {
	const occurrencesScuolaByRegioneInList = await getOccurrencesScuolaByRegioneInList();

	const result = [];
	occurrencesScuolaByRegioneInList.forEach((d, index) => {
		const el = {
			key: doCamelCase(d.regione),
			data: Object.entries(d.values).map(([key, value]) => ({
				name: doCamelCase(key),
				value,
			})).slice(0, 10),
			color: colorsRegione[index],
		};

		result.push(el);
	});
	computeData.saveJson(result, 'dataFlowerRegione');
};

const popolazioneByRegione = {
	LOMBARDIA: 10018806,
	LAZIO: 5898124,
	CAMPANIA: 5839084,
	SICILIA: 5056641,
	VENETO: 4907529,
	"EMILIA-ROMAGNA": 4448841,
	PIEMONTE: 4392526,
	PUGLIA: 4063888,
	TOSCANA: 3742437,
	CALABRIA: 1965128,
	SARDEGNA: 1653135,
	LIGURIA: 1565307,
	MARCHE: 1538055,
	ABRUZZO: 1322247,
	"FRIULI-VENEZIA GIULIA": 1217872,
	"TRENTINO-ALTO ADIGE": 1062860,
	UMBRIA: 888908,
	BASILICATA: 570365,
	MOLISE: 310449,
	"VALLE D'AOSTA": 126883,
};

// With oldData because Alunni is involved.
const getBubbleByRegione = async () => {
	const dataScuola = await getData.readDataCsv('oldData.csv');
	const dataAlunni = await getData.readDataCsv('alunni.csv')

	const resultAlunni = getData.getAlunniScuolaByRegione(dataScuola, dataAlunni);

	const resultScuole = getData.getNestedDataLength(dataScuola, 'REGIONE');

	const resultBubble = [];
	resultScuole.forEach((d, index) => {
		// result.push([
		// 	d.value, popolazioneByRegione[d.key], resultAlunni[d.key],
		// ]);
		resultBubble.push(({
			id: doCamelCase(d.key),
			data: [{
				x: d.value,
				y: popolazioneByRegione[d.key],
				z: resultAlunni[d.key] || 0,
				color: resultAlunni[d.key] !== undefined ? colorsRegione[index] : "#a5a5a5",
			}],
		}));
	});
	console.log(resultBubble);
	computeData.saveJson(resultBubble, 'bubbleData');

	const nodeSize = getNodeSize(resultAlunni);
	console.log(nodeSize);
};

// With oldData because Alunni is involved.
const getScatterByRegione = async () => {
	const dataScuola = await getData.readDataCsv('oldData.csv');
	const dataAlunni = await getData.readDataCsv('alunni.csv');

	const resultAlunni = getData.getAlunniScuolaByRegione(dataScuola, dataAlunni);

	const resultScuole = getData.getNestedDataLength(dataScuola, 'REGIONE');

	const resultScatter = [];
	resultScuole.forEach((d, index) => {
		resultScatter.push(({
			id: doCamelCase(d.key),
			data: [{
				x: d.value,
				y: doCamelCase(d.key),
				z: resultAlunni[d.key] || 0,
				color: resultAlunni[d.key] !== undefined ? colorsRegione[index] : "#a5a5a5",
			}],
		}));
	});
	console.log(resultScatter);
	computeData.saveJson(resultScatter, 'scatterData');

	const nodeSize = getNodeSize(resultAlunni);
	console.log(nodeSize);
};

// With oldData because Alunni is involved.
const getRadarAlunniByRegione = async () => {
	const dataScuola = await getData.readDataCsv('oldData.csv');
	const dataAlunni = await getData.readDataCsv('alunni.csv');

	const result = getData.getAlunniOrdineByRegione(dataScuola, dataAlunni);
	const normal = {};
	Object.entries(result.normal).forEach(([key, value]) => {
		const element = [];
		const el1 = {
			key: Object.keys(value)[0],
			[key]: Object.values(value)[0],
		};
		const el2 = {
			key: Object.keys(value)[1],
			[key]: Object.values(value)[1],
		};
		const el3 = {
			key: Object.keys(value)[2],
			[key]: Object.values(value)[2],
		};
		element.push(el1);
		element.push(el2);
		element.push(el3);

		normal[key] = element;
	});
	computeData.saveJson(normal, 'dataRadarRegione');

	const details = {};
	Object.entries(result.details).forEach(([key1, value1], index1) => {
		const element = {
			xCategories: Object.keys(value1),
			values: Object.values(value1),
			yMin: 0,
			yMax: Math.max(...Object.values(value1)),
			data: Object.entries(value1).map(([key2, value2], index2) => ({
				x: index2,
				y: value2,
				color: colorsRegione[index1],
				connectorColor: colorsRegione[index1],
				name: key2,
			})),
		};

		details[key1] = element;
	});

	computeData.saveJson(details, 'dataDetailsRadarRegione');
	// computeData.saveJson(result.details, 'testtttt');
};

const getNodeSize = (data) => {
	let minValue = Number.MAX_VALUE;
	let maxValue = Number.MIN_VALUE;
	Object.values(data).forEach((d) => {
		if (d < minValue) {
			minValue = d;
		}

		if (d > maxValue) {
			maxValue = d;
		}
	});

	const nodeSize = {
		key: 'z',
		values: [minValue, maxValue],
		sizes: [9, 32],
	};

	return nodeSize;
};

const doCamelCase = (item) => {
	const result = item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase();
	return result;
};

commander
	.version('1.0.0', '-v, --version')
	.usage('[OPTIONS]...')
	.option('-gc, --getDataComune', 'Get data by comune')
	.option('-gp, --getDataProvincia', 'Get data by provincia')
	.option('-gr, --getDataRegione', 'Get data by regione')
	.option('-goi, --getOccurrencesIstituto', 'Get occurrences istituto')
	.option('-gos, --getOccurrencesScuola', 'Get occurrences scuola')
	.option('-gosc, --getOccurrencesScuolaByComune', 'Get occurrences scuola by comune')
	.option('-gosp, --getOccurrencesScuolaByProvincia', 'Get occurrences scuola by provincia')
	.option('-gosr, --getOccurrencesScuolaByRegione', 'Get occurrences scuola by regione')
	.option('-gnscl, --getNameScuolaByComuneInList', 'Get occurrences scuola by comune in list')
	.option('-gnspl, --getNameScuolaByProvinciaInList', 'Get occurrences scuola by provincia in list')
	.option('-gnsrl, --getNameScuolaByRegioneInList', 'Get occurrences scuola by regione in list')
	.option('-gbr, --getBubbleByRegione', 'Get data by regione for bubble')
	.option('-gsr, --getScatterByRegione', 'Get data by regione for scatter')
	.option('-gfscl, --getFlowerScuolaByComuneInList', 'Get occurrences in list scuola by comune for flower')
	.option('-gfspl, --getFlowerScuolaByProvinciaInList', 'Get occurrences in list scuola by provincia for flower')
	.option('-gfsel, --getFlowerScuolaByRegioneInList', 'Get occurrences in list scuola by regione for flower')
	.option('-grar, --getRadarAlunniByRegione', 'Test')
	.option('-a --all', 'Do all')
	.parse(process.argv);

if (commander.getDataComnue) {
	getDataByComune();
}

if (commander.getDataProvincia) {
	getDataByProvincia();
}

if (commander.getDataRegione) {
	getDataByRegion();
}

if (commander.getOccurrencesIstituto) {
	getOccurrencesIstituto();
}

if (commander.getOccurrencesScuola) {
	getOccurrencesScuola();
}

if (commander.getOccurrencesScuolaByComune) {
	getOccurrencesScuolaByComune();
}

if (commander.getOccurrencesScuolaByProvincia) {
	getOccurrencesScuolaByProvincia();
}

if (commander.getOccurrencesScuolaByRegione) {
	getOccurrencesScuolaByRegione();
}

if (commander.getNameScuolaByComuneInList) {
	getNameScuolaByComuneInList();
}

if (commander.getNameScuolaByProvinciaInList) {
	getNameScuolaByProvinciaInList();
}

if (commander.getNameScuolaByRegioneInList) {
	getNameScuolaByRegioneInList();
}

if (commander.getBubbleByRegione) {
	getBubbleByRegione();
}

if (commander.getScatterByRegione) {
	getScatterByRegione();
}

if (commander.getFlowerScuolaByComuneInList) {
	getFlowerScuolaByComuneInList();
}

if (commander.getFlowerScuolaByProvinciaInList) {
	getFlowerScuolaByProvinciaInList();
}

if (commander.getFlowerScuolaByRegioneInList) {
	getFlowerScuolaByRegioneInList();
}

if (commander.getRadarAlunniByRegione) {
	getRadarAlunniByRegione();
}

if (commander.all) {
	getDataByComune();
	getDataByProvincia();
	getDataByRegion();

	getOccurrencesIstituto();
	getOccurrencesScuola();

	getOccurrencesScuolaByComune();
	getOccurrencesScuolaByProvincia();
	getOccurrencesScuolaByRegione();

	getNameScuolaByComuneInList();
	getNameScuolaByProvinciaInList();
	getNameScuolaByRegioneInList();

	getBubbleByRegione();
	getScatterByRegione();

	getFlowerScuolaByComuneInList();
	getFlowerScuolaByProvinciaInList();
	getFlowerScuolaByRegioneInList();

	getRadarAlunniByRegione();
}