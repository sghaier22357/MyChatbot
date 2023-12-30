var BTN=document.querySelector("button")
var TEXTAREA=document.querySelector("#textSpeech")
var DIV=document.querySelector("#reponse_msg")
var BTN_MIC=document.querySelector("#bMic")
//var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
//EVENEMENT
BTN.addEventListener("click", chatBot)
BTN_MIC.addEventListener("click", speechToText)
//fonction principale
function chatBot(){
    let text=TEXTAREA.value
            addMessage(text)
            //je dois communiquer avec le backend
    var url_backend="http://127.0.0.1:8000/analyse"
    fetch(url_backend,
        {
            method:"POST",
            body:JSON.stringify({"texte":text}),
            headers:{  
                'Content-Type': 'application/json'
            }          
        })
    .then(reponse=>{
        reponse.json()
        .then(data=>{
            console.log(data)
            addMessage(data.msg)
        })
    })
    .catch(e=>{
        console.warn(e)
    })
}
function speechToText(){
    alert("Je suis speech to text")
    //1ère partie déclencher l'API Speech To Text
    recognition.start();
}

function addMessage (text){
    $('.chat').append(
      `  <div class="message other-message">
      <div class="message-text">
       ${text}
      </div>
      <div class="avatar">
        <img src="https://via.placeholder.com/40" alt="Other User Avatar">
      </div>
    </div>
    `
    );
  }
recognition.onresult = function(event) {

    //2ème partie récupérer le texte
    var message = event.results[0][0].transcript;
    console.log('Result received: ' + message + '.');
     console.log('Confidence: ' + event.results[0][0].confidence);

    //3ème partie remplir l'input en utilisant ce texte
    TEXTAREA.value=message
  }