import { bySkyStatus, chooseClothByTem } from "./data.js";

//각 textarea는 온도, 강수확률, 옷추천 문구부분
const [temperature, rainPercent, recommendCloth] = document.getElementsByTagName('textarea');
const sky = document.getElementById('sky');
const cloth = document.getElementById('cloth');
const background = document.getElementById('background');
const load = document.getElementById('load');
//$img = document.querySelector(".img-container > img");
//const img = document.querySelector('img');



    

    
    const chooseCloth = (tem)=>{ //옷차림 추천 코드, tem = 1시간 기온 데이터

    const [result, src] = chooseClothByTem(tem);

    recommendCloth.textContent = result;
    cloth.src = src;

        
        
    }  
    
    const setSkyStatus = (skyValue) => { //skyValue - 하늘상태 수치 , 하늘 상태에 따른 상단 이미지 변경
        const [skyPicture, bg, status] = bySkyStatus(skyValue);

        sky.src = skyPicture;
        background.src = bg;
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