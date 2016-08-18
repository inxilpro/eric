
import extend from 'extend';
import { createAction, handleActions } from 'redux-actions';
import kp from './keypress';
import { run } from './engine';

// Actions
const KEYPRESS = 'eric/KEYPRESS';
const LINE = 'eric/LINE';
const GO = 'eric/GO';
const SET_GAME_DATA = 'eric/SET_GAME_DATA';

// Reducer
const reducer = handleActions({
	[KEYPRESS]: (state, { payload }) => {
		const { currentLine, lines } = state;
		const key = kp(payload);

		if ('Enter' === key && currentLine.length) {
			// Send to Engine
			process.nextTick(() => run(state.scene, currentLine));

			// And to UI
			const nextLines = lines.slice();
			nextLines.push({
				mode: 'input',
				text: currentLine
			});
			return {
				...state,
				currentLine: '',
				lines: nextLines
			}
		} else if ('Backspace' === key && currentLine.length) {
			return {
				...state,
				currentLine: currentLine.slice(0, -1)
			};
		} else if (1 === key.length) {
			return {
				...state,
				currentLine: (currentLine + key)
			}
		}

		return state;
	},

	[LINE]: (state, { payload }) => {
		const { lines } = state;
		const nextLines = lines.slice();
		nextLines.push(payload);
		return {
			...state,
			lines: nextLines
		}
	},

	[GO]: (state, { payload }) => {
		// Send to Engine
		process.nextTick(() => run(payload));

		return {
			...state,
			scene: payload
		}
	},
	
	[SET_GAME_DATA]: (state, { payload }) => {
		return {
			...state,
			gameData: extend(true, {}, state.gameData, payload)
		}
	}
});

// Action Creators
const keypress = createAction(KEYPRESS);
const line = createAction(LINE);
const go = createAction(GO);
const setGameData = createAction(SET_GAME_DATA);

// Export
export {
	reducer as default,
	keypress,
	line,
	go,
	setGameData
}