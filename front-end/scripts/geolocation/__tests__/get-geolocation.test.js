import { getCallersGeoLocation } from '../get-geolocation';
import { initialiseCallersGeolocation } from '../initialise-geolocation';
import LocalStorageMock from '../../helpers/mocks/mock-local-storage';
import { mockNavigatorGeolocationResolve } from '../../helpers/mocks/mock-navigator-geolocation';

jest.mock('../initialise-geolocation');

Object.defineProperty(window, 'localStorage', {
	value: new LocalStorageMock(),
});

describe('Get Callers Geolocation', () => {
	afterEach(() => {
		window.localStorage.clear();
		global.navigator.geolocation = null;
		jest.clearAllMocks();
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

		expect(initialiseCallersGeolocation).toHaveBeenCalledTimes(1);
	});

	it('throws an error if an error is caught calling initialisingCallersGeolocation', async () => {
		initialiseCallersGeolocation.mockRejectedValueOnce(
			new Error('Error initialising geolocation')
		);

		try {
			await getCallersGeoLocation();
		} catch (error) {
			expect(error.message).toBe('Error initialising geolocation');
		}
	});
});
