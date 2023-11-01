function getCallerIdFromUrl() {
	const id = new URL(location.href).searchParams.get('id');

	if (id) {
		localStorage.setItem('callerId', id);
		return id;
	} else {
		window.location.href = './pages/expired-link.html';
	}
}

export default getCallerIdFromUrl;
