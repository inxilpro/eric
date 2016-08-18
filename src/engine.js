import createActionCreators from './actionCreators';
import * as actionCreators from './store';

const scenes = {};
const NO_INPUT = Symbol();

var actions, store, lastInput = NO_INPUT;
var openingScene = () => null;

export function run(scene, input = NO_INPUT, state)
{
	lastInput = input;

	if (!scene) {
		return openingScene(input, state);
	}

	if (scenes[scene]) {
		return scenes[scene](input, state);
	}

	actions.line({
		mode: 'narrator',
		text: "Hmm. Something went wrong! I don't have this scene."
	});
}

export function setStore(newStore)
{
	store = newStore;
	actions = createActionCreators(actionCreators, store.dispatch);
}

export function start(fn) {
	openingScene = fn;
}

export function scene(name, fn) {
	scenes[name] = fn;
}

export function narrate(text) 
{
	actions.line({
		mode: 'narrator',
		text
	});
}

export function go(scene) 
{
	actions.go(scene);
}

export function initial(fn) {
	if (NO_INPUT === lastInput) {
		fn();
	}
}

export function command(matcher, fn) {
	if (lastInput === matcher) {
		const result = fn();
		if ('string' === typeof result) {
			narrate(result);
		}
	}
}