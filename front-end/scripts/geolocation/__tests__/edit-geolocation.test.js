import { LocalStorageMock } from '../__mocks__/mock-local-storage';
import { updateLocation } from '../edit-geolocation';

Object.defineProperty(window, 'localStorage', {
	value: new LocalStorageMock(),
});

// Mock DOM
document.body.innerHTML = `
<!DOCTYPE html>
<body>
<button id="set-location-button">Set my location</button>
</body>`;

// Mock DOM elements

const setLocationButton = document.getElementById('set-location-button');

describe('Edit Callers Geolocation', () => {
	it('stores updated geolocation on button click', () => {
		setLocationButton.addEventListener('click', updateLocation());
		fireEvent.click(setLocationButton);
	});
	// it('redirects to home page after storing the updated location',  () => {

	// });
});
