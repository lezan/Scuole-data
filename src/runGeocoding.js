const computeData = require('./computeData.js');
const geocoder = require('./geocoder.js');
const batchGeocoder = require('./batchGeocoder');
const commander = require('commander');
const fs = require('fs');

const dataLength = 5;

const runGeocoding = async () => {
	// Fetcha i dati.
	const data = await computeData.getData();
	// console.log(data[0]);

	// Recupera la lista degli indirizzi.
	const listAddress = computeData.getListAddress(data.slice(0, dataLength));
	// console.log(listAddress[0]);

	// Salvo la lista degli indirizzi estratti.
	computeData.saveListAddress(listAddress);

	// Geocoding di un singolo indirizzo.
	// const geocoderResponse = await geocoder.singleGeocoding([listAddress[0]]);
	// console.log(geocoderResponse);

	// Geocoding batch degli indirizzi.
	const geocoderResponse = await geocoder.batchGeocoding(listAddress);

	// Salvo tutta la risposta del geocoder.
	computeData.saveGeocoderResponse(geocoderResponse);

	// Controllo se ad un indirizzo corrispondono più risultati restituiti dal geocoding.
	// computeData.checkNumberResult(geocoderResponse, 'single', listAddress);
	computeData.checkNumberResult(geocoderResponse, 'batch', listAddress);

	// const listLatLong = computeData.getLatLong(geocoderResponse, 'single');
	const listLatLong = computeData.getLatLong(geocoderResponse, 'batch');
	// console.log(listLatLong[0]);
	
	// Salvo in locale la lista delle coordinate ottenuta. 
	computeData.saveLatLong(listLatLong);

	// Mergio i dati originali con le coordinate ottenute.
	const mergedData = computeData.mergeData(data.slice(0, dataLength), listLatLong);
	// console.log(mergedData);

	// Salvo in locale i dati mergati.
	computeData.saveData(mergedData, 'test');
};

const batchGeocoding = async () => {
	const data = await computeData.getData();

	const listAddress = computeData.getListAddressQualified(data.slice(0, 51171)); // No Aosta, Trento e Bolzano.
	// const listAddress = computeData.getListAddressQualified(data.slice(51172, data.length)); // Solo Aosta, Trento e Bolzano.
	// const listAddress = computeData.getListAddressQualified(data); // Tutto.

	computeData.saveListAddress(listAddress);

	const requestId = await batchGeocoder.runBatchGeocode(listAddress);
	console.log('RequestId: ', requestId);
};

const checkStatus = async (filename) => {
	const requestId = fs.readFileSync(`./data/${filename}`, 'utf8');
	batchGeocoder.checkStatusRequest(requestId);
};

const getResult = async (filename) => {
	const requestId = fs.readFileSync(`./data/${filename}`, 'utf8');

	const data = await computeData.getData();

	const timeRequest = filename.split('_')[1].replace('.txt', '');

	const listLatLong = await batchGeocoder.getResult(requestId, data, `listLatLong_${timeRequest}`);
	// console.log('listLatLong: ', listLatLong);

	// const timeRequest = filename.split('_')[1].replace('.txt', '');

	// computeData.saveData(listLatLong, `listLatLong_${timeRequest}`);

	// const mergedData = computeData.mergeData(data.slice(0, dataLength), listLatLong);

	// computeData.saveData(mergedData, 'newData');
};

const test = async () => {
	/*
	Questi sono i dati senza Aosta, Trento e Bolzano geocodificati.
	*/
	const data = await computeData.readData('result_20200720-16-38_out.csv');
	
	/*
	Prendo solo la prima istanza quando ci sono più risultati
	per uno stesso indirizzo.
	E' una decisione arbitraria.
	*/
	const result = [];
	for (let i = 0; i < data.length; i++) {
		result.push(data[i]);
		if (Number(data[i].seqLength) !== 1) {
			i += data[i].seqLength - 1;
		}
	};

	computeData.saveData(result, 'result_new');

	/*
	Cerco quali sono gli indici degli indirizzi che non sono riusciti ad ottenere un risultato
	dal geocoding.
	*/
	let index = 0;
	const missingIndex = [];
	for (let i = 0; i < result.length; i++) {
		if (Number(result[i].recId) !== index) {
			missingIndex.push(i);
			index++;
		}
		index++;
	}

	console.log(missingIndex.length);
	
	const listAddress = computeData.readListAddress();
	console.log(listAddress.length);

	/*
	Trovo gli indirizzi che corrispondono agli indici individuati precedentemente.
	*/
	const missing = missingIndex.map((item) => listAddress[item]);
	computeData.saveJson(missing, 'missing_new');

	/*
	Preparo i dati e mergio per ottenere il risultato finale.
	Elimino tutti i missings dal dato finale e incluso solo quelli
	che hanno ritornato il geocoding.
	*/
	const clean = result.map((d) => ({
		id: +d.recId,
		lat: +d.displayLatitude,
		long: +d.displayLongitude,
	}));

	const allData = await computeData.getData();
	const mergedData = computeData.mergeData(allData.slice(0, 51171), clean);
	computeData.saveData(mergedData, 'newData');
};

commander
	.version('1.0.0', '-v, --version')
	.usage('[OPTIONS]...')
	.option('-sg, --singleGeocoding', 'Use single eocoding')
	.option('-bg, --batchGeocoding', 'Use bath geocoding')
	.option('-cs, --checkStatus <requestIdFile>', 'Check status request. Take requestId from <requestIdFile>')
	.option('-g, --getResult <requestIdFile>', 'Get result. Take requestId from <requestIdFile>')
	.option('-t, --test', '')
	.parse(process.argv);

if (commander.singleGeocoding) {
	runGeocoding();
}

if (commander.batchGeocoding) {
	batchGeocoding();
}

if (commander.checkStatus) {
	checkStatus(commander.checkStatus)
}

if (commander.getResult) {
	getResult(commander.getResult);
}

if (commander.test) {
	test();
}