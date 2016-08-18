import { start, scene, narrate, go, initial, command, save } from './engine';

function saveCard(name, keep = true)
{
	save(['cards', name], keep);
}

function cardList($) {
	return Object.keys($.cards)
		.filter(key => cards[key])
		.map(name => `https://www.isleofcards.com/products/magic-the-gathering/${name}`);
}

start(() => {
	initial(() => {
		narrate('Pick a card. Any card.');
		narrate('(Pick a number from 1-3)');
	});

	command(/^help/i, () => 'There is no help here. Only darkness.');
	command(/([1-3])/, ($, pick) => {
		switch (pick) {
			case '1':
				saveCard('emn-harmless-offering');
				break;
			case '2':
				saveCard('ori-demonic-pact');
				break;
			case '3':
				saveCard('emn-coax-from-the-blind-eternities');
				break;
		}

		go('summary');
	});
});

scene('summary', () => {
	initial($ => {
		narrate('Nice choice. You got:');

		const cards = cardList($);
		cards.forEach(card => narrate(card));

		narrate('That\'s pretty much it…');
	});

	command(/^(yell|scream)(\s|$)/i, () => 'No one can hear you.');
});