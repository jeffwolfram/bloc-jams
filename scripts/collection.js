    

var collectionArray = [albumPicasso, albumMarconi, albumLumineers]; 
var buildCollectionItemTemplate = function(){

return $(newThumbnail);    
    
};
  
 $(window).load(function() {
     var $collectionContainer = $('.album-covers');
     $collectionContainer.empty();
    
   // debugger;
     
     for(var i = 0; i < collectionArray.length; i++){
     
         
     var $newThumbnail = buildCollectionItemTemplate();
         $collectionContainer.append($newThumnail);
    
     '<div class="collection-album-container column fourth">'
   + '  <img   src="assets/images/album_covers/01.png"/>'
   + '  <div class="collection-album-info caption">'
   + '    <p>'
   + '      <a class="album-name" href="/album.html"> ' + collectionArray[i].title + ' </a>'
   + '   <br/>'
   + '   <a href="/album.html?album='+collectionArray[i].title+'""> ' + collectionArray[i].artist + '   </a>'
   + '   <br/>'
   + '    X songs'
   + '    <br/>'
   + '   </p>'
   + ' </div>'
   + '</div>'
 ;
        collectionContainer.innerHTML += collectionItemTemplate[i]; 
         console.log(collectionItemTemplate[i]);
     }
  
     
 });
