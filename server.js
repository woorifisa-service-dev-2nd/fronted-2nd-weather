const express = require('express');
const request = require('request');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// get-> HTTP GET method,
// '/' -> Root 경로로 요청
// function~ -> 콜백

// http://localhost:3000'/' 경로로 요청 시 동작할 핸들러(handler)
// req -> request - HTTP Request 객체
// res -> response - HTTP Response 객체(응답 시 사용할 데이터, 부가 정보를 담을 때 사용)
app.get('/', (req, res) => {
  res.send('Hello World');

  //   res.sendFile('index.html');
});

app.get('/weater', (req, res) => {
  /**
   * 공공데이터포털에서 발급받은 인증키
   */
  const serviceKey = '';
  /**
   * 한 페이지 결과 수
   * Default: 10
   */
  const numOfRows = 50;
  /**
   * 페이지 번호
   * Default: 1
   */
  const pageNo = 1;
  /**
   * 요청자료형식(XML/JSON)
   * Default: XML
   */
  const dataType = 'JSON';

  /**
   * 년월일(YYYYMMDD)
   */
  const baseDate = 20231129;
  const baseTime = '0500';

  const nx = 37;
  const ny = 126;
  const serviceurl =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

  const url = `${serviceurl}?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&dataType=${dataType}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

  const options = {
    url,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  //   fetch(url).then(res => res.json()).then(data => console.log(data))
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });

      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log(`error = ${response.statusCode}`);
    }
  });

  // POP 강수확률
  // PTY 강수형태
  // PCP 1시간 강수량
  // REH 습도
  // SNO 1시간 신적설
  // SKY 하늘 상태
  // TMP 1시간 기온
  // TMN 일 최저 기온
  // TMX 일 최고 기온
  // UUU 풍속(동서성문)
  // VVV 풍속(남북성분)
  // WAV 파고
  // VEC 풍향
  // WSD 풍속
});

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000 app listening on port 3000!');
});
