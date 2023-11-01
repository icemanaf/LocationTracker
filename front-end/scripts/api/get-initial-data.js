import getCallerIdFromUrl from '../helpers/get-caller-id.js';

export async function apiCall(callerId) {
	const apiUrl = `https://u4hdqm5uvkvdthwk54elxlkpbi0wpdef.lambda-url.eu-west-1.on.aws?id=${callerId}`;
	let body;

	try {
		const response = await fetch(apiUrl, {
			method: 'GET',
			mode: 'cors',
			headers: {
				Accept: 'application/json',
			},
		});

		const status = response.status;

		if (status === 200) {
			const data = await response.json();
			body = { credentials: data, status: status };
		} else if (status === 404) {
			body = { credentials: null, status: status };
		}
		return body;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export async function checkStatus(id) {
	const response = await apiCall(id);
	const status = response.status;

	if (status === 200) {
		window.location.href = './pages/share-location.html';
	} else if (status === 404) {
		window.location.href = './pages/expired-link.html';
	}
	// Add else for any other status? refresh info page?
}
