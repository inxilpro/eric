import { start, scene, narrate, go, initial, command, save } from './engine';

function saveCard(name, keep = true)
{
	save(['cards', name], keep);
}

function cardList($) {
	const { cards } = $;
	return Object.keys(cards)
		.filter(key => cards[key])
		.map(name => `https://www.isleofcards.com/products/magic-the-gathering/${name}`);
}

function common() {
	command(/^help/i, () => 'There is no help here. Only darkness.');
	command(/^(?:yell|scream|shout)(?:\s(.*))?$/i, ($, words) => {
		narrate(`There's no one here to hear your desperate words.`);
	});
}

start(() => {
	initial(() => {
		narrate('Pick a card. Any card.');
		narrate('(Pick a number from 1-3)');
	});

	common();
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
			default:
				narrate('Pick something!');
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

		narrate('...');
		go(null);
	});

	common();
	command(/^(yell|scream)(\s|$)/i, () => 'No one can hear you.');
});