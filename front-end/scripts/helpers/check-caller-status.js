import getCallerIdFromUrl from './get-caller-id.js';
import apiCall from '../api/get-caller-status.js';

export async function checkStatus(id) {
	const response = await apiCall(id);
	const status = response.status;

	if (status === 200) {
		window.location.href = './pages/share-location.html';
	} else if (status === 404) {
		window.location.href = './pages/expired-link.html';
	}
}

async function main() {
	// localStorage.clear();
	const callerId = getCallerIdFromUrl();
	checkStatus(callerId);
}

main();
