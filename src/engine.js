import { set as setAtPath } from 'object-path';
import createActionCreators from './actionCreators';
import * as actionCreators from './store';

const scenes = {};
const NO_INPUT = Symbol();

var actions, store, lastInput = NO_INPUT;
var openingScene = () => null;

export function run(scene, input = NO_INPUT)
{
	const state = store.getState();

	lastInput = input;

	if (!scene) {
		return openingScene(state.gameData);
	}

	if (scenes[scene]) {
		return scenes[scene](state.gameData);
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
		const state = store.getState();
		fn(state.gameData);
	}
}

export function command(matcher, fn) {
	const state = store.getState();
	var result;

	console.log('matcher', matcher, 'lastInput', lastInput);

	if (NO_INPUT === lastInput) {
		return;
	}

	if (matcher instanceof RegExp) {
		const matches = lastInput.match(matcher);
		console.log(matches);
		if (matches && matches.length) {
			matches[0] = (state.gameData);
			result = fn.apply(fn, matches);
		}
	}

	if (lastInput === matcher) {
		result = fn(state.gameData);
	}

	if (result && 'string' === typeof result) {
		narrate(result);
	}
}

export function save(path, data) {
	const newData = {};
	setAtPath(newData, path, data);
	console.log('save', newData);
	actions.setGameData(newData);
}