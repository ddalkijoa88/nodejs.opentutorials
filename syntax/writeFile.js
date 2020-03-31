// 웹 페이지의 form을 통해 입력받은 데이터를 파일로 저장하기
// 파일로 저장할 때는 fileSystem 모듈을 사용한다

var fs = require('fs');

fs.writefile('파일을 저장할 위치', '저장할 내용', 'utf8', '에러를 처리할 콜백함수');
