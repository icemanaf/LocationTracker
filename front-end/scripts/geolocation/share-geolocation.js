import { shareGeolocation } from '../api/post-caller-geolocation.js';

const callerId = localStorage.getItem('callerId');
const shareLocationButton = document.getElementById('share-location-button');
const editLocationLink = document.getElementById('edit-location-link');

// Functions
export function shareLocation() {
	alert('sharing location');
	// shareGeolocation();
}

// Events
if (shareLocationButton) {
	shareLocationButton.addEventListener('click', () => shareLocation());
}

if (callerId !== null && callerId !== undefined) {
	// Set the href attribute dynamically
	editLocationLink.href = `./edit-location.html?id=${callerId}`;
}
