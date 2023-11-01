export const initialiseCallersGeolocation = async () => {
	return new Promise((resolve, reject) => {
		try {
			// to do: geolocation behaviour changes
			// const length = Object.keys(navigator.geolocation).length;

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
					resolve(callersGeolocation);
				});
			} else {
				window.location.href = './location-services.html';
			}
		} catch (error) {
			reject('Geolocation is not supported by this browser.');
		}
	});
};
