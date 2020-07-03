const getData = require('./getData.js');
const computeData = require('./computeData.js');

const main = async () => {
	const data = await getData.readData();
	const dataComune = getData.getDataByComune(data);

	computeData.saveData(dataComune, 'dataComune');
};

main();