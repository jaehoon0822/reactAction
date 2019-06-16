// props 는 immutable object 의 역할을 한다.
// 이 부분에 대해서는 의심의 여지가 없다.
// 사실 완벽한 immutable object 로서 역할은 불가능하지만,
// react 상에서는 이러한 역할을 한다고 보아야 한다.
//
// react 에서 state 는  component 내부에서
// 값을 할당할 수 있다고 했다.
// 그렇다면 props 는 가능할까?
// 일단 defaultProps 를 사용하면, 마치 내부에서 
// 값을 할당한것으로 볼것 같지만, 이는 default 라는
// 이름과 같이 초기값을 지정한것 뿐이다.
// props 에 할당된 값이 없으면 defaultProps 의 값이 
// 할당된다. 이는 component 내부에서 할당한 값이 아니다.
// props 는 오직 parent component 에 의해
// child component 에 할당할수 있다.
// 마치 html element 의 attribute 를 할당하는 것 처럼
// props 값을 할당한다.
// 이렇게 할당할수 있다는 것은 더 확장된 개념으로 
// 말하면 parent component 의 state 값을 props 값으로
// 할당할수 있다는 말이다.
// 즉 component 들이 서로간에 state 값을 통신하여 받고
// 내보낼수 있다는 말이다.
// ( 여기서 내보낸다는 말은 다른 말이다.. 바로 뒤에서 
// 설명하겠지만, child component 는 props 에 값을 줄수 없다.
// child componet 가 parent component 에 state 값을 전달해
// 줄수 있는 방법이 있는데, 이는 함수를 사용하여 내보내는
// 방식이다. 앞의 commnetBox 에서 이러한 방법으로
// 코드를 구성했다.)
//
// 이는 서로간의 통신을 할수 있다는 의미이다.
// 마치 객체끼리 message 를 보내는것과 비슷하다고 생각한다.
// state 를 내보내며, state 를 변경하고, state 를 갱신한다.
// 
// 일단 우리는 props 는 parents component 가 child component 에
// 보낼수 있다는것을 알게되었다.
// 이는 한곳에서 다른곳으로 이동하는것과 같다.
// 이를 단반향 통신이라고 한다.
// 책에서는 이러한 규칙을 단방향 데이터 흐름이라고 한다.
// 이말이 더 맞는 것 같다.
// 오직 한곳에서 다른곳으로만 이동 가능하다.
// 이는 갱신된 데이터는 parents component 에서부터 
// child component 로만 전달된다는 것을 의미한다.
//
// 즉, parnets component 는 자신의 상태를 변경하며,
// 변경된 상태를 child component 의 속성으로 전달함으로
// 속성을 변경하게 된다.
//

// 연습 3.3
//

import React, { Component } from 'react';
import PropTypes from 'prop-types';

function Post( props ) {
	return (<div
		className = 'post'
	>
		<h2
			className = 'postUser'
			id = {props.id}
		> {props.user} </h2>
		<span
			className = 'content'
		> {props.content} </span>
	</div>)
};

Post.propTypes = {
	id: PropTypes.number.isRequired,
	user: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
};

Post.defaultProps = {
	id: Date.now(),
	user: 'GilJaeHoon',
	content: 'props 설정을 안했어.. 난 기본값이야.'
};

function Comment( props ) {
	return (<div 
		className = "comment"
	>
		<h3 
			className = "commentUser"
			id = {props.id}
		> {props.user} </h3>
		<span
			className = 'commentContent'
		> {props.content} </span>
	</div>);
};

Comment.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
};

class InputBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			content: '',
			post: props.post,
			comments: props.comments
		}
	}

	userChangeHandler = (e) => {
		const val = e.target.value;
		this.setState({
			user: val
		});
	};

	contentChangeHandler = (e) => {
		const val = e.target.value;
		this.setState({
			content: val
		});
	};

	onSubmitClick = (e) => {
		e.preventDefault();
		let comment = { user: this.state.user, content: this.state.content };
		comment.id = Date.now();
		let newComments = this.state.comments.concat([comment]);  
		this.setState({
			comments: newComments,
			user: '',
			content: ''
		});
		console.log( this.state );
	}; 

	render() {
		return (
			<div>
			
				<Post 
					id = {this.state.post.id}
					user = {this.state.post.user}
					content = {this.state.post.content}
				/>	
				{this.state.comments.map( (val, i) => 
					(<Comment
						key = {i}
						id = {val.id}
						user = {val.user}
						content = {val.content}
					/>)
			   )}
			   <form
			   		onSubmit = {this.onSubmitClick}
			   >
				   <input
				  		type = "text"
						placeholder = "이름"
						value = {this.state.user}
						onChange = {this.userChangeHandler}
				   />
				   <input
				   		type = "text"
						placeholder = "내용을 입력해 주세요."
						value = {this.state.content}
						onChange = {this.contentChangeHandler}
				   />
				   <input
				   		type = "submit"
						value = "입력"
				   />
			   </form>
			</div>
		);
	}
}

export default InputBox;
