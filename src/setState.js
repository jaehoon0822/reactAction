// setState 의 가변 상태
//
// state 라는것은 매우 유용하다.
// 객체지향적으로 보았을때, 캡슐화 되어 있으며,
// 접근하기 위해서는 method 를 통해 접근한다.
// 즉 state 라는 것은 private 해야 한다.
// 이 state 값은 가변과 불변상태로 나누어진다.
// 불변( immutable state ) 은 말그대로 변하지 않는 상태이며,
// 불변의 상태가 변한다고 하는 것은( 모순적이지만, 변하는것 역시 맞다.)
// 기존의 state 는 존재하며
// 위에 override 된 형태를 말한다.
// 즉 기존의 state 는 그대로 존재하며, 그위로 새로운 
// state 가 생긴다는 것이다.
// 책에서는 이를 version 으로 설명한다.
// 그래서 언제든지 전의 state 를 추적하여 사용가능하다.
// 
// 반면 가변( variable state )는 상태값이 변하며,
// 이전의 state 는 사라진다.
// 마치 휘발성을 가진듯 새로운 state 로 바로 교체된다.
// 이는 이전의 state 를 찾을수 없다는 것을 뜻한다.
// ( 물론 log 를 만들어 값을 배열형태로 저장하여 추적가능하지만
//   기본적으로 variable state 는 이러한 기능이 없다.)
//
// 이러한 state 를 나누는 이유는 간단하다.
// 모든 것들이 state 가 변하기만 하지는 않는다.
// 때로는 update 되어 변하기도 하지만,
// 그대로 있는 state 도 있다.
// 이러한 그대로 있는 state 역시 변경해야 하는 순간이 
// 언젠가는 오지만, 그 순간이 매번있는것은 아니다.
// ( 위의 말은 유지보수할때를 뜻한다. )
// 위의 그대로 있는 state 를 만들기 위해서 필요한것이
// 바로 immutable state 이다.
//
// 반면, 항상 변경되는 state 들 역시 존재한다.
// 이러한 state 는 실시간으로 매번 변경되어, 사용자가
// 사용하게 끔 만들며, 사용자는 이러한 state 를 사용하여
// 자신이 원하는 결과물을 얻는다.
// 이러한 state 가 바로 variable state 이다.
//
// 사실 객체지향에서는 이를 캡슐화 시켜,
// 의존성을 최대한 없애며, 독립적이고 상호호환될 수 있는
// 모듈형태로서 사용하는것을 권장한다.
// 다른 객체지향 언어에서는 immutable state를 설정가능하며
// variable state 역시 설정가능하다.
// ( 내가 알기로는 java 의 private, public 으로 알고 있다.)
// 이에 대해서는 더욱더 많은 공부가 필요하다..
//
// javascript 에서는 재대로 구현되어 있지 않다. 
// 그래서 더글라스 클락포드라는
// 요다스승님 께서 여러가지 패턴을 만들어 private 한 변수를
// 사용하게 만들어 주기도 하였다.
// 또한 함수라고하는 domain 을 사용하여 값들을 만들어
// module 화 시키기도 하였다.
// 이는 완벽하게 private variable 을 지원하지 않는다. 
// 그렇기에 immutable.js 라고 하는 라이브러리가 탄생했다.
// 내가 내부구조를 알지도 못하고 아직 immutable.js 를 써보지 
// 않아서, 잘은 모르지만, 항상 책에서 이야기하는것은
// javascript 는 태생적으로 private variable 을 지원히지
// 못하기에 이역시 완벽하지 않다고들 하드라..
//
// 자 react 는 module 화 시키는데 매우 좋은 방법을 제공한다.
// 여기서 module 은 component 라고 하는 단위이며,
// 이 component 는 react classElement 를 가진다.
// react classElement 는 dom 으로 따지면,
// element objact 이며, react 는 react classElement 를 
//  component 에 넣어 react-dom 으로 rendering 하여
//  virtual DOM 을 생성한다.
//  virtual DOM 은 DOM 과 1대1 matching 하여
//  서로간의 DOM node 가 다른 부분이 존재하면,
//  틀린부분만 다시 추가하여 DOM 과 짝을 맞추는
//  방식으로 동작한다.
//  ( 물론, 이 내용은 틀린부분이 있을수도 있다..
//    항상 지식이라하는것은 내부구조를 완벽히 알고 있지 않고
//    추상적으로 이해하는한, 틀리지 않는다고 확신할수 없다.)
//
//  그렇다면 여기서 react component 에서 상태값을 사용하려면
//  어떠한 방식으로 사용해야 하는가?
//  간단하다. react component 는 state 객체를 제공한다.
//  이부분이 헷갈리다. 모의 인스턴스라고 하는 객체를 
//  제공한다는데, 이게 state 객체를 말하는 것인지? 나머지 
//  담는 객체를 말하는 것인지 잘 모르겠다.
//  일단은 component 의 sub class 에서 constructor 에서 
//  this.state 를 사용할수 있다는 것만 이해하고 있다.
//
//  이 this.state 에 객체를 할당하여, state 를 사용할수 있다.
//  이 state 는 주의해야 할점이 존재하는데, 이에 대해서 설명한다.
//  react 내부적으로 state 를 추적하면서, 비동기적으로
//  값을 update 한다.
//  state 에 직접 접근하여 값을 변경했을때,
//  react 는 state 를 추적하지 못한다.
//  ( 사실 이부분역시 완벽히 이해한것은 아니다.. )
//  어떠한 내부구조를 가진지는 완벽하지 않다.
//  책에서의 설명은 이렇다.
//
//  react 는 state 를 계속 추적하며, virtual DOM 과 DOM 사이의
//  동기화를 책임진다.
//  component 의 state 를 변경하려면, this.setState 를 호출하여
//  state 의 갱신을 수행한다.
//  동작방식은 이렇다.
//  this.setState 는 최신상태로 병합될 객체를 리턴하는
//  갱신 함수를 매개변수로 전달 받는다.
//  react 는 이 값을 가져와 지원 인스턴스를 갱신한후,
//  새로운 값을 DOM 에 적용한다.
//
//  javascript 의 객체의 갱신과 값을 다시 reassigning 하는 것의 
//  가장 큰 차이점은 setState 를 사용하는 경우
//  효율성을 극대화 하기 위해 react 는 상태를 일괄적으로
//  변경한다. 
//  즉, 상태를 갱신하기 위해 setState 를 호출하면 그 결과가
//  바로 적용되지는 않는다는 것이다.
//  결국 이 메서드를 호출한다는 것은 리액트로 부터 새로운
//  상태를 가장 효과적인 방법으로 최대한 빨리 갱신할 것이라는
//  확답을 얻는 것으로 해석하면 된다.
//
//  그냥.. 이렇게 해석하자.
//  react 는 기존의 javascript 의 갱신이나 reassigning 하는것을
//  최적화 하기 위해 값을 한꺼번에 갱신하는 setState method 를
//  만들었으며, 이는 바로 적용되지 않는다.
//  값을 한꺼번에 갱신하기에..
//  이는 매번 갱신하는 방식보다는 효율적으로 처리된다.
//  그렇기에 state 에 직접 접근하여 처리하면 setState 적용값과
//  다르기에 전혀 다른 결과가 나올수 있다.
//  ( 이는 setState 가 바로 접근하여 처리하지 않으며
//    한꺼번에 처리하지만, state 에 접근하여 갱신하면
//    바로 처리되기때문이다. 이는 오류가 날 위험도가 높다.
//    또한 DOM 에 적용할 갱신함수를 사용하지 않았다는
//    점이 문제가 될수도 있을것 같다..  아.. 이건 나의 추론이다..)
//
//  자.. 멀고 먼 길을 왔다. 그래서 state 라는 것은 무엇이냐?
//  그냥 일단 간단하게 variable state 라고 생각하자.
//  이는 state 값을 component 내에서 변경 가능함을
//  뜻한다.
//
//  그렇다면 immutable state 는?
//  위에 내용을 생각하며 매우 쉽다. 간단하게 얘기하면
//  component 바깥에서 값을 대입하는 state 를 
//  말한다. 바로 props 이다.
//  props 는 component 의 sub class instance 에 
//  할당하는 값이다. instance 내에서는 props 를
//  변경할 수 없다.
//
//  react 는 이렇게 대표적으로 2가지의 state 를 갖는다.
//  물론, 책에서는 immutable.js 에 대해서 같이 사용하면
//  매우 좋다고 말한다.
//  기본적으로 state 를 사용하는것 보다 immutable.js 를
//  사용하는 것이 비용이 덜든다고 한다.
//  하지만 state 역시 매우 훌륭한 react 방식이라고 한다.
//
//  이 장에서 state 에 대해서 또다른 주의점에 대해서 말한다.
//  이는 state 의 얕은복사에 대해서 말한다.
//  기본적으로  javascript 에서는  참조복사( refernace copy ) 와
//  얕은복사 ( shallow copy : 사실 refernce copy 에 연장선이다.  ),
//  깊은복사 ( deep copy ) 라는 개념이 있다.
//  이 개념이 생긴이유는 객체의 참조에 있다.
//  기본적으로 어떠한 변수에 객체를 대입했을때 이 객체를 참조하는
//  메모리주소를 변수에 저장한다.
//  변수는 메모리주소를 사용하여 메모리에 저장되어 있는 객체를
//  참조하여 가져온다.
//  자 그렇다면 이 변수를 다른변수에 넣으면 객체는 2개가 될까?
//  아니다 1개이다.
//  이는 다른변수역시 객체의 메모리주소를 복사해서 갖고 있기때문이다.
//  이것이 참조복사( refernace copy ) 이다.
//  객체자체를 복사하는것이 아닌 메모리주소를 복사하기에 
//  참조주소만을 복사( copy )한다는  뜻이다.
//
//  설명하고자 하는 바는 shellow copy 였다.
//
//	shello copy 는 객체를 최상의 프로퍼티만을 복사한다.
//	이는 객체가 중첩되었을때 중첩된 객체의 메모리 주소를 복사
//	한다는 것을 뜻한다.
//

//const clone  = function( obj ) {
//	if ( typeof obj !== 'object' || obj == null )
//		return obj;
//
//	const newObj = obj.constructor();
//
//	for ( let attr in obj ) {
//		if ( obj.hasOwnProperty( attr ) )
//		newObj[ attr ] = obj[ attr ]; 
//	}
//
//	return newObj;
//}
//
//const obj = { name: 'jaehoon', job: 'programer', os:{
//	win: 'window'
//} };
//let newObj = clone( obj );
//
//newObj.os.win = 'ubuntu'
//newObj.name =  'GilJaeHoon'
//console.log( obj ); // { name: jaehoon, job: programer, os: { win: ubutu }}
//console.log( newObj ); // { name: GilJaeHoon, job: programer, os: { win: ubutu }}

// shallow copy 는 최상의 property 만 변경 가능할뿐
// 중첩된 object 는 referance copy 한다.
// 이는 문제가 될 소지가 있다.
// 왜냐하면 clone 된 객체를 참조로서 사용하지 않고
// 개별적인 고유한 object 로서 사용하고 싶을때 문제가 된다.
// 최상의 property 는 복사된 property 로서 참조되지 않지만,
// 중첩된 object 는 여전히 메모리주소를 copy 했기 때문이다.
// 위의 값을 보면 name property 는 별도로 할당 가능하지만,
// os property 의 중첩된 object 는 메모리주소를 카피했기에
// 참조된 객체를 가지고 있는것을 볼수 있다.
// 이를 shallow copy 라고 한다.
// 그렇다면 deep copy 를 하기 위해서는 당연히 중첩된 
// 객체역시 복사해야 한다.

//const deepClone = function( obj ) {
//	if ( typeof obj !== 'object' || obj == null )
//		return obj;
//
//	const newObj = obj.constructor();
//
//	for ( let attr in obj ) {
//		if ( obj.hasOwnProperty( attr ) )
//			if ( typeof obj[ attr ] == 'object' || obj[ attr ] != null )
//				newObj[ attr ] = deepClone( obj[ attr ] );
//			else
//				newObj[ attr ] = obj[ attr ];
//	}
//
//	return newObj;
//}
//
//const obj2 = { name: 'jaehoon', job: 'programer', os:{
//	win: 'window'
//} };
//
//newObj = deepClone( obj2 );
//newObj.os.win = 'ubuntu';
//newObj.name =  'GilJaehHoon';
//
//console.log( obj2 );
//console.log( newObj );
//
//
//  이를 보면 매우 쉽게 예상가능하다.
//  shellow copy 는 객체의 최상의만 복사하는 반면에
//  deep copy는 중첩 객체역시 복사한다.
//	위의 코드의 결과물은 보면 win.os 가 서로 다르다.
//	이는 중첩 객체를 refernace copy 하지 않았다는 것을 말한다.
//	다른 고유한 객체라는 말이다.
//
//  왜 이러한 개념을 설명하는지 궁굼하겠지만,
//  이는 react 의 setState method 를 이해하는데 매우 중요하다.
//  위에 책에서 발쵀한 내용을 보자.
//
//  "this.setState 는 최신상태로 병합될 객체를 리턴하는
//  갱신 함수를 매개변수로 전달 받는다."
//
//  즉 this.setState 는 객체를 받은후 해당 객체를 state 의
//  객체와 병합한다.
//  이 병합하는 과정을 deep copy 로 진행할까?
//  shellow copy 로 진행할까?
//
//  답은 shellow copy 로 진행한다.
//  이는 무슨말인고 하면, 객체가 중첩되었을때 참조 주소를 
//  복사한다는 말이다.
//  this.setState 의 값을 중첩형태로 제공하면,
//  최상위 property 만을 기존의 상태에 병합한다.
//  완벽하게 복사되지 않는다는 것이다.( deep copy )
//  지금 현재로써 이러한 점이 뭐가 문제인지 모르겠다.
//  어차피 setState 와 this.state 는 갱식되지 않나?
//  만약 setState 가 중첩객체이고 this.state 가 일반 객체이면
//  setState 는 해당 property( 중첩객체를 가진 ) 을
//  this.state 에 update 하지 않는가?
//	이는 1대1 매칭되는 상황이라
//	별로 문제가 없을듯 싶다.
//  혹시 this.state 의 객체를 다른 변수에 대입하는가?
//  그리고 state 에 직접접근하여 값을 대입하는가?
//  그렇게 하면 안된다고 알고 있다.
//  그래서 위에서 setState 를 사용하라고 하였다.
//  굳이 이러한 방법을 쓸 필요는 없어 보인다.
//
//  하지만 일단 책에서는 immutable.js 를 사용하거나
//  함수를 생성하여 값을 deep copy 하게 만들수 있다고 한다.
//  이렇게 객체를 만든후 리턴하는 우회방법을 이야기한다.
//
//  이 부분은 좀더 공부를 해야할거 같다.
//
//  다음 코드에서 shallow copy 에 대해서 보자.
//

import React, { Component } from 'react';
import propTypes from 'prop-types';

class ShallowCopy extends Component{
	constructor(props) {
		super(props);
		this.state = {
			user: {
				name: 'Jaehoon',
				colors: { favorite: "" }
			}
		};
		this.handleBtn = this.handleBtn.bind(this);
	};

	handleBtn(e) {
		this.setState({
			user: {
				colors: { favorite: 'blue' }
			}
		})

		console.log( this.state ); // { user: { colors: { faverite: 'blue' }}}
	};

	render() {
		return (
			<div
				className="textBox"
			>
				<span
					className="text"
				> My name is {this.state.user.name} and favorite color { this.state.user.colors.favorite}</span>	
				<button
					onClick={this.handleBtn}
				> click </button>
			</div>
		)
	};
}

export default ShallowCopy;

// 매우 명확해 졌다.
//
//
//		this.setState({
//			user: {
//				colors: { favorite: 'blue' }
//			}
//		})
//
//	위의 코드로 변경된것을 확인할 수 있다.
//	이는 객체 내부에 user 중첩 객체를 referance copy 
//	하기 때문에 기존의 참조 메모리 주소를 변경한다.
//	그러므로, 참조메모리 주소가 형재의 중첩 객체가 된다.
//
//
// 그렇다면 prop 에 대해서 생각해 보아야 하지 않을까?
// 우리는 현재까지 state 에 대해 조금 깊숙히 알아보았을뿐이다.
// props 는 props.js 에서 확인하자.
//
// 참, 연습문제를 확인해보았는데 setTimeout 을 통해 2000ms 뒤
// this.state.name 을 Bob 으로 변경하는 구문이다.
// 여기서 this.state.name 을 직접 참조하여 값을 변경하는데
// 제대로 갱신되지 않는것을 볼 수 있다.
// 그래서 console.log 로 찍어보았는데 this.state.name 은
// 변경된것으로 나온다.
// setState 내부에 갱신하는 함수를 실행시켜야 제대로 
// 갱신된다고 생각한다.
// 당연히도 setState 로 변경후 name 을 Bob 으로 변경하니
// 제대로 출력되는것을 알 수 있다.
// 여기서 중요한것은 shallow copy 에 대한 내용과
// setState 를 사용하는 법이다.
// 
