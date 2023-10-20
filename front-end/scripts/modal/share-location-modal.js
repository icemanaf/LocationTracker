import { shareGeolocation } from '../api/post-caller-geolocation.js';

// Elements
const modal = document.getElementById('modal');
const showModalButton = document.getElementById('show-modal-button');
const modalAllowButton = document.getElementById(
	'modal_content__buttons--allow'
);
const modalCancelButton = document.getElementById(
	'modal_content__buttons--cancel'
);

// Functions
export function showModal() {
	modal.style.display = 'flex';
}

export function allowSharing() {
	shareGeolocation();
}

export function denySharing() {
	modal.style.display = 'none';
}

export function closeModal(event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
}

// Events
showModalButton.onclick = showModal;
modalAllowButton.onclick = allowSharing;
modalCancelButton.onclick = denySharing;
window.onclick = closeModal;
