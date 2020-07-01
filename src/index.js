const computeData = require('./computeData.js');
const geocoder = require('./geocoder.js');

const main = async () => {
	// Fetcha i dati.
	const data = await computeData.getData();
	// console.log(data[0]);

	// Recupera la lista degli indirizzi.
	const listAddress = computeData.getListAddress(data.slice(0, 1000));
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
	const mergedData = computeData.mergeData(data.slice(0, 1000), listLatLong);
	// console.log(mergedData);

	// Salvo in locale i dati mergati.
	computeData.saveData(mergedData, 'test');
};

main();