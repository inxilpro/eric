import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import initialState from './initialState';
import reducer from './store';

export default function configureStore() {
	let middleware = applyMiddleware();
	let enhancer;

	if (process && process.env && 'production' !== process.env.NODE_ENV) {
		let middlewares = [require('redux-immutable-state-invariant')()]
		middleware = applyMiddleware(...middlewares);

		let getDebugSessionKey = function () {
			const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
			return (matches && matches.length) ? matches[1] : null;
		};

		enhancer = compose(
			middleware,
			window.devToolsExtension ? window.devToolsExtension() : noop => noop,
			persistState(getDebugSessionKey())
		);
	} else {
		enhancer = compose(middleware);
	}

	const store = createStore(reducer, initialState, enhancer);

	// Enable Webpack hot module replacement for reducers
	if (module.hot) {
		module.hot.accept('./store', () =>
			store.replaceReducer(require('./store').default)
		);
	}

	return store;
}