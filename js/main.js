var currentlyLoadingGraph = false
var currentMinValOfGraph = 0
var currentMaxValOfGraph = 1
var shouldShowArrowWidth = true // if true, show arrow width slider (mostly used for debug)
var global_session_id = "";
function reloadSlider(firstVal, secondVal, minVal, maxVal, stepVal = 200) {
  var stepVal = (parseFloat(maxVal) - parseFloat(minVal)) / 60;
  console.log("step value: " + stepVal);
  console.log("received values: "+firstVal+" "+parseFloat(secondVal).toExponential(3));
  console.log("received min max (* 10^100): "+(parseFloat(minVal) * Math.pow(10,100))+" "+(parseFloat(maxVal) * Math.pow(10,100)));
  $( "#range-slider2", window.parent.document ).slider("destroy");
  currentMinValOfGraph = parseFloat(minVal);
  currentMaxValOfGraph = parseFloat(maxVal);
  // change time slider to have proper step value
  console.log("fetched step val: " + stepVal);
  // $( "#range-slider", window.parent.document ).slider("option", "step", stepVal);
  $( function() {
    $( "#range-slider2",window.parent.document ).slider({
      range: true,
      min: parseFloat(minVal).toExponential(3) * Math.pow(10,100),
      max: parseFloat(maxVal).toExponential(3) * Math.pow(10,100),
      step: stepVal * Math.pow(10,100),
      values: [ parseFloat(firstVal).toExponential(3) *Math.pow(10,100), parseFloat(secondVal).toExponential(3) * Math.pow(10,100) ],
      slide: function( event, ui ) {
          // update values when slider changed
        document.getElementById("flow-start-range2").value = (ui.values[ 0 ] / Math.pow(10,100)).toExponential(3);
        document.getElementById("flow-end-range2").value = (ui.values[ 1 ] / Math.pow(10,100)).toExponential(3);
      },
      stop: function(event, ui) {
          // reload graph when slider is released (a lot less stress on the server by waiting for the user to release the slider)
          reloadGraph();
          }
    });
  } );
}
// adds each element to blockedElementsList
function blockAllSpecies() {
  console.log('block all species');
  $.each($("#blocked-elements-list").children(), function(i, value){
    var id = $(value).attr('id');
    if ($(value).hasClass('active') == false) {
      $("#" + id).addClass('active')
      document.getElementById(id).innerHTML = document.getElementById(id).innerHTML.replace("☐ ", "☑ ");
    }
  });
  reloadGraph();
}
// removes each element from blockedElementsList
function unblockAllSpecies() {
  console.log('unbock all species');
  $.each($("#blocked-elements-list").children(), function(i, value){
    var id = $(value).attr('id');
    if ($(value).hasClass('active')) {
      $("#" + id).removeClass('active')
      document.getElementById(id).innerHTML = document.getElementById(id).innerHTML.replace("☑ ", "☐ ");
    }
  });
  reloadGraph();
}
function handleBlockUnblock() {
  if (document.getElementById("select_all_blocked").innerHTML.indexOf("☑") !== -1) {
    // unblock all
    unblockAllSpecies();
    document.getElementById("select_all_blocked").innerHTML = "☐ Select all";
  } else {
    // block all
    blockAllSpecies();
    document.getElementById("select_all_blocked").innerHTML = "☑ Select all";
  }
}
// helper function to reload graph (called when something other than elements changed)
function reloadGraph() {
  currentlyLoadingGraph = true
  var includedSpecies = []
  var blockedSpecies = []
    $.each($("#flow-species-menu-list").children(), function(i, value){
      if ($(value).hasClass('active')) {
        includedSpecies.push($(value).html().replace("☐ ", "").replace("☑ ", ""))
      }
    });

    $.each($("#blocked-elements-list").children(), function(i, value){
      if ($(value).hasClass('active')) {
        blockedSpecies.push($(value).html().replace("☐ ", "").replace("☑ ", ""))
      }
    });


    let stringed = includedSpecies.toString();
    console.log("stringed: " + stringed);
    console.log("asking for new plot graph")
    var plotsURL = globalBaseAPIUrl+'/api/plots/get_flow/'
    $.ajax({
      url:plotsURL,
      type: 'get',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      data: {
        "includedSpecies": stringed,
        "blockedSpecies": blockedSpecies.toString(),
        "startStep": $("#flow-start-range").val(),
        "endStep": $("#flow-end-range").val(),
        "maxArrowWidth": $("#flow-arrow-width-range").val(),
        "arrowScalingType": $("#flow-scale-select").val(),
        "minMolval": parseFloat(parseFloat($("#flow-start-range2").val())).toExponential(3),
        "maxMolval": parseFloat(parseFloat($("#flow-end-range2").val())).toExponential(3),
        "currentMinValOfGraph": currentMinValOfGraph,
        "currentMaxValOfGraph": currentMaxValOfGraph,
        "isPhysicsEnabled": $("#physics").is(":checked"),
      },
      success: function(response){
        $("#flow-diagram-container").html('<img src="img/plot_diagram_legend.png" style="margin-left:40px;margin-top:40px;width:200px; position: absolute;border: 2px solid rgb(189,189,189);"> <iframe style="width: 100%;height: 100%;" id="graph-frame" title="Network plot"></iframe>');
        var doc = document.getElementById('graph-frame').contentWindow.document;
        doc.open();
        doc.write(response);
        doc.close();
      }
    });
}

$(document).ready(function(){

  // disables enter button, unless a button or link has focus
  $('body').on('keypress', ':not(button, a)', function(event) {
    if (event.keyCode == '13') {
      event.preventDefault();
    }
  });

  // sets enter key or space bar to trigger click when button or link has focus
  $('body').on('keypress', 'button, a', function(event) {
    if (event.keyCode == '13' || event.keyCode == '32') {
      event.preventDefault();
      $(this).click();
    }
  });

  // add links for plotting and downloading configuration/results
  function display_post_run_menu_options() {
    if (location.href.includes("plots")) {
      $('#post-run-links').html(`
      <small class='nav-section'>ANALYSIS</small>
      <a class='nav-link active' id='plot-results-link' href='/plots.html'><span class='oi oi-graph oi-prefix'></span>Plot Results</a>
      <a class='nav-link' id='flow-diagram-link' href='/flow.html'><span class='oi oi-fork oi-prefix'></span>Flow Diagram</a>
      <a class='nav-link' id='download-link' href='/download.html'><span class='oi oi-data-transfer-download oi-prefix'></span>Download</a>
      `);
    } else if (location.href.includes("flow")) {
      $('#post-run-links').html(`
      <small class='nav-section'>ANALYSIS</small>
      <a class='nav-link' id='plot-results-link' href='/plots.html'><span class='oi oi-graph oi-prefix'></span>Plot Results</a>
      <a class='nav-link active' id='flow-diagram-link' href='/flow.html'><span class='oi oi-fork oi-prefix'></span>Flow Diagram</a>
      <a class='nav-link' id='download-link' href='/download.html'><span class='oi oi-data-transfer-download oi-prefix'></span>Download</a>
      `);
    } else if (location.href.includes("download")) {
      $('#post-run-links').html(`
      <small class='nav-section'>ANALYSIS</small>
      <a class='nav-link' id='plot-results-link' href='/plots.html'><span class='oi oi-graph oi-prefix'></span>Plot Results</a>
      <a class='nav-link' id='flow-diagram-link' href='/flow.html'><span class='oi oi-fork oi-prefix'></span>Flow Diagram</a>
      <a class='nav-link active' id='download-link' href='/download.html'><span class='oi oi-data-transfer-download oi-prefix'></span>Download</a>
      `);
    } else {
      $('#post-run-links').html(`
      <small class='nav-section'>ANALYSIS</small>
      <a class='nav-link' id='plot-results-link' href='/plots.html'><span class='oi oi-graph oi-prefix'></span>Plot Results</a>
      <a class='nav-link' id='flow-diagram-link' href='/flow.html'><span class='oi oi-fork oi-prefix'></span>Flow Diagram</a>
      <a class='nav-link' id='download-link' href='/download.html'><span class='oi oi-data-transfer-download oi-prefix'></span>Download</a>
      `);
    }
    console.log("* updating links")
    updateLinks();
  }

  // runs the model
  $("#run-model").on('click', function(){
    var apiRequestURL = globalBaseAPIUrl + "/api/run/";
    $("#post-run-links").html('<div class="mx-2"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>')
    $.ajax({
      url:apiRequestURL,
      type: 'get',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function(response){
        if (response["model_running"]){
          var apiRequestURL2 = globalBaseAPIUrl + "/api/check/";
          $.ajax({
            url: apiRequestURL2,
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            type: 'get',
            success: function(response){
              console.log("* got response from check:",response)
              if (response["status"] == 'done') {
                $("#post-run-links").html('')
                console.log("* updating options")
                display_post_run_menu_options();
                
              } else if (response["status"] == 'error'){
                  alert("ERROR " + response["e_code"] + "   " + response["e_message"]);
                  if (response["e_type"] == 'species'){
                    $("#" + response['spec_ID']).css("border", "3px solid red")
                    $("#" + response['spec_ID']).css("border-radius", "4px")
                  }
              } else {
                alert('unknown error')
              }
            }
          });
        } else {
          alert(response["error_message"])
        }
      }
    });
  });

  // checks if model has been run or if config changed (model/check-load)
  var apiRequestURL = globalBaseAPIUrl + "/api/check-load/";
  $.ajax({
    url: apiRequestURL,
    type: 'get',
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    success: function(response){
      console.log("* got response from check-load:",response)
      if (response["status"] == 'done') {
        console.log("* grabbing options")
          display_post_run_menu_options();
        if (window.location.href.indexOf("visualize") > -1) {
          $('#plot-results-link').addClass('active');
          $('#plot-results-link').attr('aria-current', 'page');
        }
        if (window.location.href.indexOf("download") > -1) {
          $('#download-link').addClass('active');
          $('#download-link').attr('aria-current', 'page');
        }
      }
      global_session_id = response["session_id"];
      console.log("* session_id:",global_session_id)
      if (response["session_id"] !== undefined && location.href.includes("download")){
        var downloadConfigURL = globalBaseAPIUrl + "/api/download_config/";
          var sess_id = response["session_id"];
          
          console.log("changing download link to:", downloadConfigURL+"?sess_id="+sess_id)
          $("#download_config").attr("href", downloadConfigURL+"?sess_id="+sess_id);
      }
    }
  });

  // changes run button after click
  $("#runMB").on('click', function(){
    $('#runMB').attr('emphasis', 'false')
  });
  var sheet = window.document.styleSheets[0];
  

  // sync range sliders and inputs
  $("#flow-start-range").on('change', function(){
    var newValue = $("#flow-start-range").val()
    $("#flow-start-input").val(newValue)
    $("#range-slider").slider('values',0,newValue);
    reloadGraph()
  });
  // $("#range-slider").on('change', function(){
  //   reloadGraph();
  // });
  $("#flow-end-range").on('change', function(){
    var newValue = $("#flow-end-range").val()
    $("#flow-end-input").val(newValue)
    $("#range-slider").slider('values',1,newValue);
    reloadGraph()
  });
  $("#flow-start-range2").on('change', function(){
    var newValue = $("#flow-start-range2").val()
    $("#flow-start-input2").val(newValue)
    reloadGraph()
  });
  // $("#range-slider").on('change', function(){
  //   reloadGraph();
  // });
  $("#flow-end-range2").on('change', function(){
    var newValue = $("#flow-end-range2").val()
    $("#flow-end-input2").val(newValue)
    reloadGraph()
  });
  // physics checkbox
  $("#physics").on('change', function(){
    reloadGraph();
  });
  $("#flow-start-input").on('change', function(){
    var newValue = $("#flow-start-input").val()
    $("#flow-start-range").val(newValue)

  });
  $("#flow-end-input").on('change', function(){
    var newValue = $("#flow-end-input").val()
    $("#flow-end-range").val(newValue)
// slider value display for arrow slider
  });
  if (shouldShowArrowWidth == false) {
    console.log("removing arrow elements")
    document.getElementById("arrow-width-group-item").style.display = "none";
  }
  $("#flow-arrow-width-range").on('change', function(){
    var newValue = $("#flow-arrow-width-range").val()
    $("#arrow-range-val-display").html(newValue)
    document.getElementById("max-arrow-label").innerHTML = "Max arrow width: "+newValue;
    reloadGraph();
  });
  $("#flow-scale-select").on('change', function(){
    reloadGraph();
  });
  console.log("* has accepted cookies:", getCookie("hasAcceptedCookies"))
  if (getCookie("hasAcceptedCookies") == null || getCookie("hasAcceptedCookies") == "") {
    console.log("* showing cookie banner")
    var cookiebanner = `<div id="lawmsg" class="alert alert-info alert-dismissible h6 fade show fixed-bottom" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="setHasSeenCookieBanner()">
        <span aria-hidden="true">&times;</span>
    </button>
    UCAR uses cookies to make our website function; however, UCAR cookies do not collect personal information about you. When using our website, you may encounter embedded content, such as YouTube videos and other social media links, that use their own cookies. To learn more about third-party cookies on this website, and to set your cookie preferences, click https://www.ucar.edu/cookie-other-tracking-technologies-notice.
</div>`
    document.body.innerHTML += cookiebanner;
  }
  

});
function updateLinks() {
  console.log("window location: "+window.location.href)
    if (window.location.href.includes("ncar.github.io")) {
      var subMenu = document.getElementById('post-run-links');
      // check for github pages, modify links for every page accordingly
      for(var i = 0, l=subMenu.links.length; i<l; i++) {
        // music-box-interactive-static/ required on github pages
        if(subMenu.links[i].href.includes('javascript') == false && subMenu.links[i].href.includes('#')) { //dont mess with any javascript based href
          var finalPart = subMenu.links[i].href.replace(window.location.origin, "") // last part of url without domain
          subMenu.links[i].href = window.location.origin + '/music-box-interactive-static' + finalPart
        }
        
      }
    }
}
function setHasSeenCookieBanner() {
  setCookie("hasAcceptedCookies", "true", 1024);
  document.getElementById('lawmsg').style.display = "none";
}
function handleShowBlockElementChange() {
  if(document.getElementById('show-elements').classList.contains("selected-menu-it")) {
    //show blocked elements
    document.getElementById('block-elements').classList.add("selected-menu-it");
    document.getElementById('show-elements').classList.remove("selected-menu-it");
    
    document.getElementById("flow-species-menu-list").style.display = "none";
    document.getElementById("blocked-elements-list").style.display = "flex";
    // document.getElementById("select_all_blocked").style.display = "block";
    
  } else {
    // show "show elements"
    document.getElementById('show-elements').classList.add("selected-menu-it");
    document.getElementById('block-elements').classList.remove("selected-menu-it");

    document.getElementById("blocked-elements-list").style.display = "none";
    document.getElementById("flow-species-menu-list").style.display = "flex";
    document.getElementById("select_all_blocked").style.display = "none";
  }
}
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}