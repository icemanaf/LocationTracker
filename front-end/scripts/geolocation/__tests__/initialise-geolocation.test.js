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

describe('Initialise Callers Geolocation', () => {
	afterEach(() => {
		window.localStorage.clear();
	});

	it('goes to location services page if navigator geolocation is not allowed', () => {
		const mockUrl = './location-services-info.html';

		Object.defineProperty(window, 'location', {
			value: {
				href: 'http://test.com',
			},
			writable: true,
		});

		initialiseCallersGeolocation();

		expect(window.location.href).toEqual(mockUrl);
	});

	it('get users current geolocation', () => {
		console.log = jest.fn();

		const mockGeolocation = {
			getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
				Promise.resolve(
					success({
						coords: {
							latitude: 50.1,
							longitude: 50.1,
						},
					})
				)
			),
		};

		global.navigator.geolocation = mockGeolocation;

		const usersGeolocation = initialiseCallersGeolocation();
		const mockResult = {
			latitude: 50.1,
			longitude: 50.1,
		};

		expect(usersGeolocation).toEqual(mockResult);
	});
});
