$(document).ready (function() {
	var input = $('#display-field');
	$('.characters').on('click', function() {
		insert($(this).html())
	});
	$('.equals').on('click', math);
	$('#clear').on('click', clearField);
	$('#positive-negative').on('click', posneg);
	$(window).on('keyup', function(event) {
		var keyString = peanut(event);
		if (keyString === undefined){
			return;
		} else {
			insert(keyString);
		}
		console.log('event', event);
	});
	var operatorArr = ['+', '-', '*', '/'];
	var numArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	function posneg() {
		var currScreen = input.html();
		if( currScreen.length === 0) {
			input.html('-');
		}
		else {
			for (var i = currScreen.length -1; i >= 0; i--) {
				var firstHalf;
				var secondHalf;
				if (isOperator(currScreen[i])) {
					if (currScreen[i] !== '-'){
						firstHalf = currScreen.slice(0, i+1);
						secondHalf = currScreen.slice(i+1);
						var secHalf = '-' + secondHalf;
						currScreen = firstHalf + secHalf;
						break;
					}
					else {
						if (i === 0 || isOperator(currScreen[i-1])) {
							firstHalf = currScreen.slice(0, i);
							secondHalf = currScreen.slice(i+1);
							currScreen = firstHalf + secondHalf;
							break;
						}
						else {
							firstHalf = currScreen.slice(0, i+1);
							secondHalf = currScreen.slice(i+1);
							var secHalf = '-' + secondHalf;
							currScreen = firstHalf + secHalf;
							break;
						}
					}
				}
				else {
					if (i === 0){
						currScreen = '-' + currScreen
						break;
					}
					else {
					}
				}
			}
			input.html(currScreen);
		}
	}

	function addParenth(currStr) {
		var currScreen = currStr;
		var splitStart;
		var splitEnd;
		var finalStr;
		for (var i = currScreen.length -1; i > 0; i--) {
			if (splitEnd) {
				if (isOperator(currScreen[i])) {
					if (currScreen[i] === '-' || i === 0) {
						if (currScreen[i-1] === '-') {
							splitStart = i;
							currScreen = currScreen.slice(0, splitStart) + '(' + currScreen.slice(splitStart, splitEnd + 1) + ')' + currScreen.slice(splitEnd + 1, currScreen.length);
							splitStart = null;
						}
						else {
							splitEnd = null;
						}
					}
					else {
						splitEnd = null;
					}
				}
				else {
				}
			}
			else {
				if (isOperator(currScreen[i])) {
					continue;
				}
				else {
					splitEnd = i;
				}
			}
		}
		if (!splitEnd || !splitStart) {
			finalStr = currScreen;
		}
		else {
			finalStr = currScreen.slice(0, splitStart) + '(' + currScreen.slice(splitStart, splitEnd + 1) + ')';
		}
		return finalStr;
	}

	function findCharacter() {
		var currentCharacter = $(this).html();
		console.log(currentCharacter)
		return $(this).html();
	}

	function insert(character) {
		fixString();
		currScreen = input.html();
		var lastChar = currScreen.charAt(currScreen.length - 1);
		if (lastChar === '.' && operatorArr.indexOf(character) != -1) {
			errorMsg();
			return;
		}
		if (operatorAllowed === false && operatorArr.indexOf(character) > -1 && operatorArr.indexOf(lastChar) != -1) {
			input.html(input.html().substring(0, input.html().length - 1));
		}
		if (decAllowed === false && character === '.') {
			errorMsg();
			return;
		}
		input.html(input.html() + character);
		allowOperator(character);
		allowDec(character);
	}

	function math() {
		var string = fixString();
		var result = eval(string);
		var roundStr = parseFloat(result.toFixed(5));
		input.html(roundStr);
		operatorAllowed = true;
		if (result.toString().indexOf('.') !== -1){
			decAllowed = false;
		}
		else {
			decAllowed = true;
		}
	}
	function clearField() {
		input.html('');
		decAllowed = true;
		operatorAllowed = false;
	}
	var operatorAllowed = true;
	function allowOperator(character) {
		if(operatorArr.indexOf(character) != -1 || character === '.') {
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
	function errorMsg() {
		alert("Invalid sequence!");
	}
	function fixString() {
		var displayString = input.html();
		var lastCharacter = displayString.charAt(displayString.length - 1);
		if (operatorArr.indexOf(lastCharacter) != -1) {
			displayString = displayString.substring(0, displayString.length - 1);
		}
		return addParenth(displayString);
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
	function isOperator(character) {
		return operatorArr.indexOf(character) > -1;
	}
	function isNum(character) {
		return numArr.indexOf(character) > -1;
	}
	function addNegative() {
		var characterStr = input.html()
		if (characterStr.length === 0) {
				input.html(input.html() + '-')
		} else {
			for (var i = characterStr.length -1; i >= 0; i--) {
				if(isOperator(characterStr[i])) {
					input.html(input.html() + '-');
					break;
				}
			}
		}
	}
});
