var globalBaseAPIUrl = "http://127.0.0.1:8000";
// var githubPagesBase = "music-box-interactive-static/" // set to "" if on custom domain, otherwise we gotta do this for github pages
function get_mechanisms() {
    var apiRequestURL = globalBaseAPIUrl + "/api/mechanisms/";
    var requestType = "get";
    $.ajax({
        url:apiRequestURL,
        type: requestType,
        xhrFields: {
            withCredentials: true
         },
        data: {
        },
        success: function(response){
          console.log("got response from mechanisms GET: ", response);
          console.log(response["species"]);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log('failed....');
            console.log(xhr);
            console.log(ajaxOptions);
            console.log(thrownError);
           }
      });
      
  }
  function get_species() {
    var apiRequestURL = globalBaseAPIUrl + "/api/species/";
    var requestType = "get";
    $.ajax({
        url:apiRequestURL,
        type: requestType,
        xhrFields: {
            withCredentials: true
         },
        data: {
        },
        success: function(response){
          console.log("got response from mechanisms GET: ", response);
          console.log(response["species"]);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log('failed....');
            console.log(xhr);
            console.log(ajaxOptions);
            console.log(thrownError);
           }
      });
      
  }
function load_example(example_number=1) {
    var apiRequestURL = globalBaseAPIUrl + "/api/load-example/";
    var requestType = "get";
    $.ajax({
        url:apiRequestURL,
        type: requestType,
        xhrFields: {
            withCredentials: true
         },
        data: {
            example: example_number
        },
        success: function(response){
          console.log("got response from load_example GET: ", response);
          location.href = 'mechanism.html';
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log('failed....');
            console.log(xhr);
            console.log(ajaxOptions);
            console.log(thrownError);
           }
      });
      
  }
  $(document).ready(function(){
    console.log("window location: "+window.location.href)
    if (window.location.href.includes("ncar.github.io")) {
      // check for github pages, modify links for every page accordingly
      for(var i = 0, l=document.links.length; i<l; i++) {
        // music-box-interactive-static/ required on github pages
        var finalPart = document.links[i].href.replace(window.location.origin, "") // last part of url without domain
        document.links[i].href = window.location.origin + '/music-box-interactive-static' + finalPart
      }
    }
  });
