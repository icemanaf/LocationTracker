export const initialiseCallersGeolocation = () => {
	try {
		if (navigator.geolocation) {
			let callersGeolocation;
			navigator.geolocation.getCurrentPosition((position) => {
				callersGeolocation = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				};
				localStorage.setItem(
					'callersGeolocation',
					JSON.stringify(callersGeolocation)
				);
			});
			return callersGeolocation;
		} else {
			window.location.href = './location-services-info.html';
		}
	} catch (error) {
		// console.log('Geolocation is not supported by this browser.');
		console.log(error);
		// throw new error();
		// const callersGeolocation = {
		// 	latitude: 0,
		// 	longitude: 0,
		// };

		// localStorage.setItem(
		// 	'callersGeolocation',
		// 	JSON.stringify(callersGeolocation)
		// );
	}

	// finally {
	// 	console.log('Going to next page');
	// 	// (error) => {
	// 	// 	reject(error);
	// 	// 	window.location.href = './location-services-info.html';
	// 	// };
	// }
};
