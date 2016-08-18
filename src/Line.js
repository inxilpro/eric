import React, { Component } from 'react';

class Line extends Component {
	render() {
		let { line } = this.props;
		if ('string' === typeof line) {
			line = {
				mode: 'narrator',
				text: line
			};
		}

		const { mode, text } = line;

		var prefix;
		switch (mode) {
			case 'narrator':
				prefix = <span className="prefix">Narrator: </span>;
				break;

			case 'input':
				prefix = <span className="prefix">You: </span>;
				break;

			default:
				prefix = null;
				break;
		}

		return (
			<div className={`${mode} line`}>
				{prefix}
				{text}
			</div>
		);
	}
}

export default Line;
