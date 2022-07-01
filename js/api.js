var globalBaseAPIUrl = "http://127.0.0.1:8000";

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

