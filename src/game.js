import { start, scene, narrate, go, initial, command } from './engine';

start(() => {
	initial(() => {
		narrate('You are in a dark room.');
		narrate('There is nothing but a strange sensation that you are not alone.');
		narrate('Your leg hurts, as though you recently fell.');
		narrate('What will you do?');
	});

	command('help', () => 'There is no help here.');
	command('look', () => go('first'));
});

scene('first', () => {
	initial(() => {
		narrate('Your eyes acclamate.');
		narrate('You see a small crack of light in the corner.');
	});
});