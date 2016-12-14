// each button click enters the corresponding character into the display field

$(document).ready (function() {
	var input = $('#display-field');

	$('.characters').on('click', function() {
		insert($(this).html())
	});

// have the field to all the math for the characters entered into the field
	$('.equals').on('click', math);

// clear button removes everything from the display
	$('#clear').on('click', clearField);

// +/- button changes the display field sign
	// $('#positive-negative').on('click', signToggle);

	$(window).on('keyup', function(event) {
		var keyString = peanut(event);
		if (keyString === undefined){
			return;
		} else {
			insert(keyString);
		}

		console.log('event', event);
	});

	var operatorArr = ['+', '-', '+', '/'];

	function findCharacter() {
		var currentCharacter = $(this).html(); 
		console.log(currentCharacter)
		return $(this).html();
	}

	function insert(character) {
		// var el = $(this);

		if (operatorAllowed === false && operatorArr.indexOf(character) > -1) {
			input.html(input.html().substring(0, input.html().length - 1));
			// input.html(input.html() + $(this).html());
			// return;	
		}
		if (decAllowed === false && character === '.') {
			errorMsg();
			return;	
		} 
		if (negAllowed === false && character === '-') {
			errorMsg();
			return;	
		}
		input.html(input.html() + character);
		allowOperator(character);
		allowDec(character);
		allowNeg(character);
		console.log(operatorAllowed);
		// console.log(negAllowed);
		// addOperator();
	}

	function math() {
		var string = fixString();
		var result = eval(string);
		input.html(result);
		operatorAllowed = true;
		decAllowed = true;
		negAllowed = true;
		// console.log(eval($('#display-field').html()));
		// recentEntries.push($('#display-field').html());
		// recentHistory();
		// addToHistory();
	}

	function clearField() {
		input.html('');
		decAllowed = true;
		operatorAllowed = false;
		negAllowed = true;
		// recentEntries.push($('#display-field').html());
		// recentHistory();
		// addToHistory();
		// console.log(recentEntries);
	}

	// function addOperator() {
	// 	var displayString = $('#display-field').html();
	// 	var lastCharacter = displayString.charAt(displayString.length - 1);
	// 	console.log(lastCharacter);
	// }

	// use the +/- buton to change the number from + to - and vice versa
	// function signToggle() {
	// 	// var number = $('#display-field');
	// 	var numberString = input.html()
	// 	var operators = ['+', '-', '/', '*'];
	// 	for (var i = numberString.length - 1; i > 0; i--) {
	// 		if (operatorArr.indexOf(numberString[i]) > -1) {
	// 		// if (numberString[i] === '+' || numberString[i] === '-' || '*' || '/') {
	// 			numberString.splice(i, 0, '-');
	// 			// number.html('-(' + numberString[i] + ')');
	// 			return;
	// 		} else if (operators.indexOf(numberString[i]) === -1) {
	// 			number.html('-(' + numberString[i] + ')');
	// 		}
	// 	}

	// }


	// var history = [];

	// var recentEntries = [];

	// function recentHistory() {
	// 	for (var i=0; i<recentEntries.length; i++) {
	// 		$('select').append('<option>').text(recentEntries[recentEntries.length - 1]);
	// 	}
	// 	$('ul').append($('<li>').text(recentEntries[recentEntries.length - 1]));
	// }

	// function addToHistory () {
	// 	recentEntries.push($('#display-field').html());
	// 	recentHistory();
	// }

	// Do not allow any operators to be placed side by side.

	var operatorAllowed = true;

	function allowOperator(character) {
		if(operatorArr.indexOf(character) != -1) {
			operatorAllowed = false;
		} else {
			operatorAllowed = true;
		}
	}

	var decAllowed = true;

	function allowDec(character) {
		if(character === '.') {
			decAllowed = false;
		} else if (operatorArr.indexOf(character) != -1) {
			decAllowed = true;
		}
	}

	var negAllowed = true;

	function allowNeg(character) {
		if(character === '-') {
			negAllowed = false;
		} else {
			negAllowed = true;
		}
	}

	function errorMsg() {
		alert("Invalid sequence!");
	}

	function fixString() {
		var displayString = input.html();
		var lastCharacter = displayString.charAt(displayString.length - 1);
		// console.log(lastCharacter);
		if (lastCharacter === '+' || lastCharacter === '-' || lastCharacter === '/' || lastCharacter === '*') {
			// input.html(input.html().substring(0, input.html().length - 1));
			displayString = displayString.substring(0, displayString.length - 1);
		}
		return displayString;
	}

	function peanut(event) {
		var key;
		switch (event.keyCode) {
			case 49:
				key = '1';
				break;
			case 50:
				key = '2';
				break;
			case 51:
				key = '3';
				break;
			case 52:
				key = '4';
				break;
			case 53:
				key = '5';
				break;
			case 54:
				key = '6';
				break;
			case 55:
				key = '7';
				break;
			case 56:
				key = event.shiftKey ? '*' : '8';
				break;
			case 57:
				key = '9';
				break;
			case 48:
				key = '0';
				break;
			case 189:
				key = '-';
				break;
			case 187:
				key = '+';
				break;
			case 191:
				key = '/';
				break;
			case 13:
				return math();
				break;
			case 8:
				return clearField();
				break;
		}
		return key;
	}
});


