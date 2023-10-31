import { shareGeolocation } from '../api/post-caller-geolocation.js';

//  Vars
const callerId = localStorage.getItem('callerId');

// Elements
const shareLocationButton = document.getElementById('share-location-button');
const editLocationLink = document.getElementById('edit-location-link');

// Functions
export function shareLocation() {
	console.log('share location');
}

// Events
if (shareLocationButton) {
	shareLocationButton.addEventListener('click', () => shareLocation);
}

if (callerId !== null && callerId !== undefined) {
	// Set the href attribute dynamically
	editLocationLink.href = `./edit-location.html?value=${callerId}`;
}
