import { JSDOM } from 'jsdom';
import {
	showModal,
	allowSharing,
	denySharing,
	closeModal,
} from '../share-location-modal';

//  Setup
const htmlMock = `
<div id="modal">
<button id="modal_content__buttons--cancel">Cancel</button>
<button id="modal_content__buttons--allow">Allow</button>
</div>`;

const dom = new JSDOM(htmlMock);
global.document = dom.window.document;

describe('Share Location Pop Up Modal', () => {
	it('shows modal on share button click ', () => {
		showModal();

		exp;
	});
});
