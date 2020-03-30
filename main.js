var http = require('http');
var fs = require('fs');
var url = require('url');

// 홈페이지를 구성하는 HTML 기본 태그에 관한 함수
function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>`;
}

//목차를 구성하는 HTML 태그에 관한 함수
function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';

  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;

  // console.log(url.parse(_url, true)); //페이지 접속 시 url 정보를 볼 수 있음
  // console.log(url.parse(_url, true).pathname);  // url 정보 중 pathname만 보는 코드
  if (pathname === '/') {
    if (title === undefined) {
      // path가 '/'이면서 쿼리 스트링이 없는 경우, 즉 '/' 페이지일 경우 호출할 내용

      // 디렉토리 안에 있는 파일명을 배열로 받아옴
      fs.readdir('./data', function (error, filelist) {
        // console.log(filelist);
        var title = 'Welcome';
        var description = 'Hello, Node.js';

        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);

        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir('./data', function (error, filelist) {
        // path가 '/'이면서 쿼리 스트링이 있는 경우 호출할 내용
        fs.readFile(`data/${title}`, 'utf8', function (err, description) {
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);

          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    // pathname이 '/'이 아닌 경우 에러 페이지 출력.
    //ex) http://localhost:3000/sdfj 이렇게 들어오면 pathname이 /sdfj가 됨. 즉, '/' != '/sdfj'
    response.writeHead(404);
    response.end('not found page');
  }
});
app.listen(3000);

