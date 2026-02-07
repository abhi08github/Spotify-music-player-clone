console.log("Welcome to Spotify...🎶🎶");
//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/d.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
//let songItems = document.getElementsByClassName('songItem');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let currentTimeEl = document.getElementById('currentTime');
let totalTimeEl = document.getElementById('totalTime');


let volumeBar = document.getElementById('volumeBar');
audioElement.volume = 0.5;

volumeBar.addEventListener('input', ()=>{
    audioElement.volume = volumeBar.value / 100;
});


let songs = [
    {songName:"Deewana kar raha hai", filepath: "songs/d.mp3", coverpath: "covers/01.jpeg" },
    {songName:"ola ola ola", filepath: "songs/ola ola.mp3" ,coverpath: "covers/02.jpeg"},
    {songName:"animals", filepath: "songs/animals.mp3" ,coverpath: "covers/03.jpeg"},
    {songName:"taki taki", filepath: "songs/taki taki.mp3" ,coverpath: "covers/04.jpeg"},
    {songName:"Hoshwalo ko khabar kyaa", filepath: "songs/hoshwalo ko khabar kyaa.mp3" ,coverpath: "covers/05.jpeg"},
    {songName:"Jhak Maar Ke", filepath: "songs/jhak maar ke.mp3" ,coverpath: "covers/06.jpeg"},
    {songName:"ghop ghop ghop", filepath: "songs/ghop ghop ghop.mp3" ,coverpath: "covers/07.jpeg"}
]



songItems.forEach((element, i)=>{
    
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});  

// audioElement.play();

//play/pause button click   
       

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        //audioElement.src = songs[songIndex].filepath;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});


//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar

    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

    currentTimeEl.innerText = formatTime(audioElement.currentTime);
})

audioElement.addEventListener('ended', ()=>{
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    highlightSong();
}); 

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
audioElement.addEventListener('loadedmetadata', () => {
    totalTimeEl.innerText = formatTime(audioElement.duration);
});


const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

const highlightSong = () => {
    songItems.forEach(item => item.classList.remove('active'));
    songItems[songIndex].classList.add('active');
};

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};


//highlightSong();


/*Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e)=>{
        
        makeAllPlays();
        
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = songs[songIndex].filepath;
        
        audioElement.currentTime = 0;
        audioElement.play();
        
    })
})  */

// click button to play song
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e)=>{

        makeAllPlays();
        songIndex = parseInt(e.target.id);  

        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        masterSongName.innerText = songs[songIndex].songName;

        //audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.src = songs[songIndex].filepath;   
        audioElement.currentTime = 0;
        audioElement.play();

        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;

        highlightSong();
    })
})

//next button 
document.getElementById('next').addEventListener('click', () => {
    if(songIndex>=6){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filepath;   
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    highlightSong();
})

//previous button
document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filepath; 
    masterSongName.innerText = songs[songIndex].songName;  
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    highlightSong();
})

