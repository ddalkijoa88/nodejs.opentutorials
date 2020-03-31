// node.js에서 post 방식으로 전송한 데이터를 가져올 때

//querystring이라는 모듈을 통해서 post 방식의 데이터를 가져온다
var qs = require('querystring');

// 서버에 데이터가 전송될 때마다 node.js를 호출하고, 그에 맞는 요청과 응답에 대응하는 콜백함수
function post(request, response) {
    if(request.method === 'POST') {
        var body = '';

        // post 방식으로 데이터를 보낼 때 양이 너무 많으면 셧다운 될 수도 있다
        // 이를 방지하기 위해 데이터를 조각조각 나눠서 콜백함수로 보내주게 된다
        // data라는 인자를 통해 데이터를 나눠서 보내주고
        // 이를 하나의 변수에 적재해서 받으면 원본 데이터와 같아지게 된다
        request.on('data', function (data) {
            body += data;
        });

        // 더이상 받을 정보가 없다면 end라는 인자로 데이터의 수신이 끝났다는 것을 알려준다
       request.on('end', function () {
           // body 변수에 담은 데이터를 parse 함수를 이용해서 객체로 만들어준다
           var post = qs.parse(body);
           console.log(post);
           console.log(post.title)
        });
    }
}