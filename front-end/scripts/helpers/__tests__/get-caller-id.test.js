import getCallerIdFromUrl from '../get-caller-id';
import LocalStorageMock from '../mocks/mock-local-storage';

describe('Get Caller Id From Location Href', () => {
	// Save original local storage and location href
	let originalLocalStorage;
	let originalLocationHref;

	beforeAll(() => {
		// Save original local storage and location href

		originalLocalStorage = global.localStorage;
		originalLocationHref = global.location.href;

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

	it('goes to link expired page if URL does not have "id" query parameter', () => {
		global.location.href = 'http://example.com/';
		const mockUrl = './pages/expired-link.html';

		getCallerIdFromUrl();
		expect(window.location.href).toEqual(mockUrl);
	});
});
