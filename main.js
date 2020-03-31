var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// 홈페이지를 구성하는 HTML 기본 태그에 관한 함수
function templateHTML(title, list, body, control) {
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
    ${control}
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
        var template = templateHTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`);

        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir('./data', function (error, filelist) {
        // path가 '/'이면서 쿼리 스트링이 있는 경우 호출할 내용
        fs.readFile(`data/${title}`, 'utf8', function (err, description) {
          var list = templateList(filelist);
          var template = templateHTML(title, list,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a> 
                       <a href="/update?id=${title}">update</a> 
                       <form action="delete_process" method="post" onsubmit="정말로 삭제하겠습니까?">
                       <input type="hidden" name="id" value="${title}">
                       <input type="submit" value="delete">
                       </form>
                       `);

          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if(pathname === '/create'){
    fs.readdir('./data', function (error, filelist) {
      // console.log(filelist);
      var title = 'WEB - create';
      var list = templateList(filelist);
      var template = templateHTML(title, list,
          `
        <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><textarea name="description" placeholder="description"></textarea></p>
            <p><input type="submit"></p>
        </form>
      `, '');

      response.writeHead(200);
      response.end(template);
    });
  } else if(pathname === '/create_process'){
    // form에 데이터를 입력했을 때 post 방식으로 처리하는 것
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      // console.log(post);
      // console.log(post.title);
      // console.log(title);

      // 입력받은 데이터를 파일에 저장
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(200);
        // create_process페이지에서는 입력받은 데이터를 파일로 저장하는 것만 수행한다
        // 따라서 특정 내용 수행 후 페이지를 이동시켜 줘야한다(page redirection = 302)
        // 입력한 내용을 확인할 수 있는 페이지로 이동시킨다
        response.writeHead(302, {location:`/?id=${title}`})
        response.end();
      })
    });
  } else if(pathname === '/update'){
    fs.readdir('./data', function (error, filelist) {
      // path가 '/'이면서 쿼리 스트링이 있는 경우 호출할 내용
      fs.readFile(`data/${title}`, 'utf8', function (err, description) {
        var list = templateList(filelist);
        var template = templateHTML(title, list,
            `
            <form action="/update_process" method="post">
              <p><input type="hidden" name="id" value="${title}"></p>
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p><textarea name="description" placeholder="description">${description}</textarea></p>
              <p><input type="submit"></p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);

        response.writeHead(200);
        response.end(template);
      });
    });
  } else if(pathname === '/update_process'){
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (err) {
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
          response.writeHead(302, {location: `/?id=${title}`});
          response.end();
        })
      })
      // console.log(post);
    });
  // } else if(pathname === '/delete'){
  //   fs.readdir('./data', function (error, filelist) {
  //     // path가 '/'이면서 쿼리 스트링이 있는 경우 호출할 내용
  //     fs.readFile(`data/${title}`, 'utf8', function (err, description) {
  //       var list = templateList(filelist);
  //       var template = templateHTML(title, list,
  //           `<h2>정말로 삭제하시겠습니까?</h2><input type="submit" onclick="location.href='/delete_process'">`,
  //           `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
  //       response.writeHead(200);
  //       response.end(template);
  //     });
  //   });
  } else if(pathname === '/delete_process'){
    var body= '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;

      fs.unlink(`data/${id}`, function (err) {
        response.writeHead(302, {location: '/'});
        response.end();
      });
    });

  } else {
    // pathname이 '/'이 아닌 경우 에러 페이지 출력.
    //ex) http://localhost:3000/sdfj 이렇게 들어오면 pathname이 /sdfj가 됨. 즉, '/' != '/sdfj'
    response.writeHead(404);
    response.end('not found page');
  }
});
app.listen(3000);

