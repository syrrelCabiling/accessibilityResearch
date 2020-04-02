var TVvoiceList = document.querySelector('#TVvoiceList');
var TVreadDesc = document.querySelector('#TVreadDesc');
var TVspeakBtn = document.querySelector('#TVspeak');

var TVtts = window.speechSynthesis;
var TVvoices = [];

TVGetVoices();

if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = TVGetVoices;
}

function TVGetVoices(){
    TVvoices = tts.getVoices();
    TVvoiceList.innerHTML = '';
    TVvoices.forEach((voice)=>{
        var TVlistItem = document.createElement('option');
        TVlistItem.textContent = voice.name;
        TVlistItem.setAttribute('data-lang', voice.lang);
        TVlistItem.setAttribute('data-name', voice.name);
        TVvoiceList.appendChild(TVlistItem);
    });
    TVvoiceList.selectedIndex = 0;
}

TVspeakBtn.addEventListener('click', ()=>{
    var TVtoSpeak = new SpeechSynthesisUtterance(TVreadDesc.innerHTML);
    // console.log('talk');
    var TVselectedVoiceName = TVvoiceList.selectedOptions[0].getAttribute('data-name ');
    TVvoices.forEach((voice)=>{
        if(voice.name === TVselectedVoiceName){
            TVtoSpeak.voice = voice;
        }
    });
    tts.speak(TVtoSpeak);
});
