import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store';
import createActionCreators from './actionCreators';
import Line from './Line';
import Input from './Input';
import { run } from './engine';
import './game';
import './app.css';

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
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

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
		window.addEventListener('keypress', this.handleKeyPress);
		window.addEventListener('keyup', this.handleKeyUp);
	}

	componentWillUnmount() {
	    window.removeEventListener('keypress', this.handleKeyUp);
	    window.removeEventListener('keyup', this.handleKeyUp);
	}

	handleKeyPress(e) {
		const { key } = e;
		this.props.actions.keypress(key);
		this.scrollDown();
	}

	handleKeyUp(e) {
		const { key } = e;
		if ('Enter' === key || 'Backspace' === key) {
			this.handleKeyPress(e);
		}
	}

	scrollDown() {
		const target = this.refs.app.scrollHeight - this.refs.app.offsetHeight;
		if (this.refs.app.scrollTop !== target) {
			console.log('Scrolling to bottom.');
			this.refs.app.scrollTop = target;
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
