const computeData = require('./computeData.js');
const geocoder = require('./geocoder.js');

const main = async () => {
	// Fetcha i dati.
	const data = await computeData.getData();
	// console.log(data[0]);

	// Recupera la lista degli indirizzi.
	const listAddress = computeData.getListAddress(data);
	// console.log(listAddress[0]);

	// Geocoding di un singolo indirizzo.
	const geocoderResponse = await geocoder.singleGeocoding([listAddress[0]]);
	// console.log(geocoderResponse);

	// Geocoding batch degli indirizzi.
	// const geocoderResponse = await geocoder.batchGeocoding([listAddress[0]]);

	// Controllo se ad un indirizzo corrispondono più risultati restituiti dal geocoding.
	computeData.checkNumberResult(geocoderResponse, 'single');
	// computeData.checkNumberResult(geocoderResponse, 'batch');

	const listLatLong = computeData.getLatLong(geocoderResponse, 'single');
	// const listLatLong = computeData.getLatLong(geocoderResponse, 'batch');
	// console.log(listLatLong[0]);
	
	// Salvo in locale la lista delle coordinate ottenuta. 
	computeData.saveListAddress(listLatLong);

	// Mergio i dati originali con le coordinate ottenute.
	const mergedData = computeData.mergeData([data[0]], listLatLong);
	// console.log(mergedData);

	// Salvo in locale i dati mergati.
	computeData.saveData(mergedData, 'test');
};

main();