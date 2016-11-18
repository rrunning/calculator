// each button click enters the corresponding character into the display field

$(document).ready (function() {
	$('.characters').on('click', insert);

// have the field to all the math for the characters entered into the field
	$('.equals').on('click', math);

// clear button removes everything from the display
	$('#clear').on('click', clearField);

// +/- button changes the display field sign
	$('#positive-negative').on('click', signToggle);

	function insert() {
			var input = $('#display-field');
			var el = $(this);
			if(operatorAllowed === false & el.hasClass('operator')) {
				alert("Invalid sequence!");
				return;
			} 
			input.html(input.html() + $(this).html());
			allowOperator(el);
			console.log(operatorAllowed);
			// addOperator();
	}

	function math() {
		// console.log(eval($('#display-field').html()));
		// recentEntries.push($('#display-field').html());
		// lastFiveEntries();
		addToHistory();
		var result = eval($('#display-field').html());
		$('#display-field').html(result);
	}

	function clearField() {
		// recentEntries.push($('#display-field').html());
		// lastFiveEntries();
		addToHistory();
		$('#display-field').html('');
		console.log(recentEntries);
	}
	// function addOperator() {
	// 	var displayString = $('#display-field').html();
	// 	var lastCharacter = displayString.charAt(displayString.length - 1);
	// 	console.log(lastCharacter);
	// }

	// use the +/- buton to change the number from + to - and vice versa
	function signToggle() {
		var number = $('#display-field');
		number.html('-(' + number.html() + ')');
	}

});
var recentEntries = []

function lastFiveEntries() {
	$('ul').append($('<li>').text(recentEntries[recentEntries.length - 1]));
}

function addToHistory () {
	recentEntries.push($('#display-field').html());
	lastFiveEntries();
}

// Do not allow any operators to be placed side by side.
var operatorAllowed = true;

function allowOperator(peanut) {
	if(peanut.hasClass('operator')) {
		operatorAllowed = false;
	} else {
		operatorAllowed = true;
	}
}

