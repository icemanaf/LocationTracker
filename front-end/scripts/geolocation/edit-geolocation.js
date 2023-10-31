import { updatedGeolocation } from '../map/search-map.js';

const callerId = localStorage.getItem('callerId');

const confirmLocationButton = document.getElementById(
	'confirm-location-button'
);

export function updateLocation() {
	localStorage.setItem(
		'callersGeolocation',
		JSON.stringify(updatedGeolocation)
	);
	window.location.href = `./share-location.html?id=${callerId}`;
}

if (confirmLocationButton) {
	confirmLocationButton.addEventListener('click', () => updateLocation());
}
