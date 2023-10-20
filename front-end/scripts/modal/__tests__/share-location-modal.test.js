import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';

import {
	showModal,
	allowSharing,
	denySharing,
	closeModal,
} from '../share-location-modal.js';

let page;
document.body.innerHTML = `
<!DOCTYPE html>
<body>
<button id="show-modal-button">Share my location</button>
<div id="modal" style="display:none;">
<button id="modal_content__buttons--cancel">Cancel</button>
<button id="modal_content__buttons--allow">Allow</button>
</div>
</body>`;

describe('Share Location Pop Up Modal', () => {
	it('should not show the modal', async () => {
		const modal = document.getElementById('modal');
		expect(modal.style.display).toBe('none');
	});

	it('shows modal on share button click ', async () => {
		const modal = document.getElementById('modal');
		const showModalButton = document.getElementById('show-modal-button');

		showModalButton.addEventListener('click', () => showModal(modal));
		fireEvent.click(showModalButton);

		expect(modal.style.display).toBe('flex');
	});
});
