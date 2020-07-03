const getData = require('./getData.js');
const computeData = require('./computeData.js');

const main = async () => {
	const data = await getData.readData();
	const dataComune = getData.getDataByComune(data);
	const dataProvincia = getData.getDataByProvincia(data);
	const dataRegione = getData.getDataByRegione(data);

	computeData.saveData(dataComune, 'dataComune');
	computeData.saveData(dataProvincia, 'dataProvincia');
	computeData.saveData(dataRegione, 'dataRegione');

	const occurrencesIstituto = getData.getMostFrequentNameIstituto(data);
	computeData.saveJson(occurrencesIstituto, 'occurrencesIstituto');

	const occurrencesScuola = getData.getMostFrequentNameScuola(data);
	computeData.saveJson(occurrencesScuola, 'occurrencesScuola');

	const occurrencesScuolaByRegion = getData.getMostFrequentNameScuolaByRegion(data);
	computeData.saveJson(occurrencesScuolaByRegion, 'occurrencesScuolaByRegion');
};

main();