

const resultCloth = [
    '28℃ 이상 날씨입니다\n 옆에 이미지를 참고해주세요',
    '27℃ ~ 23℃ 날씨입니다\n 옆에 이미지를 참고해주세요',
    '22℃ ~ 20℃ 날씨입니다\n 옆에 이미지를 참고해주세요',
    '19℃ ~ 17℃ 날씨입니다\n 옆에 이미지를 참고해주세요',
    '16℃ ~ 12℃ 날씨입니다\n 옆에 이미지를 참고해주세요',
    '11℃ ~ 9℃ 날씨입니다\n 옆에 이미지를 참고해주세요',
    '8℃ ~ 5℃ 날씨입니다\n 옆에 이미지를 참고해주세요',
    '4℃ 이하 날씨입니다\n 옆에 이미지를 참고해주세요',
  ];

  export const chooseClothByTem = (tem) => {
    let result;
    let src;
    //옷차림 추천 코드, tem = 1시간 기온 데이터
    if (tem >= 28) {
      result = resultCloth[0];
      src = './image/28도이상.PNG';
    } else if (tem < 28 && tem >= 23) {
      result = resultCloth[1];
      src = './image/27이하.PNG';
    } else if (tem < 23 && tem >= 20) {
      result = resultCloth[2];
      src = './image/22이하.PNG';
    } else if (tem < 20 && tem >= 17) {
      result = resultCloth[3];
      src = './image/19이하.PNG';
    } else if (tem < 17 && tem >= 12) {
      result = resultCloth[4];
      src = './image/16이하.PNG';
    } else if (tem < 12 && tem >= 9) {
      result = resultCloth[5];
      src = './image/11이하.PNG';
    } else if (tem < 9 && tem >= 5) {
      result = resultCloth[6];
      src = './image/8이하.PNG';
    } else if (tem < 5) {
      result = resultCloth[7];
      src = './image/4이하.PNG';
    } else console.log('error');
    return [result, src];
  };

  export const bySkyStatus = (skyValue) =>{
    let sky, bg, status;
    if(skyValue>=0 && skyValue<=5){
        //맑음 이미지로 표시하는 코드
        sky = "https://cdn.pixabay.com/animation/2022/07/28/11/53/11-53-26-148_512.gif"; //상황에 맞는 이미지 넣으면 가능
        bg = "https://i.pinimg.com/564x/9f/58/05/9f58054025a9d219b71c6daa297368b5.jpg";
        status = "맑음"

        return [sky,bg,status];
        
    }
    else if(skyValue>5 && skyValue<=8){
        //구름 많음 이미지로 표시하는 코드
        sky = "https://i.pinimg.com/564x/16/8a/6a/168a6a352753f0f389f01d6ac0d3995e.jpg";
        bg = "https://i.pinimg.com/474x/12/40/d2/1240d26d134ac829f9461faf32968c79.jpg";
        status = "구름 많음"

        return [sky,bg,status];
        
    }
    else if(skyValue>8 && skyValue<=10){
        //흐림 이미지로 표시하는 코드
        sky= "https://cdn.pixabay.com/animation/2023/11/11/18/15/18-15-55-407_512.gif"; //상황에 맞는 이미지 넣으면 가능
        bg = "https://i.pinimg.com/564x/8c/6a/d9/8c6ad9f256b1093f071849bb2627ba9a.jpg";
        status = "흐림"

        return [sky,bg,status];
    } else {
        throw new Error("에러");
    }
  }