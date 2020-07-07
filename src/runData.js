const getData = require('./getData.js');
const computeData = require('./computeData.js');
const commander = require('commander');

const getDataByComune = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const dataComune = getData.getDataByComune(data);
	computeData.saveData(dataComune, 'dataComune');
};

const getDataByProvincia = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const dataProvincia = getData.getDataByProvincia(data);
	computeData.saveData(dataProvincia, 'dataProvincia');
};

const getDataByRegion = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const dataRegione = getData.getDataByRegione(data);
	computeData.saveData(dataRegione, 'dataRegione');
};

const getOccurrencesIstituto = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesIstituto = getData.getMostFrequentNameIstituto(data);
	computeData.saveJson(occurrencesIstituto, 'occurrencesIstituto');
};

const getOccurrencesScuola = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesScuola = getData.getMostFrequentNameScuola(data);
	computeData.saveJson(occurrencesScuola, 'occurrencesScuola');
};

const getOccurrencesScuolaByComune = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesScuolaByComune = getData.getMostFrequentNameScuolaByComune(data);
	computeData.saveJson(occurrencesScuolaByComune, 'occurrencesScuolaByComune');
};

const getOccurrencesScuolaByProvincia = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesScuolaByProvincia = getData.getMostFrequentNameScuolaByProvincia(data);
	computeData.saveJson(occurrencesScuolaByProvincia, 'occurrencesScuolaByProvincia');
};

const getOccurrencesScuolaByRegione = async () => {
	const data = await getData.readDataCsv('allData.csv');

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
	const data = await getData.readDataCsv('allData.csv');

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
	const data = await getData.readDataCsv('allData.csv');

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
	const data = await getData.readDataCsv('allData.csv');

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