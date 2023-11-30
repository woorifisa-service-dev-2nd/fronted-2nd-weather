const [resultText, rainPercent, recommendCloth] = document.getElementsByTagName('textarea');

const resultCloth = 
    ["28℃ 이상 날씨입니다 옆에 이미지를 참고해주세요",
    "27℃ ~ 23℃ 날씨입니다 옆에 이미지를 참고해주세요",
    "22℃ ~ 20℃ 날씨입니다 옆에 이미지를 참고해주세요",
    "19℃ ~ 17℃ 날씨입니다 옆에 이미지를 참고해주세요",
    "16℃ ~ 12℃ 날씨입니다 옆에 이미지를 참고해주세요",
    "11℃ ~ 9℃ 날씨입니다 옆에 이미지를 참고해주세요",
    "8℃ ~ 5℃ 날씨입니다 옆에 이미지를 참고해주세요",
    "4℃ 이하 날씨입니다 옆에 이미지를 참고해주세요"
    ]

const weatherText = () =>{

    
        
    
        const url = '/weather';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
        };
    
         fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                resultText.textContent = ` ${data.info["1시간 기온"]}℃`;
                rainPercent.textContent = data.info["강수확률"] + "%";

                chooseCloth(+data.info["1시간 기온"]);

            })
            .catch(error => console.error(error));
    
       
    
}

const chooseCloth = (tem)=>{
    if(tem>=28)
        recommendCloth.textContent = resultCloth[0];

    else if(tem<28 && tem>=23)
        recommendCloth.textContent = resultCloth[1];

    else if(tem<23 && tem>=20)
        recommendCloth.textContent = resultCloth[2];

    else if(tem<20 && tem>=17)
        recommendCloth.textContent = resultCloth[3];

    else if(tem<17 && tem>=12)
        recommendCloth.textContent = resultCloth[4];

    else if(tem<12 && tem>=9)
        recommendCloth.textContent = resultCloth[5];

    else if(tem<9 && tem>=5)
        recommendCloth.textContent = resultCloth[6];

    else if(tem<5)
        recommendCloth.textContent = resultCloth[7];

    else
    console.log('error');


    
}

weatherText();