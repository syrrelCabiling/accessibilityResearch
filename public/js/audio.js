//Audio Lyrics 
var dialogueTimings2 = [0,2,6,13,18,25,28,32,39,44,52,59,68,75,83,92,94,98,105,110,118,122,125,135,138,142,150,158,165,172,178,182,191],
        dialogues2 = document.querySelectorAll('#transcript2>li'),
        transcriptWrapper2 = document.querySelector('#transcriptWrapper2'),
        au_brandAudio = document.querySelector('#au_brandAudio');
        previousDialogueTime2 = -1;   

     function playTranscript2() {

        var currentDialogueTime2 = Math.max.apply(Math, dialogueTimings2.filter(function(v){return v <= au_brandAudio.currentTime}));

        if(previousDialogueTime2 !== currentDialogueTime2) {
            previousDialogueTime2 = currentDialogueTime2;
            var currentDialogue2 = dialogues2[dialogueTimings2.indexOf(currentDialogueTime2)];
           // transcriptWrapper1.scrollTop  = currentDialogue1.offsetTop - 50;  
            var previousDialogue2 = document.getElementsByClassName('speaking')[0];
            if(previousDialogue2 !== undefined)
                previousDialogue2.className = previousDialogue2.className.replace('speaking','');
            currentDialogue2.className +=' speaking';
        }
    }
;


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

