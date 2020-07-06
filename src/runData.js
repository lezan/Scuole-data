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
}

const getOccurrencesScuolaByRegion = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const occurrencesScuolaByRegion = getData.getMostFrequentNameScuolaByRegion(data);
	computeData.saveJson(occurrencesScuolaByRegion, 'occurrencesScuolaByRegion');
};

const getOccurrencesScuolaByRegionInList = async () => {
	const data = await getData.readDataCsv('allData.csv');

	const listName = [
		'pasolini', 'pirandello', 'gennaro', 'foscolo', 'marconi', 'garibaldi', 'mazzini', 'vinci', 'majorana', "d'annunzio", 'bosco', 'milani',
		'leopardi', 'moro', 'fermi', 'pascal', 'pascoli', 'montalcini', 'rodari', 'galilei', 'mameli', 'carducci', 'umberto', 'quasimodo',
		'alighieri', 'petrarca', 'alfieri', 'montessori', "d'aquino", 'cavour', 'tasso', 'einaudi', 'plinio', 'platone', 'meli', 'matteotti',
		'pertini', 'pitagora', 'verdi', 'berlinguer', 'gramsci', 'borsellino', 'falcone', 'manzoni', 'amicis', 'collodi', 'bruno', 'gasperi', 'almeyda',
		'azeglio', 'pellico', 'salvemini', 'diaz', 'verga', 'sciascia', 'crispi', 'archimede', 'sturzo', 'guttuso', 'maiorana', 'giotto' ];

	const occurrencesScuolaByRegionInList = getData.getFrequentNameScuolaByRegionInList(data, listName);
	computeData.saveJson(occurrencesScuolaByRegionInList, 'occurrencesScuolaByRegionInList');

	const regionNameSet = new Set();
	occurrencesScuolaByRegionInList.forEach((d) => {
		const value = Object.keys(d.values)[0]
		regionNameSet.add(value);
	});
	console.log(regionNameSet);

	const regioneGeoJson = await getData.readDataGeoJson('limits_IT_regions.geojson');
	regioneGeoJson.features.forEach((item) => {
		occurrencesScuolaByRegionInList.forEach((d) => {
			if (d.regione.toLowerCase() === item.properties.reg_name.toLowerCase()) {
				const value = Object.keys(d.values)[0];
				item.properties['nameScuola'] = value;
			}
		})
	});

	computeData.saveJson(regioneGeoJson, 'regionsNameScuola');
};

commander
	.version('1.0.0', '-v, --version')
	.usage('[OPTIONS]...')
	.option('-gc, --getDataComune', 'Get data by comune')
	.option('-gp, --getDataProvincia', 'Get data by provincia')
	.option('-gr, --getDataRegione', 'Get data by regione')
	.option('-goi, --getOccurrencesIstituto', 'Get occurrences istituto')
	.option('-gos, --getOccurrencesScuola', 'Get occurrences scuola')
	.option('-gosr, --getOccurrencesScuolaByRegion', 'Get occurrences scuola by regione')
	.option('-gosrl, --getOccurrencesScuolaByRegionInList', 'Get occurrences scuola by regione in list')
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

if (commander.getOccurrencesScuolaByRegion) {
	getOccurrencesScuolaByRegion();
}

if (commander.getOccurrencesScuolaByRegionInList) {
	getOccurrencesScuolaByRegionInList();
}

if (commander.all) {
	getDataByComune();
	getDataByProvincia();
	getDataByRegion();
	getOccurrencesIstituto();
	getOccurrencesScuola();
	getOccurrencesScuolaByRegion();
	getOccurrencesScuolaByRegionInList();
}