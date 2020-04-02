//TV SHOW PLAYLIST
var video_player = document.getElementById("video_player"),
links = video_player.getElementsByTagName('a');
for (var i=0; i<links.length; i++) {
	links[i].onclick = handler;
}

function handler(e) {
	e.preventDefault();
	videotarget = this.getAttribute("href");
	filename = videotarget.substr(0, videotarget.lastIndexOf('.')) || videotarget;
	video = document.querySelector("#video_player video");
	video.removeAttribute("controls");
	video.removeAttribute("poster");
    source = document.querySelectorAll("#video_player video source");
    track = document.querySelector("#video_player video track");
	source[0].src = filename + ".mp4";
    source[1].src = filename + ".webm";
    track.src = filename + ".vtt";
    
	video.load();
    video.play();
    
}

tv_vid = document.getElementById("tv_brandVideo");


function tvScript1() {
    var tvTranscript1 = document.getElementById("tvScript1").innerText;
    document.getElementById("transcriptWrapper1").innerHTML = tvTranscript1; 
    
    tvTranscript1.addEventListener("click",tvScript1);
  }

  function tvScript2() {
    var tvTranscript2 = document.getElementById("tvScript2").innerText;
    document.getElementById("transcriptWrapper2").innerHTML = "TEST";

    document.getElementById("transcriptWrapper2").innerHTML = " <ul id='transcript'>" + 
                                            "<li class='speaker'> [Music]</li>" +
                                            "<li class='speaker1'>Welcome to Wonderworld... </li>" +
                                            "<li class='speaker1'>...where your fantasies become reality.  </li>" +
                                            "<li class='speaker1'>You must be Bella! I know your fantasy.</li>" +
                                            "<li class='speaker1'>To solve a case with Sherlock Holmes!</li>" +
                                            "<li class='speaker1'>Exactly!</li>" +
                                            "<li class='speaker1'>Uhm, let me introduce you to the people or should I say...</li>" +
                                            "<li class='speaker1'>...The Robots of Wonderworld!</li>" +
                                            "<li class='speaker1'>They are all computer-programmed...</li>" +
                                            "<li class='speaker1'>...and are incapable of harming our guests</li>" +
                                            "<li class='speaker1'>...watch</li>" +
                                            "<li class='speaker1'>[Robot growls]</li>" +
                                            "<li class='speaker1'>Like that monster doesn't look incapable of anything!</li>" +
                                            "<li class='speaker1'>oh a sneak attack eh?!</li>" + 
                                            "<li class='speaker1'>I gotta warn you you're dealing with Scrappy Doo!</li>" +
                                            "<li class='speaker1'>That's more like it! [growls] </li>";


    tvTranscript2.addEventListener("click",tvScript2);
}




//TV SHOW CONTROLS


//variables
var tv_vid, tv_playbtn, tv_seekslider, tv_curtimetext, tv_durtimetext, tv_mutebtn, tv_fullscreenbtn;
function tv_initializePlayer() {
    tv_vid = document.getElementById("tv_brandVideo");
    tv_playbtn = document.getElementById("tv_playpausebtn");//Play Button
    tv_seekslider = document.getElementById("tv_seekslider");//Pause Button
    tv_curtimetext = document.getElementById("tv_curtimetext");
    tv_durtimetext = document.getElementById("tv_durtimetext");
    tv_mutebtn = document.getElementById("tv_mutebtn");//Mute Button
    tv_fullscreenbtn = document.getElementById("tv_fullscreenbtn");//Toggle Fullscreen
    tv_ccBtn = document.getElementById("tv_togglecc");//Toggle Substitles on or off

//event listeners
    tv_playbtn.addEventListener("click",tv_playPause,false);
    tv_seekslider.addEventListener("change",tv_vidSeek,false);
    tv_vid.addEventListener('timeupdate',tv_seektimeupdate,false);
    tv_mutebtn.addEventListener("click",tv_vidMute,false);
    tv_fullscreenbtn.addEventListener("click",tv_toggleFullScreen,false);
    tv_ccBtn.addEventListener('click', function() {
      var tv_trackMode = tv_vid.textTracks[0].mode;
      tv_vid.textTracks[0].mode = (tv_trackMode == 'showing') ? 'disabled' : 'showing';
      this.innerHTML = 'Subtitles: '.concat((tv_trackMode == 'showing') ? 'off' : 'on');
   });

}

//TV Transcript 
var dialogueTimings1 = [0,1,2,4,7,14,17,24,28,32,35,37,40,44,48,55],
        dialogues1 = document.querySelectorAll('#transcript1>li'),
        transcriptWrapper1 = document.querySelector('#transcriptWrapper1'),

        previousDialogueTime1 = -1;   

     function playTranscript1() {

        var currentDialogueTime1 = Math.max.apply(Math, dialogueTimings1.filter(function(v){return v <= tv_vid.currentTime}));

        if(previousDialogueTime1 !== currentDialogueTime1) {
            previousDialogueTime1 = currentDialogueTime1;
            var currentDialogue1 = dialogues1[dialogueTimings1.indexOf(currentDialogueTime1)];
           // transcriptWrapper1.scrollTop  = currentDialogue1.offsetTop - 50;  
            var previousDialogue1 = document.getElementsByClassName('speaking')[0];
            if(previousDialogue1 !== undefined)
                previousDialogue1.className = previousDialogue1.className.replace('speaking','');
            currentDialogue1.className +=' speaking';
        }
    }
;


tv_initializePlayer(); //had to delete window.onload bc it's overriding the other players.


function tv_playPause() {
  if (tv_vid.paused == true) {
    tv_vid.play();
    console.log('play');
    document.getElementById("tv_playBtn").src = "images/tv_Pause.png";
  } else {
    tv_vid.pause();
    console.log('pause');
  document.getElementById("tv_playBtn").src = "images/tv_Play.png";
} 
}


function tv_vidSeek() {
    var seekto = tv_vid.duration * (tv_seekslider.value / 100);
    tv_vid.currentTime = seekto;
}


function tv_seektimeupdate() {
    var nt = tv_vid.currentTime * (100 / tv_vid.duration);
   tv_seekslider.value = nt; //bar moves with video
      var tv_curmins = Math.floor(tv_vid.currentTime / 60);
      var tv_cursecs = Math.floor(tv_vid.currentTime - tv_curmins * 60);
      var tv_durmins = Math.floor(tv_vid.duration / 60);
      var tv_dursecs = Math.round(tv_vid.duration - tv_durmins * 60);

      
      if(tv_cursecs < 60) {tv_cursecs = "0" + tv_cursecs; }
      if(tv_dursecs < 60) {tv_dursecs = "0" + tv_dursecs; }
      if(tv_curmins < 60) {tv_dursecs = "0" + tv_curmins; }
      if(tv_durmins < 60) {tv_dursecs = "0" + tv_durmins; }
      tv_curtimetext.innerHTML = tv_curmins + ":" + tv_cursecs;
      tv_durtimetext.innerHTML = tv_durmins + ":" + Math.floor(tv_vid.duration);

}


function tv_vidMute() {
  if (tv_vid.muted) {
    tv_vid.muted = false;
    document.getElementById("tv_speaker").src = "images/tv_Speaker.png";
    tv_seekslider.value = 100;
  } else {
    tv_vid.muted = true
  document.getElementById("tv_speaker").src = "images/tv_Mute.png";
  tv_seekslider.value = 0;
  }
}


function tv_toggleFullScreen() {
  if (tv_vid.requestFullscreen) {
    tv_vid.requestFullscreen();
    } else if(tv_vid.webkitRequestFullScreen) {
        tv_vid.webkitRequestFullScreen();
    } else if(vid.mozRequestFullScreen) {
        tv_vid.mozRequestFullScreen ();
    }
  }


  //Keyboard functionality HERE - if mouse is not available; character values are from ASCII 
// document.onkeydown = function(event) {
//   switch (event.keyCode) {
     
//      case 32: //Spacebar for Play or Pause
//           event.preventDefault();
//           tv_playPause();
//         break;

//       case 70://Toggle Fullscreen
//         event.preventDefault();
//           tv_toggleFullScreen();
//         break;
     
//   }
// };

