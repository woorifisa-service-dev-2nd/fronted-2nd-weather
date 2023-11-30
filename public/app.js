const resultText = document.getElementsByTagName('textarea');

const weatherText = () =>{

    
        
    
        const url = '/weather';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
        };
    
         fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                resultText[0].textContent = data.info["1시간 기온"];
            })
            .catch(error => console.error(error));
    
       
    
}

weatherText();