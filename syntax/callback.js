// 콜백함수 (callback function)
// 비동기 처리 방식의 문제점을 해결하기 위한 방법으로 사용됨
// 예를 들어, 서버에 데이터를 요청하는 코드를 비동기 처리로 했을 경우,
// 답이 오기를 기다리며 다음 코드를 처리하게 된다.
// 만약, 비동기 처리 다음에 return이라도 있다면
// 그 함수는 값을 기다리는 사이에 다음 코드인 return을 만나서 함수를 종료하게 된다
// 즉, 답이 오지 않았는데도 불구하고 함수는 실행 종료하게 된다는 말

// 이것을 해결하기 위해 콜백함수를 사용한다.
// 콜백함수로 처리해두면 답이 올 때까지 기다렸다가, 응답을 받으면 다음으로 넘어가게 된다
// 따라서 응답이 오기 전에 종료되는 것을 막고, 응답을 받으면 그에 따른 처리를 진행하도록 도와주는 것이 콜백함수다



// 일반적인 함수의 형태
/*
function a() {
    console.log('A');
}
a();
*/

// 익명함수
// 익명함수는 단독으로 사용할 수 없다.
// 이름이 없어서 호출할 수 없기 때문이다.
// 따라서 익명함수를 변수에 담아서 사용할 수 있다.
var a = function(){
    console.log('A');
}
console.log(a);  // [Function: a]
a();  // A
// 변수 a에 담았지만 기능적으로 함수이기 때문에 a()와 같은 형태로 호출함
// javascript에서는 함수가 값이라는 것을 의미하기도 한다


// 콜백함수 (callback function)
// 함수의 인자로 callback을 받아서 그것을 실행하면 된다

//여기서 c는 callback으로 쓰면 보기 쉬울수도 있는데 이해를 위해 변수명을 바꿔놓았다
function slowfunc(c) {
    c();
}
slowfunc(a);