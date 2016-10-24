 
var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };
 var albumLumineers = {
     title: 'Cleopatra',
     artist: 'Lumineers',
     label: 'Dangerbird Records',
     year: '2016',
     albumArtUrl: 'assets/images/album_covers/03.png',
     songs: [
         { title: 'Sleep on the floor', duration: '1:01' },
         { title: 'Ophelia', duration: '5:01' },
         { title: 'Cleopatra', duration: '3:21'},
         { title: 'Gun Song?', duration: '3:14' },
         { title: 'Angela', duration: '2:15'}
     ]
 };

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };
//#1
var setCurrentAlbum = function(album) {
    //debugger;
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    //#2
  
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
    
    //#3
    
    albumSongList.innerHTML = '';
    
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

//album button templates
var playButtonTemplate = '<a class="album-song-button"><span class ="ion-play"></span></a>';

 window.onload = function() {
     
  
     
var albumType = (getUrlVars()["album"]);
     
if(albumType!=undefined) {
    albumType = albumType.replace('%20',' ');
}         
   toLoadAlbum(albumType);  
     
     songListContainer.addEventListener('mouseover', function(event) {
         console.log(event.target);
         //only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item'){
             //change contern from the number to the play buttons HTML
             event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
         }
     });
     for (var i = 0; i < songRows.length; i++){
         songRows[i].addEventListener('mouseleave', function(event){
             //revert the content back to a number
             //selects first child element which is the song-item-number element
             this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         });
     }
 };


function toLoadAlbum(albumType){
    //debugger;
     switch(albumType){
        case 'The Colors' : 
        setCurrentAlbum(albumPicasso);
        break;   
             
        case 'The Telephone' : 
        setCurrentAlbum(albumMarconi);
        break;  
        
        case 'Cleopatra' : 
        setCurrentAlbum(albumLumineers);
        break;       
             
     }
}

 function navigateNext(calledDom){
     //debugger;
     
     console.log(calledDom);
     
     var selecteAlbum = calledDom.getElementsByClassName("album-view-title")[0];
     var albumTitle = selecteAlbum.innerText;
     
         if(albumTitle=='The Colors'){
             toLoadAlbum("The Telephone");
         }
         else if (albumTitle=='The Telephone' ){
             toLoadAlbum("Cleopatra");
         }
         
         else if (albumTitle=='Cleopatra' ){
             toLoadAlbum("The Colors");
         }
     
    
 }
