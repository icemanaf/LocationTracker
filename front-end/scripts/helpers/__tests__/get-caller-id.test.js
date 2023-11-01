import getCallerIdFromUrl from '../get-caller-id';
import LocalStorageMock from '../__mocks__/mock-local-storage';

describe('Get Caller Id From Location Href', () => {
	// Save original local storage and location href
	let originalLocalStorage = global.localStorage;
	let originalLocationHref = global.location.href;

	beforeAll(() => {
		// Mock global.localStorage
		Object.defineProperty(window, 'localStorage', {
			value: new LocalStorageMock(),
		});

		// Mock global.location.href
		Object.defineProperty(window, 'location', {
			value: { href: 'http://example.com/?id=123' },
		});
	});

	afterAll(() => {
		// Replace global objects storage with original
		Object.defineProperty(global, 'localStorage', {
			originalLocalStorage,
		});

		Object.defineProperty(global.location, 'href', {
			originalLocationHref,
		});
	});

	it('gets and stores the "id" query parameter from the URL', () => {
		const id = getCallerIdFromUrl();

		expect(id).toBe('123');
		expect(window.localStorage.getItem('callerId')).toBe('123');
	});

	it('returns null if URL does not have "id" query parameter', () => {
		global.location.href = 'http://example.com/';

		const id = getCallerIdFromUrl();

		expect(id).toBeNull();
		expect(global.localStorage.getItem('id')).toBeNull();
	});
});
