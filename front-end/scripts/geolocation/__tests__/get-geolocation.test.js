import { getCallersGeoLocation } from '../get-geolocation';
import { initialiseCallersGeolocation } from '../initialise-geolocation';
import { LocalStorageMock } from '../__mocks__/mock-local-storage';
import {
	mockNavigatorGeolocationResolve,
	mockNavigatorGeolocationReject,
} from '../__mocks__/mock-navigator-geolocation';

Object.defineProperty(window, 'localStorage', {
	value: new LocalStorageMock(),
});

jest.mock('../initialise-geolocation');

describe('Get Callers Geolocation', () => {
	afterEach(() => {
		window.localStorage.clear();
		global.navigator.geolocation = null;
		initialiseCallersGeolocation.mockClear();
	});

	it('retrieves callers geolocation from local storage if it exists', async () => {
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

	it('calls function to initialise users geolocation if not in local storage', async () => {
		global.navigator.geolocation = mockNavigatorGeolocationResolve;

		await getCallersGeoLocation();

		await expect(initialiseCallersGeolocation).toHaveBeenCalledTimes(1);
	});
});
