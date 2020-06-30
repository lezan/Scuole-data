import { getData, getListAddress } from './computeData.js';

const main = async () => {
	const data = await getData();
	console.log(data[0]);

	const listAddress = getListAddress(data);
	console.log(listAddress[0]);

	
};

main();