import { initialiseCallersGeolocation } from '../initialise-geolocation';
import LocalStorageMock from '../../helpers/mocks/mock-local-storage';
import {
	mockNavigatorGeolocationReject,
	mockNavigatorGeolocationResolve,
} from '../../helpers/mocks/mock-navigator-geolocation';

Object.defineProperty(window, 'localStorage', {
	value: new LocalStorageMock(),
});

describe('Initialise Callers Current Geolocation', () => {
	// Save original local storage and location href
	let originalLocalStorage;
	let originalLocationHref;

	beforeEach(() => {
		// Save original local storage
		originalLocalStorage = global.localStorage;
		originalLocationHref = global.location.href;

		// Mock global.localStorage
		Object.defineProperty(window, 'localStorage', {
			value: new LocalStorageMock(),
		});

		// Mock global.location.href
		Object.defineProperty(window, 'location', {
			value: { href: 'http://example.com/?id=123' },
		});
	});

	afterEach(() => {
		// Replace global objects storage with original
		Object.defineProperty(global, 'localStorage', {
			originalLocalStorage,
		});

		Object.defineProperty(global.location, 'href', {
			originalLocationHref,
		});

		global.navigator.geolocation = null;
	});

	it('goes to location services page if navigator geolocation is not allowed', () => {
		const mockUrl = './location-services.html';

		initialiseCallersGeolocation();

		expect(window.location.href).toEqual(mockUrl);
	});

	it('gets users current latitude and longitude and saves it to local storage', async () => {
		global.navigator.geolocation = mockNavigatorGeolocationResolve;

		const result = await initialiseCallersGeolocation();
		const expectedResult = {
			latitude: 50.1,
			longitude: 50.1,
		};
		const storedGeolocation = window.localStorage.getItem('callersGeolocation');

		expect(result).toEqual(expectedResult);
		expect(result).toEqual(JSON.parse(storedGeolocation));
	});

	it('handles navigator geolocation error', () => {
		global.navigator.geolocation = mockNavigatorGeolocationReject;

		const result = initialiseCallersGeolocation();

		expect(result).rejects.toEqual(
			'Geolocation is not supported by this browser.'
		);
	});
});
