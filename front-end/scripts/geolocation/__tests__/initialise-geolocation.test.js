import { initialiseCallersGeolocation } from '../initialise-geolocation';
import { LocalStorageMock } from '../__mocks__/mock-local-storage';
import {
	mockGeolocationResolve,
	mockGeolocationReject,
} from '../__mocks__/mock-navigator-geolocation';

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

	it('get users current geolocation', async () => {
		global.navigator.geolocation = mockGeolocationResolve;

		const usersGeolocation = await initialiseCallersGeolocation();
		const mockResult = {
			latitude: 50.1,
			longitude: 50.1,
		};

		expect(usersGeolocation).toEqual(mockResult);
	});

	it('saves users geolocation to local storage', async () => {
		global.navigator.geolocation = mockGeolocationResolve;

		const usersGeolocation = initialiseCallersGeolocation();

		const mockResult = window.localStorage.getItem('callersGeolocation');

		expect(JSON.parse(mockResult)).toEqual({ latitude: 50.1, longitude: 50.1 });
	});

	it('handles navigator geolocation error', async () => {
		global.navigator.geolocation = mockGeolocationReject;

		const result = initialiseCallersGeolocation();

		expect(result).rejects.toEqual(
			'Geolocation is not supported by this browser.'
		);
	});
});
