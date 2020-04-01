//variables
var vid, playbtn, seekslider, curtimetext, durtimetext, mutebtn, fullscreenbtn;
function initializePlayer() {
    vid = document.getElementById("brandVideo");
    playbtn = document.getElementById("playpausebtn");//Play Button
    seekslider = document.getElementById("seekslider");//Pause Button
    curtimetext = document.getElementById("curtimetext");
    durtimetext = document.getElementById("durtimetext");
    mutebtn = document.getElementById("mutebtn");//Mute Button
    fullscreenbtn = document.getElementById("fullscreenbtn");//Toggle Fullscreen
    ccBtn = document.getElementById("togglecc");//Toggle Substitles on or off

//event listeners
    playbtn.addEventListener("click",playPause,false);
    seekslider.addEventListener("change",vidSeek,false);
    vid.addEventListener('timeupdate',seektimeupdate,false);
    mutebtn.addEventListener("click",vidMute,false);
    fullscreenbtn.addEventListener("click",toggleFullScreen,false);
    ccBtn.addEventListener('click', function() {
      var trackMode = vid.textTracks[0].mode;
      vid.textTracks[0].mode = (trackMode == 'showing') ? 'disabled' : 'showing';
      this.innerHTML = 'Subtitles: '.concat((trackMode == 'showing') ? 'off' : 'on');
   });

}

//Transcript
var dialogueTimings = [0,3,7,12,26,33,37,45,50,61,66,74,79,84,93,100,103,108,112,116],
        dialogues = document.querySelectorAll('#transcript>li'),
        transcriptWrapper = document.querySelector('#transcriptWrapper'),

        previousDialogueTime = -1;   

     function playTranscript() {

        var currentDialogueTime = Math.max.apply(Math, dialogueTimings.filter(function(v){return v <= vid.currentTime}));

        if(previousDialogueTime !== currentDialogueTime) {
            previousDialogueTime = currentDialogueTime;
            var currentDialogue = dialogues[dialogueTimings.indexOf(currentDialogueTime)];
            transcriptWrapper.scrollTop  = currentDialogue.offsetTop - 50;  
            var previousDialogue = document.getElementsByClassName('speaking')[0];
            if(previousDialogue !== undefined)
                previousDialogue.className = previousDialogue.className.replace('speaking','');
            currentDialogue.className +=' speaking';
        }
    }
;


window.onload = initializePlayer;


function playPause() {
  if (vid.paused == true) {
    vid.play();
    document.getElementById("playBtn").src = "images/Pause.png";
  } else {
  vid.pause();
  document.getElementById("playBtn").src = "images/Play.png";
} 
}


function vidSeek() {
    var seekto = vid.duration * (seekslider.value / 100);
    vid.currentTime = seekto;
}


function seektimeupdate() {
    var nt = vid.currentTime * (100 / vid.duration);
    seekslider.value = nt; //bar moves with video
      var curmins = Math.floor(vid.currentTime / 60);
      var cursecs = Math.floor(vid.currentTime - curmins * 60);
      var durmins = Math.floor(vid.duration / 60);
      var dursecs = Math.round(vid.duration - durmins * 60);

      
      if(cursecs < 60) {cursecs = "0" + cursecs; }
      if(dursecs < 60) {dursecs = "0" + dursecs; }
      if(curmins < 60) { dursecs = "0" + curmins; }
      if(durmins < 60) {dursecs = "0" + durmins; }
      curtimetext.innerHTML = curmins + ":" + cursecs;
      durtimetext.innerHTML = durmins + ":" + Math.floor(vid.duration);

}


function vidMute() {
  if (vid.muted) {
    vid.muted = false;
    document.getElementById("speaker").src = "images/Speaker.png";
    seekslider.value = 100;
  } else {
    vid.muted = true
  document.getElementById("speaker").src = "images/Mute.png";
    seekslider.value = 0;
  }
}


function toggleFullScreen() {
  if (vid.requestFullscreen) {
      vid.requestFullscreen();
    } else if(vid.webkitRequestFullScreen) {
      vid.webkitRequestFullScreen();
    } else if(vid.mozRequestFullScreen) {
        vid.mozRequestFullScreen ();
    }
  }
