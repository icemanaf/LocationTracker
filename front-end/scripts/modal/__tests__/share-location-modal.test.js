import { fireEvent } from '@testing-library/dom';
import {
	showModal,
	allowSharing,
	denySharing,
	closeModal,
} from '../share-location-modal.js';

jest.mock('../share-location-modal.js', () => ({
	...jest.requireActual('../share-location-modal.js'),
	allowSharing: jest.fn(),
}));

document.body.innerHTML = `
<!DOCTYPE html>
<body>
<button id="show-modal-button">Share my location</button>
<div id="modal" style="display:none;">
<button id="modal_content__buttons--cancel" class="modal-button">Cancel</button>
<button id="modal_content__buttons--allow" class="modal-button">Allow</button>
</div>
</body>`;

describe('Share Location Pop Up Modal', () => {
	const modal = document.getElementById('modal');
	const showModalButton = document.getElementById('show-modal-button');
	const modalAllowButton = document.getElementById(
		'modal_content__buttons--allow'
	);
	const modalCancelButton = document.getElementById(
		'modal_content__buttons--cancel'
	);

	afterEach(() => {
		modal.style.display = 'none';
	});

	it('should not show the modal', () => {
		expect(modal.style.display).toBe('none');
	});

	it('shows modal on share button click ', () => {
		showModalButton.addEventListener('click', () => showModal(modal));
		fireEvent.click(showModalButton);

		expect(modal.style.display).toBe('flex');
	});

	it('closes modal on deny button click', () => {
		modalCancelButton.addEventListener('click', () => denySharing(modal));
		fireEvent.click(modalCancelButton);

		expect(modal.style.display).toBe('none');
	});

	it('closes modal when outside the modal is clicked', () => {
		window.addEventListener('click', (event) => closeModal(event, modal));

		const clickEvent = new Event('click');
		window.dispatchEvent(clickEvent);

		expect(modal.style.display).toBe('none');
	});

	it('call function on allow button click', () => {
		modalAllowButton.addEventListener('click', () => allowSharing());
		fireEvent.click(modalAllowButton);

		expect(allowSharing).toHaveBeenCalled();
	});
});
