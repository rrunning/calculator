// each button click enters the corresponding character into the display field

$(document).ready (function() {
	$('.characters').on('click', insert);

// have the field to all the math for the characters entered into the field
	$('.equals').on('click', math);

// clear button removes everything from the display
	$('#clear').on('click', clearField);	

	function insert() {
			var input = $('#display-field'); 
			input.html(input.html() + $(this).html())
	}

	function math() {
		// console.log(eval($('#display-field').html()));
		var result = eval($('#display-field').html());
		$('#display-field').html(result);
	}

	function clearField() {
		$('#display-field').html('');
	}
});

