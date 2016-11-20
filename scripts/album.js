var setSong = function(songNumber) {
    if(currentSoundFile){
        currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = songNumber;
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
    setVolume(currentVolume);
};
var setVolume = function(volume) {
    if(currentSoundFile){
        currentSoundFile.setVolume(volume);
    }
};
var getSongNumberCell = function(number) {
  return  $('.song-item-number[data-song-number="' + number + '"]');
};

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
     
     var clickHandler = function() {
         var songNumber = parseInt($(this).attr('data-song-number'));

        if (parseInt(currentlyPlayingSongNumber) !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);         $(currentlyPlayingCell).html(currentlyPlayingSongNumber);
        }
        if (parseInt(currentlyPlayingSongNumber) !== parseInt(songNumber)) {
            console.log("not currently playing song");
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            //Play  song
            currentSoundFile.play();
            updatePlayerBarSong();
            
        } else if (parseInt(currentlyPlayingSongNumber) === parseInt(songNumber)) {
           // Switch from Pause -> Play button to pause currently playing song.
            
            if(currentSoundFile.isPaused()){
                currentSoundFile.play();
                $(this).html(pauseButtonTemplate);
                $($playerBarButton).html(playerBarPauseButton);
                
            } else{
                currentSoundFile.pause();
                $(this).html(playButtonTemplate);
                $($playerBarButton).html(playerBarPlayButton);
                    }
            
            
        }

          
    };

 
      
   var onHover = function(event){
    var $songNumberCell = $(this).find('.song-item-number'); //get the element first, THEN get the attr that will have the number and parseInt that
    if(parseInt($songNumberCell.attr('data-song-number')) !== parseInt(currentlyPlayingSongNumber)){
      $songNumberCell.html(playButtonTemplate);//here, it's still an element. we need it to call the html method and render the button
    }
  };

    var offHover = function(event){
    var $songNumberCell = $(this).find('.song-item-number'); //get the element first, THEN get the attr that will have the number and parseInt that
        
    if(parseInt($songNumberCell.attr('data-song-number')) !== parseInt(currentlyPlayingSongNumber)){
      $songNumberCell.html(songNumber);//here, it's still an element. we need it to call the html method and render the button
    }
  };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
    
 }; //end of create row function ........................................

 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
     // #2
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
     // #3
     $albumSongList.empty();
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 }; //end of setCurrentAlbum function...............................

var trackIndex = function(album, song){
    return album.songs.indexOf(song);
};


var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
   updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};//end of function NextSong........................


var previousSong = function() {
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
     if (currentSongIndex < 0){
            currentSongIndex = currentAlbum.songs.length -1;
     }
    //set new song 
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    
    //update Player
    
updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
    
    
};//end of function previousSong >...........................

var togglePlayFromPlayerBar = function() {
      if(currentSoundFile.isPaused()){
                currentSoundFile.play();
                $(this).html(pauseButtonTemplate);
                $($playerBarButton).html($pauseButtonTemplate);
                 
                
                
            } else{
                currentSoundFile.pause();
                $(this).html(playButtonTemplate);
                $($playerBarButton).html($PlayButtonTemplate);
               
                
                    }
    
};


var updatePlayerBarSong = function(){
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
 };

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class ="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
var currentlyPlayingSong = null;
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPauseButton = $('.main-controls .play-pause');
var $currentlyPlayingCell =
    getSongNumberCell(currentlyPlayingSongNumber);
var $playerBarButton = $('.main-controls .play-pause');
     
$(document).ready(function() {
     setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPauseButton.click(togglePlayFromPlayerBar);

});

