$(document).ready(function(){

  // shows linear combination button if evolving conditions have been read in
  if ( $("#evolvtable").length ){
    $("#evolvcontent").append('<button class="btn btn-secondary" id="linear_combo">Add Linear Combination</button>')
  }

  // saves linear combinations
  $("#linear_combo").on('click', function(){
    $('#evolvcontent').html('');
    $.ajax({
      url: "/configure/linear_combination_form",
      type: 'get',
      success: function(response){
        $('#evolvcontent').html(response);
      }
    });
  });

  // clears evolving conditions files button
  $("#clearEvolvFiles").on('click', function(){
    var apiRequestURL = globalBaseAPIUrl + "/api/clear_evolution_files/";
    $.ajax({
      url: apiRequestURL,
      type: 'get',
      xhrFields: {
        withCredentials: true
     },
     crossDomain: true,
      success: function(response){
        location.reload();
      }
    });
  });

  // enables save button when linear combinations have been changed
  $(".linear-combo-check").on('change input', function(){
    var name = $(this).attr('addButton');
    $("#" + name).removeClass('disabled')
    $("#" + name).addClass('btn-primary-active')
  });

  // shows scale factor form on click of conc. <li> form
  $('.linear-combo-conc').on('click', function(){
    $("#" + $(this).attr('fileName')).collapse();
  });

  // show/hide input file instructions
  $(".show-hide-input-file-instructions").on('click', function(){
    if ($(this).html() == "Show input file instructions") {
      $(".input-file-instructions").css("display", "block");
      $(this).html("Hide input file instructions");
    } else {
      $(".input-file-instructions").css("display", "none");
      $(this).html("Show input file instructions");
    }
  });

  fetchFilesDictionary();
});
function fetchFilesDictionary() {
  var apiRequestURL = globalBaseAPIUrl + "/api/evolving-conditions/";
  $.ajax({
    url: apiRequestURL,
    type: 'get',
    xhrFields: {
      withCredentials: true
   },
   crossDomain: true,
    dataType: 'json',
    data: {},
    success: function(files) {
      console.log("* fetched files: " + JSON.stringify(files));
      var apiRequestURL2 = globalBaseAPIUrl + "/api/linear-combinations/";
      $.ajax({
        url: apiRequestURL2,
        type: 'get',
        xhrFields: {
          withCredentials: true
      },
      crossDomain: true,
        dataType: 'json',
        data: {},
        success: function(linear_combinations) {
          console.log("* fetched linear combinations: " + JSON.stringify(linear_combinations));
          for (const [key, value] of Object.entries(files)) {
            console.log(key, value);
            var firstBlock = `<div class="row m-2">
            <div class="col">
              <div class="card-header">
                <h4 class="my-0">`+key+`</h4>
              </div>
              <div class="card card-body m-2">
                <form class="linear-combination-form" method="get" action="/conditions/evolving-linear-combination">
                  <input type="hidden" name="filename" value="`+key+`">
                  <ul class="list-group">`;
            // loop through values
            for (let i = 0; i < value.length; i++) {
              var secondBlock = "";
              if (value[i].includes("CONC")) {
                secondBlock = `<li fileName="`+key+`_collapse" class="list-group-item linear-combo-conc"><input name="`+value[i]+`" addButton="`+key+`" class="form-check-input linear-combo-check mx-2" type="checkbox" value="" id="`+value[i]+`"><label for="`+value[i]+`">`+value[i]+`</label></li>`
              } else {
                secondBlock = `<li class="list-group-item">`+value[i]+`</li>`;
              }
              firstBlock += secondBlock+"</ul>";
            }
            var thirdBlock = `<div class="collapse" id="`+key+`_collapse">
            <div class="input-group my-2">
              <span class="input-group-text">Scale factor:</span>
              <input id="scaleFactorForm" value="1" class="form-control" type="text" name="scale_factor">
            </div>
          </div>  
          <button type="submit" id="`+key+`" class="btn btn-secondary my-2 submit-linear-combination">Add linear combination</button>
        </form>`
            firstBlock += thirdBlock;
            document.getElementById("file-items").innerHTML += firstBlock;
            // loop through linear combinations
            var linear_block = `<div class="linear-combination-display">`;
            if (linear_combinations[key] != undefined) {
              linear_block.innerHTML += "Current linear combinations <ul class=list-group>";
              for (const [key2, value2] of Object.entries(linear_combinations)) {
                if(key == key2) {
                  for (let i = 0; i < value2.length; i++) {
                    linear_block.innerHTML += `<li class="list-group-item">`+value2[i]+`</li>`;
                  }
                }
              }
            }
            linear_block.innerHTML += `</ul>
                <form method="get" action="remove-linear-combination">
                <input type="hidden" name="name" value="`+key+`">
                <button type="submit" class="btn btn-secondary">Remove</button>
                </form></div>
                </div>
              </div>
              <div class="col">
              </div>
            </div>`;
            document.getElementById("file-items").innerHTML += linear_block;
          }
        }  
      });
          
        }
      });
      
    
}