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

	it('saves users geolocation to local storage', () => {
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

		initialiseCallersGeolocation();

		const mockResult = window.localStorage.getItem(
			'callersGeolocation',
			JSON.stringify(mockGeolocation)
		);

		expect(JSON.parse(mockResult)).toEqual({
			latitude: 50.1,
			longitude: 50.1,
		});
	});

	it('catch block', () => {
		const mockGeolocation = {
			getCurrentPosition: jest.fn().mockImplementationOnce((success, error) =>
				Promise.resolve(
					error({
						code: 1,
						message: 'GeoLocation Error',
					})
				)
			),
			watchPosition: jest.fn(),
		};

		global.navigator.geolocation = mockGeolocation;

		// initialiseCallersGeolocation();

		console.log = jest.fn();

		// expect(() => {
		// 	initialiseCallersGeolocation();
		// }).toThrow('Yo');
		initialiseCallersGeolocation();

		expect(console.log.mock.calls[0][0]).toBe(
			'Geolocation is not supported by this browser.'
		);
	});
});
