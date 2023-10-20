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

	// it('should not show the modal', () => {
	// 	expect(modal.style.display).toBe('none');
	// });

	// it('shows modal on share button click ', () => {
	// 	showModalButton.addEventListener('click', () => showModal(modal));
	// 	fireEvent.click(showModalButton);

	// 	expect(modal.style.display).toBe('flex');
	// });

	// it('closes modal on deny button click', () => {
	// 	// Open modal
	// 	showModalButton.addEventListener('click', () => showModal(modal));
	// 	fireEvent.click(showModalButton);

	// 	// Close modal
	// 	modalCancelButton.addEventListener('click', () => denySharing(modal));
	// 	fireEvent.click(modalCancelButton);

	// 	expect(modal.style.display).toBe('none');
	// });

	it('closes modal when outside the modal is clicked', async () => {
		// FIX: target window to click
		// window.addEventListener('click', (event) => closeModal(event, modal));

		// Open modal
		showModalButton.addEventListener('click', () => showModal(modal));
		fireEvent.click(showModalButton);
		expect(modal.style.display).toBe('flex');

		//  Close modal
		const clickEvent = new Event('click');
		// const clickEvent = new Event('click', (event) => closeModal(event, modal));
		window.dispatchEvent(clickEvent);

		// // Wait for the event loop to process the click event
		// await new Promise((resolve) => setTimeout(resolve, 0));

		// Assert that the modal.style.display has been updated
		await expect(modal.style.display).toBe('none');
	});

	// it('call function on allow button click', () => {
	// 	//  not improving coverage
	// 	modalAllowButton.addEventListener('click', () => allowSharing());
	// 	fireEvent.click(modalAllowButton);

	// 	expect(allowSharing).toHaveBeenCalled();
	// });
});
