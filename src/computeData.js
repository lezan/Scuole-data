import { readFileSync } from 'fs';
import neatCsv from 'neat-csv';
import ObjectsToCsv from 'objects-to-csv';

const getData = async () => {
	const importData = readFileSync('./data/SCUANAGRAFESTAT20202120200901.csv');

	const data = await neatCsv(importData, { separator: ',' });

	return data;
};

const getListAddress = (data) => {
	const listAddress = data.map((d) => d.INDIRIZZOSCUOLA);

	return listAddress;
};

// const saveCsvData = (data) => {
// 	const csvData = new ObjectsToCsv(data);
// 	await csvData.toDisk('./newData.csv');
// };

export {
	getData,
	getListAddress,
	// saveCsvData,
}
