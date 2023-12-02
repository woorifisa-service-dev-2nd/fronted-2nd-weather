![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=Check%20Weather&fontSize=90)


주제 : Open API 활용 웹 서비스

# 오늘의 날씨를 통해 적절한 옷차림 추천 사이트

# 1. 프로젝트 및 팀(팀원) 소개
### 김주찬
### 박재현
### 박지호
### 천지민

## api 후보
- 공공데이터 기상청 api
- 카카오맵 api
- 서울시 api
- 대중교통

# 2. 협업 방식
- 주제 선정 및 요구 사항 정리
- 기본 환경설정 통일
- 기본 HTML파일 생성 후 기능 구현
- 이후 CSS, 기능 분업하여 개발
  
# 3. 기능 시연
요구사항
- 날씨 api를 받아와 원하는 카테고리 사용하기
- 실행 시킨 기준의 날짜와 시간 반영
- 기온, 강수확률, 기온에 따른 옷차림 추천하기
- css, js 활용 하여 문서 꾸미기

# 4. 도메인 용어 정의
| 도메인 | 설명 |
| --------- | --------------------------------------------------------------- |
| textarea |  temperature: 온도,<br /> rainPercent: 강수확률,<br /> recommendCloth: 옷추천 문구 |
| chooseCloth() | 옷차림 추천해주는 부분,<br />tem = 1시간 기온 데이터 |
| setSkyStatus() | skyValue - 하늘상태 수치 , 하늘 상태에 따른 상단 이미지 변경 |
| weatherText() getWeatherData | 날씨 공공 데이터를 가져와 전반적인 기능을 구현하는 코드 부분 |
 
# 5. 핵심 기능 설명 및 구현 방법
<img src="public/image/load.png" width="500" height="400"/>  <img src="public/image/play.png" width="500" height="400"/>




# 이부분
- 기상청 API 데이터를 받아올시 배열 마다 카테고리별로 항목이 구분 되어 있어 배열을 순회하며
데이터를 추출 하여서 프로젝트에서 사용하기 편하게 데이터를 정제함
- 옷차림추천
요청을 통해 받아온 데이터 중 1시간 기온 수치를 기반으로 비교하여 옷차림의 기준이 되는 온도에 대해 출력해주면서
옆의 이미지를 참고로 옷을 추천하게 설정
- 하늘 상태 기반 이미지 변경
받아온 데이터중 하늘 상태의 수치를 토대로 맑음, 구름많음, 흐림으로 적절하게 이미지 변경
조사 결과 하늘상태 0-5는 맑음, 6-8은 구름많음, 9-10은 흐림으로 분류되는 것을 확인하고 그대로 반영함
- API요청 시간이 조금 걸리는데, 이 시간 동안 로딩 화면이 나오도록 구성했다. 데이터를 불러오게 되면 display=none으로 로딩화면을 숨김했다.
- 유명한 airbnb 에 맞춰 ESLint 를 기본 설정하였고 저희가 개발에 필요하다고 판단된 룰셋은 off 시켜서 개발함


# 6. 트러블 슈팅
- 날씨 데이터를 받아올떄 문자열로 방대한 데이터를 받아서 처리하기 곤란 하였음<br />
 ->이를 데이터로 분리하기위하여 JSON.parse를 하여 데이터화 시키고 필요한 데이터를 얻기위해 한단계 한단계씩 들어가 데이터화 함
- 데이터중 필요한 값만 갖고 온 data.info를 갖고와 사용할 때 1시간 기온값이 string타입으로 되어 있어서 조건문을 통해 기온 값을
확인할때 문제가 발생<br />
 -> 해당 문제는 받아온 data를 number 타입으로 전환 시키기 위해 함수안에 들어가는 매개변수 앞에 +를 입력해
number 타입으로 인식 시킴
- 하늘 상태 기반의 이미지 변경 과정에서 이미지의 주소값을 변경하였지만 변경이 안되는 문제 발생<br />
 -> 문제는 변경하는 부분에서 img의 innerText를 사용한 것이 문제가 되었음을 인지 후 src에 주소를 그대로 입력하여 변경함에 따라 이미지 변경 확인
- ESLint 규칙이 비정상적으로 동작하는 것을 인지를 늦게하여 뒤늦게 ESLint 활성화를 시켰고 그에 따라 기존에 작성한 코드들이 에러가 많이 발생함<br />
 ->각 에러부분에 대한 해결을 ESLint의 문서를 참고하여 필요한 부분만 갖고 와서 규칙에 적용시키고 off 처리함에 따라 정상작동 시킴
  
# 7.  ESLint 규칙 및 적용 후기
-  no-console = console 사용을 허용하게 함 <br />
 -> off로 함으로서 개발 중간에 확인 가능
-  no-undef = 선언 되지 않는 변수 사용을 허용하지 않음 <br />
 -> window의 documet에 접근 하지 못해서 off로 설정
- prefer-destructuring = 배열 파괴를 허용하지 않음 <br />
 -> array[index] , obj[key]로 접근한 값을 변수에 할당 , textContent 에 바로 값을 주기 위해 off로 설정
  
# 8. 회고(느낀점) - 팀원 전부 각자 느낀점
- 김주찬 - git 협업 할때 브랜치 따로 안따고 하나에 main 브랜치 에서 개발을 하였는데 pull 할때마다 git stash 라는 명령어를 사용해서 작업 하던 파일을
잠시 다른 영역에 저장하여 충돌 에러 문제가 많이 발생하지 않아 좋은 명령어를 알게 되었습니다.
- 박재현 - Naver API가 사용하기 좋았어서 다른 OpenAPI를 쓰는것에 있어 약간의 두려움이 있었지만 이 프로젝트를 통해 다른 OpenAPI도 사용할수 있게
되어 좋은 경험이었던것 같습니다. 그리고 팀원들과 같이 의견을 맞춰 나가면서 재밌었습니다.
- 박지호 - 내가 아직 git을 사용할 줄 아는건지 확신하지 못하겠다.(= 아직 모르는거 맞다) 그래도 git에 대한 이해도가 점차 상승하고 있습니다.
프로젝트를 하면서 아직 미약했던 서버구축과 API 요청 등이 정리되고 이해되는 시간이었습니다. 또한 CSS JS를 하면서 이전에 했던 공부를 복습하는 시간이었습니다.
- 천지민 - 외부 일정 때문에 주제 선정에만 참여하였는데 이를 통해 다양한 API에 대해 알아볼 수 있어서 좋았고 수업 때 완전히 이해하지 못한 만큼 따로 공부해야겠다고 생각하게 되었습니다





