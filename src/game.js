import { start, scene, narrate, go, initial, command, save } from './engine';

function saveCard(name, keep = true)
{
	save(['cards', name], keep);
}

function cardList(cards) {
	return Object.keys(cards)
		.filter(key => cards[key])
		.map(name => `https://www.isleofcards.com/products/magic-the-gathering/${name}`);
}

start(() => {
	initial(() => {
		narrate('You are in a dark room.');
		narrate("There is nothing but the strange sensation that you are not alone (which makes sense, considering you're hearing the voice of a mysterious narrator).");
		narrate("(Also, you get the sense that this narrator is undeniably handsome.)");
		narrate("(Moving on…)");
		narrate('Your leg hurts, as though you recently fell.');
		narrate('What will you do?');

		saveCard('emn-harmless-offering');
		saveCard('test2');
	});

	command(/^help/i, () => 'There is no help here. Only darkness.');
	command('look', () => go('first'));
	command(/^my name is (.*)/i, ($, name) => {
		save('player.name', name);
		narrate(`Nice to meet you, ${name}. But don't think I'm going to take it easy on you just because you're civil.`);
	});
});

scene('first', () => {
	initial($ => {
		narrate('Your eyes acclamate.');
		narrate('You see a small crack of light in the corner.');

		const cards = cardList($.cards);
		cards.forEach(card => narrate(card));

		save('scene.name', 'first');
	});

	command(/^(yell|scream)(\s|$)/i, () => 'No one can hear you.');
	command('next', $ => {
		console.log('$', $);
		go('second');
	});
});

scene('second', () => {
	initial($ => {
		narrate('Works.');
		console.log('$', $);
	});
});