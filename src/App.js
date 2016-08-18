import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store';
import createActionCreators from './actionCreators';
import Line from './Line';
import Input from './Input';
import { run } from './engine';
import './game';
import './app.css';

if (module.hot) {
	module.hot.accept('./game', () => require('./game'));
}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: createActionCreators(actions, dispatch)
	}
}

class App extends Component {
	constructor(props) {
		super(props);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);

		process.nextTick(() => run());
	}

	render() {
		setTimeout(() => this.scrollDown(), 0);
		return (
			<div className="app" ref="app">
				{this.props.lines.map((line, idx) => <Line key={idx} line={line} />)}
				<Input value={this.props.currentLine} />
			</div>
		);
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('keypress', this.handleKeyPress);
	}

	componentWillUnmount() {
	    window.removeEventListener('keydown', this.handleKeyDown);
		window.removeEventListener('keypress', this.handleKeyPress);
	}

	handleKeyPress(e) {
		if (e.metaKey || e.ctrlKey || e.altKey) {
			return;
		}

		// Handle backspace and enter in keydown for cross-compat reasons
		if (8 === e.keyCode || 13 === e.keyCode) {
			return;
		}

		this.props.actions.keypress(e.keyCode);
		this.scrollDown();
	}

	handleKeyDown(e) {
		if (8 === e.keyCode || 13 === e.keyCode) {
			this.props.actions.keypress(e.keyCode);
			this.scrollDown();
		}
	}

	scrollDown() {
		const target = this.refs.app.scrollHeight - this.refs.app.offsetHeight;
		if (this.refs.app.scrollTop !== target) {
			this.refs.app.scrollTop = target;
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
