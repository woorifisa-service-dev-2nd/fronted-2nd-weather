require('dotenv').config();

const express = require('express');
const request = require('request');

const app = express(); 
//npm expresss 검색해보기

app.use(express.json()); //get하기전에 직렬화을 하겠다. 
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html'); //이것과 /weather의 차이는 index.html실행하냐 안 하고 바로 server에서 하냐의 차이이다.
});

app.get('/weather', (req, res) => {
  const temp = new Date();
  // 한국 시간 ( KST )을 구하기 위해서는 UTC 시간에 9시간을 더해주면된다
  temp.setHours(temp.getHours() + 9);

  const [day, time] = temp.toISOString().split('T');
  const times = time.split(':');

  const requestDay = +day.replaceAll('-', '');
  const requestTime = times[0] + times[1];

  const parms = {
    data: requestDay,
    time: requestTime,
    nx: 37,
    ny: 126,
  };

  /**
   * 년월일(YYYYMMDD)
   */
  const baseDate = parms.data;
  const baseTime = '0500';
  /**
   * 공공데이터포털에서 발급받은 인증키
   */
  const serviceKey = process.env.API;
  /**
   * 한 페이지 결과 수
   * Default: 10
   */
  const numOfRows = 12;
  /**
   * 페이지 번호
   * Default: 1
   */
  const page = +parms.time - +baseTime;
  const pageNo = page / 100;
  /**
   * 요청자료형식(XML/JSON)
   * Default: XML
   */
  const dataType = 'JSON';

  const nx = parms.nx;
  const ny = parms.ny;
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
      const weatherData = JSON.parse(body).response.body.items;
      //   console.log(weatherData);

      const infoObj = {};
      weatherData.item.forEach((v) => {
        switch (v.category) {
          case 'POP':
            infoObj['강수확률'] = v.fcstValue;
            break;
          case 'PTY':
            infoObj['강수형태'] = v.fcstValue;
            break;
          case 'PCP':
            infoObj['1시간 강수량'] = v.fcstValue;
            break;
          case 'REH':
            infoObj['습도'] = v.fcstValue;
            break;
          case 'SNO':
            infoObj['1시간 신적설'] = v.fcstValue;
            break;
          case 'SKY':
            infoObj['하늘 상태'] = v.fcstValue;
            break;
          case 'TMP':
            infoObj['1시간 기온'] = v.fcstValue;
            break;
          case 'TMN':
            infoObj['일 최저 기온'] = v.fcstValue;
            break;
          case 'UUU':
            infoObj['풍속(동서성문)'] = v.fcstValue;
            break;
          case 'VVV':
            infoObj['풍속(남북성분)'] = v.fcstValue;
            break;
          case 'WAV':
            infoObj['파고'] = v.fcstValue;
            break;
          case 'VEC':
            infoObj['풍향'] = v.fcstValue;
            break;
          case 'WSD':
            infoObj['풍속'] = v.fcstValue;
            break;
          default:
            break;
        }
      });

      const data = {
        day: parms.data,
        time: parms.time,
        info: infoObj,
      };

      // res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      // res.end(JSON.stringify(data))

      res.send(JSON.stringify(data));
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
