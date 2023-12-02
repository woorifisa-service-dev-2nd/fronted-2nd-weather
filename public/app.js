
//각 textarea는 온도, 강수확률, 옷추천 문구부분
const [temperature, rainPercent, recommendCloth] = document.getElementsByTagName('textarea');
const sky = document.getElementById('sky');
const cloth = document.getElementById('cloth');
const background = document.getElementById('background');
const load = document.getElementById('load');
//$img = document.querySelector(".img-container > img");
//const img = document.querySelector('img');



    const resultCloth = 
    ["28℃ 이상 날씨입니다\n 옆에 이미지를 참고해주세요",
    "27℃ ~ 23℃ 날씨입니다\n 옆에 이미지를 참고해주세요",
    "22℃ ~ 20℃ 날씨입니다\n 옆에 이미지를 참고해주세요",
    "19℃ ~ 17℃ 날씨입니다\n 옆에 이미지를 참고해주세요",
    "16℃ ~ 12℃ 날씨입니다\n 옆에 이미지를 참고해주세요",
    "11℃ ~ 9℃ 날씨입니다\n 옆에 이미지를 참고해주세요",
    "8℃ ~ 5℃ 날씨입니다\n 옆에 이미지를 참고해주세요",
    "4℃ 이하 날씨입니다\n 옆에 이미지를 참고해주세요"
    ]

    const chooseCloth = (tem)=>{ //옷차림 추천 코드, tem = 1시간 기온 데이터
        if(tem>=28){
            recommendCloth.textContent = resultCloth[0];
            cloth.src = "./image/28도이상.PNG";
        }
        else if(tem<28 && tem>=23){
            recommendCloth.textContent = resultCloth[1];
            cloth.src = "./image/27이하.PNG";
        }
        else if(tem<23 && tem>=20){
            recommendCloth.textContent = resultCloth[2];
            cloth.src = "./image/22이하.PNG";
        }
        else if(tem<20 && tem>=17){
            recommendCloth.textContent = resultCloth[3];
            cloth.src = "./image/19이하.PNG";
        }
    
        else if(tem<17 && tem>=12){
            recommendCloth.textContent = resultCloth[4];
            cloth.src = "./image/16이하.PNG";
        }
    
        else if(tem<12 && tem>=9){
            recommendCloth.textContent = resultCloth[5];
            cloth.src = "./image/11이하.PNG";
        }
    
        else if(tem<9 && tem>=5){
            recommendCloth.textContent = resultCloth[6];
            cloth.src = "./image/8이하.PNG";
        }
    
        else if(tem<5){
            recommendCloth.textContent = resultCloth[7];
            cloth.src = "./image/4이하.PNG";
        }
    
        else
        console.log('error');
        
    }  
    
    const setSkyStatus = (skyValue) => { //skyValue - 하늘상태 수치 , 하늘 상태에 따른 상단 이미지 변경
        if(skyValue>=0 && skyValue<=5){
            //맑음 이미지로 표시하는 코드
            sky.src = "https://cdn.pixabay.com/animation/2022/07/28/11/53/11-53-26-148_512.gif"; //상황에 맞는 이미지 넣으면 가능
            background.src = "https://i.pinimg.com/564x/9f/58/05/9f58054025a9d219b71c6daa297368b5.jpg";
            
        }
        else if(skyValue>5 && skyValue<=8){
            //구름 많음 이미지로 표시하는 코드
            sky.src = "https://i.pinimg.com/564x/16/8a/6a/168a6a352753f0f389f01d6ac0d3995e.jpg";
            background.src = "https://i.pinimg.com/474x/12/40/d2/1240d26d134ac829f9461faf32968c79.jpg";
            
        }
        else if(skyValue>8 && skyValue<=10){
            //흐림 이미지로 표시하는 코드
            sky.src = "https://cdn.pixabay.com/animation/2023/11/11/18/15/18-15-55-407_512.gif"; //상황에 맞는 이미지 넣으면 가능
            background.src = "https://i.pinimg.com/564x/8c/6a/d9/8c6ad9f256b1093f071849bb2627ba9a.jpg";
        }
    }

const getWeatherData = () =>{
    
        const url = '/weather';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
        };
    
         fetch(url, options) //보내고
            .then(response => response.json()) //받는다.
            .then(data => {
                console.log(data);
                
                temperature.textContent = ` ${data.info["1시간 기온"]}℃`;
                rainPercent.textContent = `${data.info["강수확률"]}%`;

                chooseCloth(+data.info["1시간 기온"]);
                setSkyStatus(+data.info["하늘 상태"]);
                load.style.display = "none";

            })
            .catch(error => console.error(error));
    
}



getWeatherData();