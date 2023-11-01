import { apiCall, checkStatus } from '../get-initial-data';

const mockId = '123';
const mockData = {
	MapName: 'map-name',
	PoolId: 'pool-id',
	Region: 'region',
};

// Mock fetch
global.fetch = jest.fn();

describe('Get Callers Status From API', () => {
	it('returns credentials and a status when successful', async () => {
		global.fetch.mockResolvedValueOnce({
			status: 200,
			json: async () => ({ data: mockData }),
		});

		const result = await apiCall(mockId);

		expect(result).toEqual({
			credentials: {
				data: { MapName: 'map-name', PoolId: 'pool-id', Region: 'region' },
			},
			status: 200,
		});
	});

	it('returns null credentials and a status in a 404 error', async () => {
		global.fetch.mockResolvedValueOnce({
			status: 404,
		});

		const result = await apiCall(mockId);

		expect(result).toEqual({
			credentials: null,
			status: 404,
		});
	});

	it('handles network errors', async () => {
		global.fetch.mockRejectedValueOnce(new Error('Network error'));

		try {
			await apiCall(mockId);
		} catch (error) {
			expect(error.message).toBe('Network error');
		}
	});
});

describe('Check Callers Status', () => {
	let originalLocationHref;

	beforeAll(() => {
		originalLocationHref = global.location.href;

		// Mock window.location.href
		Object.defineProperty(global, 'location', {
			value: { href: 'http://example.com/' },
		});
	});

	afterEach(() => {
		Object.defineProperty(global, 'location', {
			originalLocationHref,
		});
	});

	it('goes to share location page if status is 200', async () => {
		const mockUrl = './pages/share-location.html';

		global.fetch.mockResolvedValueOnce({
			status: 200,
			json: async () => ({ data: mockData }),
		});

		await checkStatus(mockId);
		expect(window.location.href).toEqual(mockUrl);
	});

	it('goes to expired link page if status is 404', async () => {
		const mockUrl = './pages/expired-link.html';

		global.fetch.mockResolvedValueOnce({
			status: 404,
			json: async () => ({ data: null }),
		});

		await checkStatus(mockId);
		expect(window.location.href).toEqual(mockUrl);
	});
});
