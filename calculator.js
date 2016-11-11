// each button click enters the corresponding character into the display field

$(document).ready (function() {
	$('.characters').on('click', insert);

// have the field to all the math for the characters entered into the field
	$('.equals').on('click', console.log($('#display-field').val()));

	function insert() {
			var input = $('#display-field'); 
			input.html(input.html() + $(this).html())
	}

});

