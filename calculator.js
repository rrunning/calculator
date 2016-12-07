// each button click enters the corresponding character into the display field

$(document).ready (function() {
	var input = $('#display-field');

	$('.characters').on('click', insert);

// have the field to all the math for the characters entered into the field
	$('.equals').on('click', math);

// clear button removes everything from the display
	$('#clear').on('click', clearField);

// +/- button changes the display field sign
	$('#positive-negative').on('click', signToggle);

	function insert() {
		var el = $(this);
		// if (operatorAllowed === false && negAllowed === true && el.hasClass('minus')) {
		// 	input.html(input.html() + $(this).html());
		// 	// return;
		if (operatorAllowed === false && el.hasClass('operator')) {
			input.html(input.html().substring(0, input.html().length - 1));
			// input.html(input.html() + $(this).html());
			// return;	
		}
		if (decAllowed === false && el.hasClass('decimal')) {
			errorMsg();
			return;	
		} 
		if (negAllowed === false && el.hasClass('minus')) {
			errorMsg();
			return;	
		}
		input.html(input.html() + $(this).html());
		allowOperator(el);
		allowDec(el);
		allowNeg(el);
		console.log(operatorAllowed);
		// console.log(negAllowed);
		// addOperator();
	}

	function math() {
		var result = eval($('#display-field').html());
		$('#display-field').html(result);
		// console.log(eval($('#display-field').html()));
		// recentEntries.push($('#display-field').html());
		// recentHistory();
		// addToHistory();
	}

	function clearField() {
		$('#display-field').html('');
		decAllowed = true;
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
	function signToggle() {
		var number = $('#display-field');
		var numberString = number.html()
		var operators = ['+', '-', '/', '*'];
		for (var i = numberString.length - 1; i > 0; i--) {
			if (operators.indexOf(numberString[i]) > -1) {
			// if (numberString[i] === '+' || numberString[i] === '-' || '*' || '/') {
				numberString.splice(i, 0, '-');
				// number.html('-(' + numberString[i] + ')');
				return;
			} else if (operators.indexOf(numberString[i]) === -1) {
				number.html('-(' + numberString[i] + ')');
			}
		}

	}


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

	function allowOperator(peanut) {
		if(peanut.hasClass('operator')) {
			operatorAllowed = false;
		} else {
			operatorAllowed = true;
		}
	}

	var decAllowed = true;

	function allowDec(key) {
		if(key.hasClass('decimal')) {
			decAllowed = false;
		} else if (key.hasClass('operator')){
			decAllowed = true;
		}
	}

	var negAllowed = true;

	function allowNeg(key) {
		if(key.hasClass('minus')) {
			negAllowed = false;
		} else {
			negAllowed = true;
		}
	}

	function errorMsg() {
		alert("Invalid sequence!");
	}

});


