    

var collectionArray = [albumPicasso, albumMarconi, albumLumineers]; 
 var collectionItemTemplate=[];
//var collectionItemTemplate =
//    
//     '<div class="collection-album-container column fourth">'
//   + '  <img src="assets/images/album_covers/01.png"/>'
//   + '  <div class="collection-album-info caption">'
//   + '    <p>'
//   + '      <a class="album-name" href="/album.html"> ' + collectionArray[0].title + ' </a>'
//   + '   <br/>'
//   + '   <a href="/album.html"> ' + collectionArray[0].artist + '   </a>'
//   + '   <br/>'
//   + '    X songs'
//   + '    <br/>'
//   + '   </p>'
//   + ' </div>'
//   + '</div>'
// ;
    
  
 window.onload = function() {
     var collectionContainer = document.getElementsByClassName('album-covers')[0];
     collectionContainer.innerHTML = '';
    
   // debugger;
     
     for(var i = 0; i < collectionArray.length; i++){
         //collectionContainer.innerHTML += collectionItemTemplate;
         
     collectionItemTemplate[i] =
    
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
  
     
 }