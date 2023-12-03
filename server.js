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
  // const currentTime = '0344';
  const [currentDay, currentTime] = getCurrentDate();

  const url = getRequestUrlByDate(currentDay, currentTime);

  // api 요청
  request.get(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // 데이터 정제
      const weatherItmes = JSON.parse(body).response.body.items.item;
      const info = refineByWeatherItmes(weatherItmes);
      // 응답 날짜와 시간 결과
      const day = weatherItmes[6]['fcstDate'];
      const time = weatherItmes[6]['fcstTime'];

      const data = {
        day,
        time,
        info,
      };

      // res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      // res.end(JSON.stringify(data))

      res.send(JSON.stringify(data));
    } else {
      res.status(response.statusCode).end();
      console.log(`error = ${response.statusCode}`);
    }
  });
});

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000 app listening on port 3000!');
});

/**
 * 현재 시간을 구하는 함수입니다.
 * @returns {[string,string]} - [ currentDay , currentTime ]
 */
function getCurrentDate() {
  const temp = new Date();
  // 한국 시간 ( KST )을 구하기 위해서는 UTC 시간에 9시간을 더해주면된다
  // UTC = 국제 표준 시간
  temp.setHours(temp.getHours() + 9);

  // ISOString 형식 'YY-MM-DD'T'HH:MM:SS'
  const [day, time] = temp.toISOString().split('T');
  const times = time.split(':');

  // 현재 날짜와 시간
  const currentDay = +day.replaceAll('-', '');
  const currentTime = times[0] + times[1];

  return [currentDay, currentTime];
}

/**
 * 요청할 URL을 반환받는 함수입니다.
 *
 * 파리미터로 day , time 을 받습니다.
 * @param {string} day - YYYYMMDD
 * @param {string} time  - HHMM
 * @returns {string} url
 */
function getRequestUrlByDate(day, time) {
  // 기상청에 등록된 발표 시간이 0500으로 bastTime을 0500로 설정해야함
  // 다른 값을 baseTime으로 요청시 데이터 없다는 에러가 발생
  // pageNo 기본값이 1이므로 5시 또는 5시 이전 시간 을 받기위해서는
  // 1시간 후인 6시 에서 조건부 처리를 해야함
  const checkTime = '0600';

  const isPrev = checkTime >= time;

  // 요청할 날짜 , 시간 계산
  const requestDate = isPrev ? day - 1 : day;
  const requestTime = isPrev ? +time + 2400 : +time;

  /** 년월일 (YYYYMMDD) */
  const baseDate = requestDate;

  /** 발표된 시간 (HHMM) */
  const baseTime = '0500';

  /** 공공데이터포털에서 발급받은 인증키 */
  const serviceKey = process.env.API;

  /**
   * 한 페이지 결과 수
   * 한 시간의 대한 결과값이 12개 이므로 Rows는 12값으로 설정
   */
  const numOfRows = 12;

  /**
   * 페이지 번호 , Default: 1
   * 요청할 페이지 번호를 계산 하기위한 시간 비교
   */
  const timeDifference = +requestTime - +checkTime;
  const pageNo = Math.trunc(timeDifference / 100) + 1;

  /** 요청자료형식(XML/JSON)  */
  const dataType = 'JSON';

  /** 삼암동 위도 , 경도 좌표 */
  const nx = 37;
  const ny = 126;

  // 요청시 필요한 쿼리 정보
  const queries = {
    serviceKey,
    numOfRows,
    pageNo,
    dataType,
    base_date: baseDate,
    base_time: baseTime,
    nx,
    ny,
  };

  const query = Object.keys(queries)
    .map((key) => `${key}=${queries[key]}`)
    .join('&');

  const serviceurl =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

  return `${serviceurl}?${query}`;

  // return `${serviceurl}?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&dataType=${dataType}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
}

/**
 * 필요없는 데이터를 제외하고 필요한 데이터만 반환받는 함수입니다.
 * @param {any} weatherItmes
 * @returns {any} 정제된 데이터
 */
function refineByWeatherItmes(weatherItmes) {
  const infoObj = {};
  weatherItmes.forEach((v) => {
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
      case 'TMX':
        infoObj['일 최고 기온'] = v.fcstValue;
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
  return infoObj;
}
