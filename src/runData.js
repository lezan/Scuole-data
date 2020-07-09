const getData = require('./getData.js');
const computeData = require('./computeData.js');
const commander = require('commander');
const { option } = require('commander');

const getDataByComune = async () => {
	const data = await getData.readDataCsv('oldData.csv');

	const dataComune = getData.getDataByComune(data);
	computeData.saveData(dataComune, 'dataComune');
};

const getDataByProvincia = async () => {
	const data = await getData.readDataCsv('oldData.csv');

	const dataProvincia = getData.getDataByProvincia(data);
	computeData.saveData(dataProvincia, 'dataProvincia');
};

const getDataByRegion = async () => {
	const data = await getData.readDataCsv('oldData.csv');

	const dataRegione = getData.getDataByRegione(data);
	computeData.saveData(dataRegione, 'dataRegione');
};

const getOccurrencesIstituto = async () => {
	const data = await getData.readDataCsv('oldData.csv');

	const occurrencesIstituto = getData.getMostFrequentNameIstituto(data);
	computeData.saveJson(occurrencesIstituto, 'occurrencesIstituto');
};

const getOccurrencesScuola = async () => {
	const data = await getData.readDataCsv('oldData.csv');

	const occurrencesScuola = getData.getMostFrequentNameScuola(data);
	computeData.saveJson(occurrencesScuola, 'occurrencesScuola');
};

const getOccurrencesScuolaByComune = async () => {
	const data = await getData.readDataCsv('oldData.csv');

	const occurrencesScuolaByComune = getData.getMostFrequentNameScuolaByComune(data);
	computeData.saveJson(occurrencesScuolaByComune, 'occurrencesScuolaByComune');
};

const getOccurrencesScuolaByProvincia = async () => {
	const data = await getData.readDataCsv('oldData.csv');

	const occurrencesScuolaByProvincia = getData.getMostFrequentNameScuolaByProvincia(data);
	computeData.saveJson(occurrencesScuolaByProvincia, 'occurrencesScuolaByProvincia');
};

const getOccurrencesScuolaByRegione = async () => {
	const data = await getData.readDataCsv('oldData.csv');

	const occurrencesScuolaByRegione = getData.getMostFrequentNameScuolaByRegione(data);
	computeData.saveJson(occurrencesScuolaByRegione, 'occurrencesScuolaByRegione');
};

const listName = [
	'alfieri',
	'alighieri',
	'almeyda',
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
	'vinci'
];

const getOccurrencesScuolaByComuneInList = async () => {
	const data = await getData.readDataCsv('oldData.csv');

	const occurrencesScuolaByComuneInList = getData.getFrequentNameScuolaByComuneInList(data, listName);
	computeData.saveJson(occurrencesScuolaByComuneInList, 'occurrencesScuolaByComuneInList');

	const comuneNameSet = new Set();
	occurrencesScuolaByComuneInList.forEach((d) => {
		const value = Object.keys(d.values)[0]
		comuneNameSet.add(value);
	});
	console.log('Comune');
	console.log(comuneNameSet);
	console.log('-------------------');

	const comuneGeoJson = await getData.readDataGeoJson('limits_IT_municipalities.geojson');
	comuneGeoJson.features.forEach((item) => {
		occurrencesScuolaByComuneInList.forEach((d) => {
			if (d.comune.toLowerCase() === item.properties.name.toLowerCase()) {
				const value = Object.keys(d.values)[0];
				item.properties['nameScuola'] = value;
			}
		})
	});

	computeData.saveJson(comuneGeoJson, 'comuneNameScuola');
};

const getOccurrencesScuolaByProvinciaInList = async () => {
	const data = await getData.readDataCsv('oldData.csv');

	const occurrencesScuolaByProvinciaInList = getData.getFrequentNameScuolaByProvinciaInList(data, listName);
	computeData.saveJson(occurrencesScuolaByProvinciaInList, 'occurrencesScuolaByProvinciaInList');

	const provinciaNameSet = new Set();
	occurrencesScuolaByProvinciaInList.forEach((d) => {
		const value = Object.keys(d.values)[0]
		provinciaNameSet.add(value);
	});
	console.log('Provincia');
	console.log(provinciaNameSet);
	console.log('-------------------');

	const provinciaGeoJson = await getData.readDataGeoJson('limits_IT_provinces.geojson');
	provinciaGeoJson.features.forEach((item) => {
		occurrencesScuolaByProvinciaInList.forEach((d) => {
			if (d.provincia.toLowerCase() === item.properties.prov_name.toLowerCase()) {
				const value = Object.keys(d.values)[0];
				item.properties['nameScuola'] = value;
			}
		})
	});

	computeData.saveJson(provinciaGeoJson, 'provinciaNameScuola');
};

const getOccurrencesScuolaByRegioneInList = async () => {
	const data = await getData.readDataCsv('oldData.csv');

	const occurrencesScuolaByRegioneInList = getData.getFrequentNameScuolaByRegioneInList(data, listName);
	computeData.saveJson(occurrencesScuolaByRegioneInList, 'occurrencesScuolaByRegioneInList');

	const regioneNameSet = new Set();
	occurrencesScuolaByRegioneInList.forEach((d) => {
		const value = Object.keys(d.values)[0]
		regioneNameSet.add(value);
	});
	console.log('Regione');
	console.log(regioneNameSet);
	console.log('-------------------');

	const regioneGeoJson = await getData.readDataGeoJson('limits_IT_regions.geojson');
	regioneGeoJson.features.forEach((item) => {
		occurrencesScuolaByRegioneInList.forEach((d) => {
			if (d.regione.toLowerCase() === item.properties.reg_name.toLowerCase()) {
				const value = Object.keys(d.values)[0];
				item.properties['nameScuola'] = value;
			}
		})
	});

	computeData.saveJson(regioneGeoJson, 'regioneNameScuola');
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
			id: d.key,
			data: [{
				x: d.value,
				y: popolazioneByRegione[d.key],
				z: resultAlunni[d.key] || 0,
				color: colorsRegione[index],
			}],
		}));
	});
	console.log(resultBubble);
	computeData.saveJson(resultBubble, 'bubbleData');

	// const resultScatter = [{
	// 	id: 'example',
	// 	data: [],
	// }];
	// resultScuole.forEach((d) => {
	// 	resultScatter[0].data.push(({
	// 		x: d.value,
	// 		y: d.key,
	// 		z: resultAlunni[d.key] || 0,
	// 	}));
	// });
	const resultScatter = [];
	resultScuole.forEach((d, index) => {
		resultScatter.push(({
			id: d.key,
			data: [{
				x: d.value,
				y: d.key,
				z: resultAlunni[d.key] || 0,
				color: colorsRegione[index],
			}],
		}));
	});
	console.log(resultScatter);
	computeData.saveJson(resultScatter, 'scatterData');

	let minValueAlunni = Number.MAX_VALUE;
	let maxValueAlunni = Number.MIN_VALUE;
	Object.values(resultAlunni).forEach((d) => {
		if (d < minValueAlunni) {
			minValueAlunni = d;
		}

		if (d > maxValueAlunni) {
			maxValueAlunni = d;
		}
	});

	const nodeSize = {
		key: 'z',
		values: [minValueAlunni, maxValueAlunni],
		sizes: [9, 32],
	};

	console.log(nodeSize);
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
	.option('-goscl, --getOccurrencesScuolaByComuneInList', 'Get occurrences scuola by comune in list')
	.option('-gospl, --getOccurrencesScuolaByProvinciaInList', 'Get occurrences scuola by provincia in list')
	.option('-gosrl, --getOccurrencesScuolaByRegioneInList', 'Get occurrences scuola by regione in list')
	.option('-gbr, --getBubbleByRegione', 'Get data by regione for bubble')
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

if (commander.getOccurrencesScuolaByComuneInList) {
	getOccurrencesScuolaByComuneInList();
}

if (commander.getOccurrencesScuolaByProvinciaInList) {
	getOccurrencesScuolaByProvinciaInList();
}

if (commander.getOccurrencesScuolaByRegioneInList) {
	getOccurrencesScuolaByRegioneInList();
}

if (commander.getBubbleByRegione) {
	getBubbleByRegione();
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

	getOccurrencesScuolaByComuneInList();
	getOccurrencesScuolaByProvinciaInList();
	getOccurrencesScuolaByRegioneInList();
}