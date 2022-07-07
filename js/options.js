$(document).ready(function(){

  // logging update toggle switch
  // $("#islogon").on('click', function(){
  //   if ($('#islogon').is(":checked")){
  //     var loggingOn = "True";
  //   } else {
  //     var loggingOn = "False";
  //   }
  //   $.ajax({
  //     url: "/conditions/logging-toggle",
  //     type: 'get',
  //     data: {
  //       "isOn": loggingOn
  //     },
  //     success: function(response){
  //     }
  //   });
  // });
  var apiRequestURL = globalBaseAPIUrl + "/api/model-options/";
  var requestType = "get";
  $.ajax({
      url:apiRequestURL,
      type: requestType,
      xhrFields: {
    withCredentials: true
 },
 crossDomain: true,
      data: {
      },
      success: function(response){
        console.log("got response from options GET: ", response);
        var chem_step_units = response['chem_step.units']
        var chemistry_time_step = response['chemistry_time_step']
        var grid = response['grid']
        var output_step_units = response['output_step.units']
        var output_time_step = response['output_time_step']
        var simulation_length = response['simulation_length']
        var simulation_length_units = response['simulation_length.units']
        document.getElementById('id_chemistry_time_step').value = chemistry_time_step;
        document.getElementById('id_chem_step.units').value = chem_step_units;
        document.getElementById('id_grid').value = grid;
        document.getElementById('id_output_step.units').value = output_step_units;
        document.getElementById('id_output_time_step').value = output_time_step;
        document.getElementById('id_simulation_length').value = simulation_length
        document.getElementById('id_simulation_length.units').value = simulation_length_units;
      }
    });
  // fills logging toggle switch correctly
  // if ( $('#islogon').length ){
  //   $.ajax({
  //     url: "/conditions/logging-toggle-check",
  //     type: 'get',
  //     success: function(response){
  //       if (response["isOn"]){
  //         $('#islogon').prop("checked", true)
  //       } else {
  //         $('#islogon').prop("checked", false)
  //       }
  //     }
  //   });
  // }

  // autofills units in options drowdowns
  $('.options-dropdown').filter(function() {
    var units = $(this).attr('unit');
    $(this).val(units);
  });
});
