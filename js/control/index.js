/**
* TODO
* @author David Oporto
*/


$(document).ready(function (){
  $("div").hide();
  startApp();

});

// Own Code

/**
* TODO
*
*/
function startApp(){
  $("#title").show();
  $("#mainMenu").show();

  $("#mainMenu [name=action]").click(function(){ // Inside the mainmenu div it searches all the tags with that name...
    $("div").hide();
    $("#title").show();
    $("#mainMenu").show();

    $("#"+$(this).val()).show();  // We concatenate to get the name of the id of the chosen radio button and show it

    if($(this).val() == "calculator"){
      generateCalculator();
    }
  });

}

/**
* TODO
*
*/
function generateCalculator(){

  generateDay();

  var calculatorButtons = [7,8,9,"/",4,5,6,"*",1,2,3,"-",0,".","=","+"];
  var calculatorContent = "";
//  var operationInput = "";

  for (var i = 0; i < calculatorButtons.length; i++) {
    calculatorContent += '<button type ="button" id="btn-success" class= "btn-success calculatorButton">'+calculatorButtons[i]+'</button>';
    if (i==3 || i==7 || i==11 || i == 15)
      calculatorContent += '</br>';
  }
  calculatorContent += '</br><input type ="text" id="output" readonly/>';
  $("#calculator").append(calculatorContent);

  $(".calculatorButton").click(function(){
    if($(this).html()=="="){
      $("#output").val(eval($("#output").val()));
    } else{
      $("#output").val($("#output").val() + $(this).html());
    }

  });

}

/**
*
*/
function generateDay(){
  var date = new Date();
  var dateString = date.toString();
  var dayDate = date.getDate();
  var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var dayIndex = date.getDay();
  var monthDate = ["January", "February", "March", "April", "May", "June", "July","Augusy","September","October","November","Desember"];
  var yearDate = date.getFullYear();

  $("#calculator").html('<div>'+'Today is: '+dayName[dayIndex]+' '+dayDate+nth(dayDate)
  +' of '+ monthDate[date.getMonth()]+ ' '+yearDate+'</div>');

}

// Add the end of the day add the corresponding letters
function nth (d){
  if(d>3 && d<21) return 'th';
  switch (d % 10){
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: 'th';

  }

}
