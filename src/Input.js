import React, { Component } from 'react';

class Input extends Component {
	render() {
		return (
			<div className="input">
				<span className="prompt">$</span>
				{this.props.value}
				<span className="cursor">&nbsp;</span>
			</div>
		);
	}
}

export default Input;
