var voiceList = document.querySelector('#voiceList');
var readDesc = document.querySelector('#readDesc');
var speakBtn = document.querySelector('#speak');

var tts = window.speechSynthesis;
var voices = [];

GetVoices();

if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = GetVoices;
}

function GetVoices(){
    voices = tts.getVoices();
    voiceList.innerHTML = '';
    voices.forEach((voice)=>{
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });
    voiceList.selectedIndex = 0;
}

speakBtn.addEventListener('click', ()=>{
    var toSpeak = new SpeechSynthesisUtterance(readDesc.innerHTML);
    // console.log('talk');
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name ');
    voices.forEach((voice)=>{
        if(voice.name === selectedVoiceName){
            toSpeak.voice = voice;
        }
    });
    tts.speak(toSpeak);
});
