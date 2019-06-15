import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement( 'div', { className: 'post' },
			React.createElement( 'h1', { className: 'postAuthor'},
				this.props.user ),
			React.createElement( 'span', { className: 'postContent', id: this.props.id },
				this.props.content ),
			this.props.childern
		)
	};
}

class Comment extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement( 'div', { className: 'comment' },
			React.createElement( 'h2', { className: 'commentAuthor', id: this.props.id },
				this.props.user),
			React.createElement( 'span', { className: 'commentContent' },
				this.props.content)
		)	
	};
}

class Boxform extends Component {
	constructor(props) {
		super(props);	
		this.state = {
			userText: '',
			contentText: '',
		};
		this.changeUser = this.changeUser.bind( this );
		this.changeContent = this.changeContent.bind( this );
		this.changeSubmit = this.changeSubmit.bind( this );
	}

	changeUser(e) {
		const val = e.target.value;
		this.setState(() => ({
			userText: val  
		}))	
	}

	changeContent(e) {
		const val = e.target.value;
		this.setState(() => ({
			contentText: val
		}))
	}
	changeSubmit(e) {
		e.preventDefault();
		this.props.onChangeComment({
			user: this.state.userText.trim(),
			content: this.state.contentText.trim(),
		})
		this.setState(() => ({ userText: '', contentText: '' }));
	}

	render() {
		return React.createElement( 'form', { 
			className: 'boxForm',
			onSubmit: this.changeSubmit
			}, 
			React.createElement( 'input', {
				type: 'text',
				value: this.state.userText,
				placeholder: '이름',
				onChange: this.changeUser
			}),
			React.createElement( 'input', {
				type: 'text',
				value: this.state.contentText,
				placeholder: '내용을 입력해 주세요.',
				onChange: this.changeContent,
			}),
			React.createElement( 'input', {
				type: 'submit',
				value: 'Post'
			})
		)
	};
}

class CommentBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: this.props.comments
		};
		this.changeComment = this.changeComment.bind(this);
	};	

	changeComment( obj ) {
		const comments = this.state.comments;
		obj.id = Date.now();
		const newComments = comments.concat([obj]);
		console.log( newComments )
		this.setState(() => ({
			comments: newComments
		}))
	};
	
	render() {
		return React.createElement( 'div', { className: 'commontBox' },
			React.createElement( Post, {
				id: this.props.post.id,
				content: this.props.post.content,
				user: this.props.post.user
			}),
			this.state.comments.map( (val, i) => {
				return React.createElement( Comment, {
					id: val.id,
					content: val.content,
					user: val.user
				});
			}),
			React.createElement( Boxform, { onChangeComment: this.changeComment })
		);
	};
}

Post.propTypes = {
	user: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired
}

Comment.propTypes = {
	user: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
}

Boxform.propTypes = {
	onChangeComment: PropTypes.func.isRequired
}
CommentBox.propTypes = {
	post: PropTypes.object, 
	comments: PropTypes.arrayOf( PropTypes.object ) 
}

export default CommentBox;
