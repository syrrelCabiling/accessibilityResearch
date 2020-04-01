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
	source[0].src = filename + ".mp4";
	source[1].src = filename + ".webm";
	video.load();
	video.play();    
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
    //tv_ccBtn = document.getElementById("tv_togglecc");//Toggle Substitles on or off

//event listeners
    tv_playbtn.addEventListener("click",tv_playPause,false);
    tv_seekslider.addEventListener("change",tv_vidSeek,false);
    tv_vid.addEventListener('timeupdate',tv_seektimeupdate,false);
    tv_mutebtn.addEventListener("click",tv_vidMute,false);
    tv_fullscreenbtn.addEventListener("click",tv_toggleFullScreen,false);
//     tv_ccBtn.addEventListener('click', function() {
//       var tv_trackMode = tv_vid.textTracks[0].mode;
//       tv_vid.textTracks[0].mode = (tv_trackMode == 'showing') ? 'disabled' : 'showing';
//       this.innerHTML = 'Subtitles: '.concat((trackMode == 'showing') ? 'off' : 'on');
//    });

}

//Transcript
// var dialogueTimings = [0,3,7,12,26,33,37,45,50,61,66,74,79,84,93,100,103,108,112,116],
//         dialogues = document.querySelectorAll('#transcript>li'),
//         transcriptWrapper = document.querySelector('#transcriptWrapper'),

//         previousDialogueTime = -1;   

//      function playTranscript() {

//         var currentDialogueTime = Math.max.apply(Math, dialogueTimings.filter(function(v){return v <= vid.currentTime}));

//         if(previousDialogueTime !== currentDialogueTime) {
//             previousDialogueTime = currentDialogueTime;
//             var currentDialogue = dialogues[dialogueTimings.indexOf(currentDialogueTime)];
//             transcriptWrapper.scrollTop  = currentDialogue.offsetTop - 50;  
//             var previousDialogue = document.getElementsByClassName('speaking')[0];
//             if(previousDialogue !== undefined)
//                 previousDialogue.className = previousDialogue.className.replace('speaking','');
//             currentDialogue.className +=' speaking';
//         }
//     }
// ;


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

