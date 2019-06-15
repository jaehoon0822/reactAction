import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
	render() {
		return React.createElement( 'div', { className: 'post'},
			React.createElement( 'h1', { className: 'postAuthor', id: this.props.id },
			this.props.user ),
			React.createElement( 'span', { className: 'content' }, 
			this.props.content ),
			this.props.children
		)
	};
}

class Comment extends Component {
	render() {
		return React.createElement( 'div', { className: 'comment' },
			React.createElement( 'h2', { className: 'commentAuthor', id: this.props.id },
			this.props.user,
			),
			React.createElement( 'span', { className: 'content' },
			this.props.content
			),
			this.props.children
		)
	};
}

class CreateComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			content: ''
		}
	}

	render() {

		return React.createElement( 'form', { className: 'createComment' },
			React.createElement( 'input', {
				className: 'userName',
				type: 'text',
				placeholder: '이름',
				value: this.state.user
			} ),
			React.createElement( 'input', {
				clasName: 'textBar',
				type: 'text',
				placeholder: '내용을 입력해 주세요.',
				value: this.state.content 
			} ),
			React.createElement( 'button', {
				className: 'btn',
			}, '입력' )
		)
	};
}

Post.propTypes = {
	user: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
}

Comment.propTypes = {
	user: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
}


export { Post, Comment, CreateComment };
