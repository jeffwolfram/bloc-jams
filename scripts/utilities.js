function forEach(array, callback){
    for (var i = 0; i < array.length; i++){
        callback(array[i]);
    }
    
}

// To get Albums values from the Url parameter.
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }