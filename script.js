const playButton = document.getElementById('play');
const audioElement = document.querySelector('audio');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const img = document.querySelector('img');
const heading = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const startTime = document.getElementById('current-time');
const endTime = document.getElementById('duration');
let isPlaying = false;
let index=0;


/*-----------EVENTS---------*/

//PROGRESS EVENT
progressContainer.addEventListener('click',progressBar);
   


//PLAY BUTTON EVENT
playButton.addEventListener('click',()=>{
    if(isPlaying==false){
        playIt();
    }else if(isPlaying == true){
        stopIt();
    }
});

//NEXT BUTTON EVENT
    nextButton.addEventListener('click',()=>{
        goToNextSong();
    });

//PREVIOUS BUTTON EVENT
prevButton.addEventListener('click',()=>{
    goToPreviousSong();
});


audioElement.addEventListener('timeupdate',updateProgressBar);

/*-----------END-OF-EVENTS---------*/
                
/*-----------FUNCTIONS-------------*/

function progressBar(e){
    const width = this.clientWidth;
    const xAxis = e.offsetX;
    const {duration} = audioElement;
    audioElement.currentTime=(xAxis/width) * duration;
}

//UPDATING PROGRESS BAR
function updateProgressBar(e){
    if(isPlaying){
        //DESTRUCTING
        const {duration, currentTime} = e.srcElement;
        //UPDATE PROGRESS BAR WIDTH
        const progressPercent = (currentTime/duration) * 100; 
        progress.style.width = `${progressPercent}%`;
        //CALCULATE DURATION OF THE SONG
        const durationMin = Math.floor(duration / 60);
        let durationSec = Math.floor(duration % 60);
        if(durationSec < 10){
            durationSec = `0${durationSec}`;
        }
        //DELAY SWITCHING SONGS TO GET DURATIONS WITHOUT A NaN
        if(durationSec){
            endTime.innerText = `${durationMin}:${durationSec}`;
        }
        //CALCULATE CURRENT TIME
        const currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if(currentSec < 10){
           currentSec = `0${currentSec}`;
        }
        startTime.textContent=`${currentMin}:${currentSec}`;
        


    }
}



//GO TO NEXT SONG
 function goToNextSong(){
    if(index==0){
        audioElement.setAttribute('src','music/jacinto-2.mp3');
        index=1;
        img.setAttribute('src','img/jacinto-2.jpg');
        heading.innerText='Song 2';

    } else if(index==1){
        audioElement.setAttribute('src','music/jacinto-3.mp3');        
        index=2;
        img.setAttribute('src','img/jacinto-3.jpg');
        heading.innerText='Song 3';
    } else if(index==2){
        audioElement.setAttribute('src','music/metric-1.mp3');
        index=3;
        img.setAttribute('src','img/metric-1.jpg');
        heading.innerText='Song 4';
    }    
  
        playIt();
}

    //GO TO PREVIOUS SONG
    function goToPreviousSong(){
        if(index==3){
            audioElement.setAttribute('src','music/jacinto-3.mp3');
            index=2;        
            img.setAttribute('src','img/jacinto-3.jpg');
            heading.innerText='Song 3';
        } else if(index==2){
            audioElement.setAttribute('src','music/jacinto-2.mp3');        
            index=1;
            img.setAttribute('src','img/jacinto-2.jpg');
            heading.innerText='Song 2';
        } else if(index==1){
            audioElement.setAttribute('src','music/jacinto-1.mp3');
            index=0;
            img.setAttribute('src','img/jacinto-1.jpg');
            heading.innerText='Song 1';
        }  
        
        playIt();
    }

//PLAY
function playIt(){
    audioElement.play();
    isPlaying = true;
    playButton.className = 'fas fa-pause main-button';
}

//PAUSE

function stopIt(){
    audioElement.pause();
    isPlaying=false;
    playButton.className = 'fas fa-play main-button';
}

/*-----------END-OF-FUNCTIONS-------------*/