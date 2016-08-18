
export default function createActionCreators(actions, dispatch) {
	const creators = {};
	Object.keys(actions).forEach(key => {
		creators[key] = (...args) => dispatch(actions[key].apply(this, args));
	});
	return creators;
}