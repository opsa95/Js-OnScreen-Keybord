/**

 *	@author David Oporto i Sala
 *	@version 1.2
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
 *	@param none
  * @return none
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
	dateContent += '<h3>David Oporto i Sala. OnScreenKeyboard</h2>';
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
 *	@param Day of the week that we get from the upper function
 *	@return none
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
 *	@date 20-09-16
 *	@version 1.2
 *	@author David Oporto i Sala
 *	@description This function shows the keyboard div. Then creates a textarea and
 *	the keyboard (all the qwerty letters + CapsLock, Shift and Del). After
 *	creating the keybord it can check which kind of button you have pressed
 *	if it's a letter will print it onto the output textbox, if it's del will
 *	erase the last character of the output, the shift button makes the next letter
 *	inserted an upcase. The capsLock makes every letter in upcase until it's pressed again (disabled).
 *	It's also changed in the keyboard, not only in the output
 *	@param none
 *	@return none
*/
function keyboardGenerator(){
	$("#keyboard").show();
	var keyboardContent="";
	var keyboardButtons=["q","w","e","r","t","y","u","i","o","p","del","capslock","a","s","d","f","g","h","j","k","l","ñ","shift","z","x","c","v","b","n","m","space"];
	var caps = false;
	var capsLock = false;

	// Creating the keyboard...
	keyboardContent += '<textarea rows="4" cols="50" id="output"> </textarea><br/>';
	for (var i=0;i<keyboardButtons.length;i++){
		keyboardContent += '<button type ="button" id="btn-success" class="btn-success keyboardButton">'+keyboardButtons[i]+'</button>';
		if (keyboardButtons[i]=="del"||keyboardButtons[i]=="ñ"||keyboardButtons[i]=="m"){
			keyboardContent += '<br />';
		}
	}
	$("#keyboard").append(keyboardContent);

	// When you press a button...
	$(".keyboardButton").click(function(){
		var inputed = $(this).html();
    if($(this).html().toUpperCase()=="CAPSLOCK"){	// Pressing the CapsLock button
				if (!capsLock){
					caps = true;
					capsLock = true;
				} else if (capsLock){
					capsLock = false;
					caps = false;
				}

				$( ".keyboardButton" ).each(function() {
					if (caps)
					// We change all the buttons to upper case...
						$(this).html($(this).html().toUpperCase());
					else if (!caps)
					// We change all the buttons to upper case...
						$(this).html($(this).html().toLowerCase());
					});

    } else if ($(this).html().toUpperCase()=="SHIFT" ){ // Pressing the Shift button...
				if (!capsLock || !caps) caps = true;
 				else 	if (capsLock || caps) caps = false;

				$( ".keyboardButton" ).each(function() {
					if (caps)
					// We change all the buttons to upper case...
						$(this).html($(this).html().toUpperCase());
					else if (!caps)
					// We change all the buttons to upper case...
						$(this).html($(this).html().toLowerCase());
					});

		} else if ($(this).html().toUpperCase()=="DEL"){ // Pressing the Del button
			var getOutput = $("#output").html();
			var newOutput = getOutput.substr(0,getOutput.length-1);
			$("#output").html(newOutput);

		} else if ($(this).html().toUpperCase()=="SPACE"){ // Pressing the Del button
			$("#output").html($("#output").html() + " ");


		} else{	// If it's a letter...
			if (!caps){
				$("#output").html($("#output").html() + inputed);
				if(capsLock) {
				caps=true;
				$( ".keyboardButton" ).each(function() {
					// We change all the buttons to upper case...
						$(this).html($(this).html().toUpperCase());
					});
				}
			} else {
				$("#output").html($("#output").html() + inputed.toUpperCase());
				if (!capsLock) {
					caps=false;
					$( ".keyboardButton" ).each(function() {
						// We change all the buttons to upper case...
							$(this).html($(this).html().toLowerCase());
						});
				}
			}
    }
  });
}
