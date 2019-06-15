//import React from 'react'
//import { render } from 'react-dom';
//
//const node = document.getElementById( 'root' );
//const root = React.createElement( 'div', {}, 
//	React.createElement('h1', {}, 'Hello, World',
//		React.createElement('a', {href: '#'},
//			React.createElement('h1', {}, 'React In Action'),
//			React.createElement('em', {}, '... and now it really is!')
//		)
//	)
//);
//
//render( root, node );


// 2.2.3
//

//import React from 'react';
//import ReactDom from 'react-dom';
//import PropTypes from 'prop-types';
//
//class Post extends React.Component {
//	render() {
//		return React.createElement('div', { className:"post" }, 
//			React.createElement('h1', { className:'postAuthor', id: this.props.id }, 
//			this.props.name), 
//			React.createElement('span', { className: "postBody" }, 
//			this.props.content
//			),
//			this.props.children
//		);
//	};
//}
//
//Post.propTypes = {
//	id: PropTypes.number.isRequired,
//	content: PropTypes.string.isRequired,
//	name: PropTypes.string.isRequired,
//};
//
//class Comments extends React.Component {
//	render() {
//		return React.createElement('div', { className: "comment" },
//			React.createElement('h2', { className: "commentAuthor", id: this.props.id }, 
//			this.props.name),
//			React.createElement('span', { className: 'content' },
//			this.props.content
//			)
//		);
//	};
//}
//
//Comments.proptypes = {
//	id: PropTypes.number.isRequired,
//	name: PropTypes.string.isRequired,
//	content: PropTypes.string.isRequired,
//};
//
//const App = React.createElement( Post, {
//		id: 1, 
//		name: 'Bill', 
//		content: 'Good Reacts' 
//	}, 
//	React.createElement( Comments, {
//		id: 2, 
//		name: 'Jhon', 
//		content: ' Hi!' 
//	})
//);
//
//

//// 2.2 연습문제
//import React from 'react';
//import ReactDom from 'react-dom';
//import Box from './reverseEngineering';
//
//const App = React.createElement( Box, {
//	title: 'Discover interesting projects and people to populate your personal news feed.',
//	frontContent: 'Your news feed helps you keep up with recent activity on repositories you',
//	backContent: 'and people you.',
//	anchor_1: 'Watch',
//	anchor_2: 'Follow',
//	btnName: 'Explore Git'
//});
//
//const node = document.getElementById( 'root' );
//ReactDom.render( App, node );
//

// 2.3.2
//

//import React from 'react';
//import ReactDom from 'react-dom';
//import {Post, Comment, CreateComment } from '../src/Post';
//
//
//
//const App = React.createElement( Post, {
//		user: 'Bill',
//		id: 1,
//		content: '니체는 말했다. 재능을 논하지 말라. 재능없이 위인이 된자들을 몇이든 대답할수 있다.'
//	}, 
//	React.createElement( Comment, {
//			user: 'ㅇㅇ',
//			id: 1,
//			content: 'Aswesome!!'
//		},
//		React.createElement( CreateComment, {})
//	)
//);
//
//const node  = document.getElementById('root');
//ReactDom.render( App, node );
//
//2.3
//
//

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import CommentBox from './commentBox';

const data = {
	post: {
		user: 'Bill',
		id: 1,
		content: '니체는 말했지. 재능에 대해서 말하지 말라고, 재능없이 성공한 이를 몇이든 댈수있다고.'
	},
	comments: [
		{ user: 'hi',
		  id: 1,
		  content: 'aswesome!!'
		},
		{ user: 'OO',
		  id: 2,
		  content: 'from the books name "Grit".'
		},
		{ user: 'Wow',
		  id: 3,
		  content: 'Wow Good.'
		},
	]
};

const node = document.getElementById( 'root' );

ReactDom.render( React.createElement( CommentBox, {
	post: data.post,
	comments: data.comments
}), node ) 
