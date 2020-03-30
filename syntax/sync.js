// 동기 vs 비동기
// node.js의 파워를 제대로 사용하기 위해서는 비동기를 잘 다뤄야 한다
// 하지만 그만큼 코드가 복잡하고 어렵다
// 동기적 실행은 어떤 일이 끝나기 전까지 다른 작업이 진행되지 않는 것을 의미
// 비동기적 실행은 어떤 일을 하고 있는 사이에 더 빨리 끝낼 수 있는 일을 먼저 진행해서 병렬적으로 일을 처리하는 것을 의미

var fs = require('fs');

// 동기적 처리
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
// 결과는 a,b,c 순서대로 일을 처리하는 것을 볼 수 있다.

// 비동기적 처리
// readFile은 return값이 없으므로 변수에 담을 수 없다.
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function (err, result) {
    console.log(result);
});
console.log('C');
// 결과는 a,c,b 순이고, 파일을 읽어오는 작업을 처리하는 사이에 다음 작업을 먼저 실행하기 때문에 이와 같은 결과가 나오는 것
