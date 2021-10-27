/*
화살표 함수 (arrow function)
익명함수로만 사용 가능(함수 표현식)
콜백함수로 사용 가능

모든 경우에 화살표 함수를 사용하는 것은 아님
- this나 super에 대한 바인딩이 없다. 메소드로 사용 안됨
- new.target 키워드 없음
- 일반적으로 스코프 지정할 때 사용하는 call, apply, bind 이용 안됨
- 생성자(constructor)로 사용할 수 없다.
- yield를 화살표 함수 내부에서 사용할 수 없다
(**출처 : mdn)


this : 화살표 함수는 함수 선언할 때 this에 바인딩할 객체가 정적으로 결정(상위 스코프)
*/

//화살표 함수 사용 안됨 경우
//1. 메소드
let person = {
  name: 'moon',
  //bad
  sayHi: () => {
    console.log(`hi ${this.name}`);
  },
  //good, es6축약 메소드 표현
  sayHello() {
    console.log(`hello ${this.name}`);
  }
}
person.sayHi();
person.sayHello();
//2. 프로토타입 (몰라)
//3. 생성자 함수, 프로토타입의 연장선

//4. addEventListener 함수의 콜백함수 -> 이벤트 함수의 콜백함수를 화살표 함수로 정의하면 this가 상위 스코프인 전역객체를 가리킴
//good
//일반 함수로 정의된 이벤트 함수의 콜백함수 내부의 this는 이벤트 리스너에 바인딩된 요소(currentTarget)를 가리킨다.
// let btn = document.getElementById('myBtn');
// btn.addEventListener('click', function () { //함수표현을 이렇게!!, 화살표 함수 말고
//   console.log(this === btn);
//   this.innerHTML = 'clicked button'
// })

/*
매개변수, rest파라미터, spread문법, Rest/Spread프로퍼티

매개변수 : 함수는 매개변수의 개수와 인수의 개수 체크하지 않음, 인수가 부족한 경우 값이 undefined
매개변수 기본값 : 함수 내에서 수행하던 인수체크 및 초기화를 간소화 가능
*/
//초기화
function sum(x = 0, y = 0) {
  return x + y;
}
console.log(sum(1)); //1
console.log(sum(1, 2));//3

/*
Rest 파라미터
매개변수 이름 앞에 '...'을 붙혀서 정의한 것
함수에 전달된 인수들의 목록을 배열로 받음

이름 그대로 먼저 선언된 파라미터에 할당된 인수를 제외하고 나머지 인수를 배열에 담음. 무조건 마지막 인수여야함
*/
function foo(para, ...rest) {
  console.log(Array.isArray(rest)); //true
  console.log(rest); //[2,3,4,5]
  console.log(para); //1
}
foo(1, 2, 3, 4, 5)

//rest 파라미터는 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티에 영향을 주지 않음
// function bar(x, y, ...rest) { } //length : 1(x), 2(x,y)

//arguments & rest 파라미터
function sum(...args) {
  // let array = Array.slice.call(arguments); //bad
  // return array.reduce(function (pre, cur) {
  //   return pre + cur;
  // })

  //good
  console.log(arguments);
  console.log(Array.isArray(args)); //true
  return args.reduce((pre, cur) => pre + cur);
}

console.log(sum(1, 2, 3, 4, 5)); //15

/*
spread 문법 '...'
대상을 개별 요소로 분리(이터러블해야함)

이터러블이란?
이터러블 객체 : 반복 가능한 객체 -> 배열을 일반화한 객체.

=>for of문을 사용할 수 있는 객체를 이터러블이라 함
*/
let a = [1, 2, 3]
console.log(...a); //1 2 3
console.log(...'hello'); //h e l l o
//map, set은 이터러블
console.log(...new Map([['a', '1'], ['b', '2']])); // ['a', '1'] ['b', '2']
console.log(...new Set([1, 2, 3])); //1 2 3

//1. 함수의 인수로 사용하는 경우
function spread1(x, y, z) {
  console.log(x); //1
  console.log(y); //2
  console.log(z); //3
}

let arr = [1, 2, 3];
spread1(...arr)

//2. 배열에서 사용하는 경우

//concat
let arr1 = [1, 2, 3];
console.log([...arr, 4, 5, 6]); //[1,2,3,4,5,6]

//push
let arr2 = [4, 5, 6];
arr1.push(...arr2)
console.log(arr1); //[1,2,3,4,5,6]
//splice, copy도 있음

/*
디스트럭처링(destructuring) : 구조화된 배열 또는 객체를 파괴하여 개별적인 변수에 할당하는 것.
배열 또는 객체리터럴에서 필요한 겂만 추출하여 변수에 할당하거나 반환할때 유용
*/
let num = [1, 2, 3];
let [one, two, three] = arr;
console.log(one, two, three); //1 2 3 => 이걸로 왓챠피디아 해볼수있으려나

// 객체 디스트럭처링은 객체의 각 프로퍼티를 객체로부터 추출하여 변수리스트에 할당. 할당 기준은 프로퍼티 key!! => 순서 상관이 없음 
let obj = {
  firstName: 'moon',
  lastName: 'sliver'
};
let { lastName, firstName } = obj;
console.log(firstName, lastName); //moon sliver 

/*
클래스 
클래스는 내가 아무것도 모르니까 마구마구 적을꺼야

클래스는 함수, 기존 프로토타입 기반 패턴의 syntactic sugar라고 볼 수 있음
클래스와 생성자 함수가 정확히 동일하게 동작하지 않음 클래스가 훨씬 엄격

클래스는 함수의 한 종류

클래스의 호이스팅
let, const로 선언한 변수처럼 호이스팅된다.
일시적 사각지대에 빠져 호이스팅이 발생하지 않는 것 처럼 동작.

클래스 선언문도 변수선언, 함수정의와 마찬가지로 호이스팅 발생.

호이스팅(var, let, const, function, function*(제너레이터 함수), class 를 사용한 모든 선언문에서 발생)

클래스가 표현식으로도 되는데, 함수표현식처럼 이름이 없을 수 있음
ex. let Foo = class MyClass {};
*/
class Person {
  constructor(name) {
    this._name = name;
  }
  sayHi() {
    console.log(`hi ${this._name}`); //hi lee
  }
}

let me = new Person('lee');
me.sayHi();
console.log(me instanceof Person); //true

//인스턴스 생성 -> 생성자함수와 같이 new 연산자와 함께 클래스 이름을 호출하면 클래스의 인스턴스가 생성됨
//new 연산자와 함께 호출한 Foo 는 클래스의 이름이 아니라 constructor. 표현식이 아닌 선언식으로 정의한 클래스의 이름은 constructor와 동일
class Test { }
let test = new Test()
console.log(typeof Test); //function
console.log(typeof test); //object

//constructor : 인스턴스를 생성하고 클래스 필드를 초기화하기 위한 특수 메소드
//클래스 필드 : 클래스 내부의 캡슐화된 변수를 말함. 생성자함수에서 this에 추가한 프로퍼티를 클래스 기반 객체지향 언어에서는 클래스 필드라함.

//getter : 클래스 필드에 접근할 때마다 클래스 필드의 값을 조작하는 행위가 필요할 때 사용. 프로퍼티처럼 참조하는 형식으로 사용, 참조 시 메소드가 호출됨

//setter : 클래스 필드에 값을 할당할 때마다 클래스 필드 값을 조작하는 행위가 필요할때 사용. 프로퍼티처럼 값을 할당하는 형식으로 사용, 할당 시 메소드 호출

//정적 메소드 : 'static' 키워드 사용. 클래스의 정적메소드는 인스턴스로 호출 안됨. this사용 안됨.

class Red {
  constructor(prop) {
    this.prop = prop;
  }

  static staticMethod() {
    return 'staticMethod';
  }
  prototypeMethod() {
    return this.prop;
  }
}

console.log(Red.staticMethod()); //staticMethod
let red = new Red(123);
// console.log(red.staticMethod()); //uncaught typeError : is not a function

/*
클래스 상속
코드 재사용하는데 좋음
extends 키워드는 부모클래스를 상속받는 자식 클래스를 정의할때 사용
instanceof 연산자로 클래스 상속 여부 확인 가능


오버라이딩 : 상위 클래스가 가지고 있는 메소드를 하위 클래스가 재정의하여 사용하는 방식
오버로딩 : 
예시를 봐보자
*/
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  getDiameter() { //원의 지름
    return 2 * this.radius;
  }
  getPerimeter() { //원의 둘레
    return 2 * Math.PI * this.radius;
  }

  getArea() { // 원의 넓이
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Cylinder extends Circle {
  constructor(radius, height) {
    super(radius); //super : 부모클래스 참조 할때, 부모클래스의 constructor를 호출할 때 , 화살표함수 지원안함
    this.height = height;
  }

  getArea() { //원통의 넓이
    return (this.height * super.getPerimeter()) + (2 * super.getArea());
  }
  getVolume() { //원통의 부피
    return super.getArea() * this.height;
  }
}

let cylinder = new Cylinder(2, 10);
console.log(cylinder.getDiameter());
console.log(cylinder.getPerimeter());
console.log(cylinder.getArea());
console.log(cylinder.getVolume());
console.log(cylinder instanceof Cylinder); //true
console.log(cylinder instanceof Circle); //true

/*
실무에선 아직 잘 사용하진 않지만 어떻게 될지 모르니까 그냥 알아두기
type symbol : 원시 타입
Symbol() 함수로 생성. 
호출될 때마다 Symbol값을 생성. 이때 생성된 Symbol은 객체가 아니라 변경불가한 원시타입
new 연산자 사용하지 않음(String, Number, Boolean처럼 래퍼객체를 생성하는 생성자함수와는 다름)
객체 프로퍼티 키 : 문자형, 심볼형만 됨
심볼은 문자형으로 자동 형변환 되지 않음
for in 문에서 배제

let user = {
  name : 'moon',
  [id]:123 ->심볼
}
*/
//심볼 이름이라 불리는 설명을 붙힐 수 있음, 디버깅 시 유용
let id = Symbol('id') //''안에 있는 내용이 이름

// 유일한 식별자를 만들고 싶을때 사용
let id1 = Symbol('id');
let id2 = Symbol('id');
console.log(id1 == id2); //false

//숨김 프로퍼티 : 외부 코드에서 접근이 불가능하고 값도 덮어쓸 수 없음
let user = {
  name: 'moon'
}

let idSym = Symbol('id');
user[idSym] = 1;
console.log(user[idSym]); //1 symbol은 []에다가

/*
왓챠를 class랑 this로 해야되낭
해보고 싶은 프로젝트?
영화 예매 사이트
날씨 api가져오기
로컬 저장
다크모드
모달창 만들기
커피 주문하기 (다시 제대로 like starbucks)
내가 좋아하는거 영화보기 드라마보기 연극 뮤지컬 보러가기 커피 해리포터 좋아히지 음식 주문하기 
옆에 네비게이션바만드는거 버튼 누르면 스무스하게 나오고 뭐 그런거도 해보고
게시판... 다시해보까/...완전 새롭게 다시 
*/

/*
prototype 이거 진짜 1도 모름
js : 프로토타입 기반 객체지행 프로그래밍

- 모든 객체는 부모 객체와 연결되어 있다. => 부모 객체 : Prototype 객체(Prototype 프로토타입)
- Prototype 객체는 생성자 함수에 의해 생성된 각각의 객체에 공유 프로퍼티를 제공하기 위해 사용
- js의 모든 객체는 [[Prototype]]이라는 인터널 슬롯을 가짐. 이것의 값은 null 또는 객체 => 상속을 구현하는데 사용
- [[Prototype]]의 값 : 프토로타입 객체
- __proto__ accessor property로 접근 가능

*/