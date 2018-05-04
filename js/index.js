$(document).ready(function(){
  var following = [];
 // fcc stream Info and api call
  var url = "https://api.twitch.tv/kraken/streams/freecodecamp";
  $.ajax({
      url: "https://api.twitch.tv/kraken/streams/freecodecamp",
       dataType: "jsonp",
       success: function(response) {
       // console.log(response); // server response
      if(response === null){
      $("#fccStatus").html("FCC is currently offline");  }
    else {$("#fccStatus").html("FCC is currently online");}
      }
    });
  
  
  function getLogoStatusName (url2){
    console.log(url2);
   // console.log("In ")
    $.ajax({
     url:url2,
     dataType: "jsonp",
     success: function(response2){
      /* var logo="";
       var status="";
       var name="";*/
    var logo = response2.logo;
     var status= response2.status;
     var name = response2.display_name;
     console.log(logo);
     console.log(status);
     console.log(name);
     $("#followerInfo").prepend("<div class='row'>"+
                                "<div class='col-md-4'>"+
                                "<img src='"+logo+"'></div>"+
                                "<div class='col-md-4'>"+name+"</div>"+
                                "<div class='col-md-4'>"+status+ "</div></div>"                    
                               );
       
       
       
     }//end of succes
    });//end of ajax
  } ///end of function
 
  //create an array of people who are following   
  $.ajax({
     url:"https://api.twitch.tv/kraken/users/freecodecamp/follows/channels",
     dataType: "jsonp",
     success: function(response2){
       //console.log(response2);
       for(var i=0; i< response2.follows.length; i++){
          var displayName = response2.follows[i].channel.display_name ;
          var url2 = "https://api.twitch.tv/kraken/channels/"+displayName;
        // console.log(url2);
          getLogoStatusName(url2);       
       }
     }     
  });
});