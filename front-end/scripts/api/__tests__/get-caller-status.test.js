import apiCall from '../get-caller-status';

const mockData = {
	MapName: 'map-name',
	PoolId: 'pool-id',
	Region: 'region',
};

describe('Get Callers Status From API', () => {
	// Mock fetch
	global.fetch = jest.fn();

	it('returns credentials and a status when successful', async () => {
		global.fetch.mockResolvedValueOnce({
			status: 200,
			json: async () => ({ data: mockData }),
		});

		const result = await apiCall();

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

		const result = await apiCall();

		expect(result).toEqual({
			credentials: null,
			status: 404,
		});
	});

	it('handles network errors', async () => {
		global.fetch.mockRejectedValueOnce(new Error('Network error'));

		try {
			await apiCall();
		} catch (error) {
			expect(error.message).toBe('Network error');
		}
	});
});
