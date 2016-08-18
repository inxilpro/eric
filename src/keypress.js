export default function keypress(code) {
	if (13 === code) {
		return 'Enter';
	} else if (8 === code) {
		return 'Backspace';
	} else if (code >= 32 && code <= 126) {
		return String.fromCharCode(code);
	}

	return;
}