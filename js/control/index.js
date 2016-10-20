/**

 *	@author David Oporto i Sala
 *	@version 1.0
 *	@description jQuery program that generates an on screen keyboard, a clock
 *	and prints the date
 */
$(document).ready(function() {
	$("div").hide();
	generateDate();
	setInterval(function(){ generateDate(); }, 1000);
	keyboardGenerator();
});

/**
 *	@name generateDate
 *	@date 14-09-16
 *	@version 1.0
 *	@author David Oporto i Sala
 *	@description This function creates a string with the day of the week, the number of the
 *	day, the name of the month, and the year. Then it prints the string on screen.
 *	Also generates a digital clock which it's updated each second,
 *	showing the actual time of the client's computer.
 *	@params: none
 */
function generateDate(){
	$("#date").show();
	var dateContent = "";
  var date = new Date();
  var dateString = date.toString();
  var dayDate = date.getDate();
  var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var dayIndex = date.getDay();
  var monthDate = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
  var yearDate = date.getFullYear();

  dateContent += '<div>'+'Today is: '+dayName[dayIndex]+' '+dayDate+nth(dayDate)
  +' of '+ monthDate[date.getMonth()]+ ' '+yearDate;

	dateContent += '</br>'+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+'</div>';
	$("#date").html(dateContent);

}

/**
 *	@name nth
 *	@date 14-09-16
 *	@version 1.0
 *	@author Rubén Arroyo
 *	@description This function generates the letters before the day depending on which day of
 *	the week i has been inputed.
 *	@params: Day of the week that we get from the upper function
 */
function nth (d){
  if(d>3 && d<21) return 'th';
  switch (d % 10){
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: 'th';
  }
}

/**
 *	@name keyboardGenerator
 *	@date 19-09-16
 *	@version 1.0
 *	@author David Oporto i Sala
 *	@description This function shows the keyboard div. Then creates an output textbox and
 *	the keyboard (all the qwerty letters + CapsLock, Shift and Del). After
 *	creating the keybord it can check which kind of button you have pressed
 *	if it's a letter will print it onto the output textbox, if it's del will
 *	erase the last character of the output, the shift button makes the next letter
 *	inserted an upcase. The capsLock makes every letter in upcase until it's pressed again (disabled).
 *	@params: none
*/
function keyboardGenerator(){
	$("#keyboard").show();
	var keyboardContent="";
	var keyboardButtons=["q","w","e","r","t","y","u","i","o","p","Del","CapsLock","a","s","d","f","g","h","j","k","l","ñ","Shift","z","x","c","v","b","n","m"];
	var caps = false;
	var capsLock = false;

	// Creating the keyboard...
	keyboardContent += '<input type ="text" id="output" readonly/><br/>';
	for (var i=0;i<keyboardButtons.length;i++){
		keyboardContent += '<button type ="button" id="btn-success" class="btn-success keyboardButton">'+keyboardButtons[i]+'</button>';
		if (keyboardButtons[i]=="Del"||keyboardButtons[i]=="ñ"){
			keyboardContent += '<br />';
		}
	}
	$("#keyboard").append(keyboardContent);

	// When you press a button...
	$(".keyboardButton").click(function(){
		var inputed = $(this).html();
    if($(this).html()=="CapsLock"){	// Pressing the CapsLock button...
				if (!capsLock){
					caps = true;
					capsLock = true;
				} else if (capsLock){
					capsLock = false;
					caps = false;
				}

    } else if ($(this).html()=="Shift"){ // Pressing the Shift button...
				if (!capsLock) caps = true;
 				else caps = false;

		} else if ($(this).html()=="Del"){ // Pressing the Del button...
			var getOutput = $("#output").val();
			var newOutput = getOutput.substr(0,getOutput.length-1);
			$("#output").val(newOutput);

		} else{	// If it's a letter...
			if (!caps){
				$("#output").val($("#output").val() + inputed);
				if(capsLock) caps=true;
			} else {
				$("#output").val($("#output").val() + inputed.toUpperCase());
				if (!capsLock) caps=false;
			}

    }

  });

}
