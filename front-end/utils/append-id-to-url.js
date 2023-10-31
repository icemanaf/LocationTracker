const callerId = localStorage.getItem('callerId');
const headerLink = document.getElementById('header__link');

if (callerId) {
	headerLink.href = `../index.html?id=${callerId}`;
}
