import { JSDOM } from 'jsdom';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import { fs } from 'fs';
import {
	showModal,
	allowSharing,
	denySharing,
	closeModal,
} from '../share-location-modal.js';

// Setup
// Read the HTML content from your file
const htmlPath = '../../../pages/share-location.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const page = new JSDOM(htmlContent);

// Set up JSDOM with the HTML content
// global.document = dom.window.document;

describe('Share Location Pop Up Modal', () => {
	it('shows modal on share button click ', async () => {
		console.log(page.window.document.body.innerHTML);
	});
});
