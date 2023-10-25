import { getCallersGeoLocation } from '../get-geolocation';
import { initialiseCallersGeolocation } from '../initialise-geolocation';

// Local storage mock
class LocalStorageMock {
	constructor() {
		this.store = {};
	}

	clear() {
		this.store = {};
	}

	getItem(key) {
		return this.store[key] || null;
	}

	setItem(key, value) {
		this.store[key] = String(value);
	}
}

Object.defineProperty(window, 'localStorage', {
	value: new LocalStorageMock(),
});

describe('Get Callers Geolocation', () => {
	afterEach(() => {
		window.localStorage.clear();
	});

	// it('Throws an error if the browser does not support geolocation', () => {
	// 	expect(async () => {
	// 		await getCallersGeoLocation();
	// 	}).rejects.toThrow();
	// });

	it('retrieves callers geolocation from local storage', async () => {
		const mockGeolocation = {
			latitude: 1,
			longitude: 1,
		};

		window.localStorage.setItem(
			'callersGeolocation',
			JSON.stringify(mockGeolocation)
		);

		const result = await getCallersGeoLocation();

		expect(result).toEqual(mockGeolocation);
	});

	// it('calls function to initialise users geolocation if not in local storage', async () => {
	// 	getCallersGeoLocation();

	// 	expect(initialiseCallersGeolocation).toHaveBeenCalled();
	// });
});
