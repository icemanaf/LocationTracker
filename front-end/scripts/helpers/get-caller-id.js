function getCallerIdFromUrl() {
	const id = new URL(location.href).searchParams.get('id');
	localStorage.setItem('callerId', id);
	return id;
}

export default getCallerIdFromUrl;
