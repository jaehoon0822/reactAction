import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BoxedGroup extends Component {
	render() {
		return React.createElement( 'div', { className: "box"}, 
			React.createElement( 'h2', { className: "h2" }, 
			this.props.title ),
			React.createElement( 'p', { className: "content" },
			this.props.frontContent, 
				React.createElement( 'a', { href: '#'},
				this.props.anchor_1
				),
			this.props.backContent,
				React.createElement( 'a', { href: '#' },
				this.props.anchor_2
				),
			),
			React.createElement( 'button',{ className: "btn"},
			this.props.btnName )
		)
	}
}

BoxedGroup.propTypes = {
	title: PropTypes.string.isRequred,
	frontContent: PropTypes.string.isRequred,
	backContent: PropTypes.string.isRequred,
	anchor_1: PropTypes.string.isRequred,
	anchor_2: PropTypes.string.isRequred,
	btnName: PropTypes.string.isRequred
}

export default BoxedGroup;
