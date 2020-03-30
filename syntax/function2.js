// 내장 객체에 포함된 함수 사용하기
console.log(Math.round(4.23412));


// 매개변수(parameter)
// 입력값에 따라 함수의 동작 및 결과를 다르게 만들 수 있다
// ex) 두 수를 입력받아 더하는 함수 만들기
function sum(x, y){
    console.log(x+y);
}

sum(2,4);

// Math와 같은 객체는 console에 출력할 수도, 파일에 저장할수도 있는 유연함이 있다
// 하지만 위에서 직접 만든 함수는 console에만 출력할 수 있기 때문에 유연함이 떨어진다.
// 이를 개선하기 위한 방법으로 return을 사용한다
// return은 [1. 값을 출력한다 2. return을 만나면 즉시 함수 실행을 종료한다]의 2가지 의미를 가지는 특수한 키워드다

function sum2(x, y){
    return x+y;
}

console.log(sum2(2,4));