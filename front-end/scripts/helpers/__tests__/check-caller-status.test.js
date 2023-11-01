import { checkStatus } from '../check-caller-status';
import apiCall from '../../api/get-caller-status';

const mockCallerId = '123';
// jest.mock('./check-caller-status.test.js');

describe('Check Callers Status', () => {
	// Mock fetch
	// global.fetch = jest.fn();

	beforeAll(() => {});

	afterAll(() => {});

	it('calls the GET apiCall and returns status', async () => {
		console.log('hello world');
		// global.fetch = jest.fn().mockResolvedValue({
		// 	status: 200,
		// 	json: async () => ({ data: mockData }),
		// });
		// // Mock the implementation of myfunc to return a value
		// jest.spyOn(apiCall, 'default').mockResolvedValue('mocked foo');
		// const result = await checkStatus(mockCallerId);
		// // Assert that myfunc was called
		// expect(apiCall).toHaveBeenCalled();
		// // Assert the result returned by your function
		// expect(result).toBe('mocked foo');
	});
});
