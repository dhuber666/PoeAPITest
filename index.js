$(document).ready(function() {
	// global variables
	const LEAGUE_URL = 'http://api.pathofexile.com/ladders/harbinger';
	var buttonClicked = false;
	var id;
	var numberInput = $('#numberInput');
	var todoMessage = $('#todoMessage');
	var failDiv = $('#fail');
	var successDiv = $('#success');

	//fetches number of players you give it (maximum 200)
	// returns: Array with the players
	function fetchLimit(limit) {
		let link = LEAGUE_URL + `?limit=${limit}`;
		console.log(link);

		// API Call
		$.ajax({
			method: 'GET',
			url: link
		})
			.done(function(res, textStatus, xhr) {
				console.log(xhr.status);
				console.log('Response: ', res);
				console.log('textStatus: ', textStatus);
				successDiv.css('display', 'block');
				failDiv.css('display', 'none');
			})
			.fail(function(xhr) {
				failDiv.css('display', 'block');
				successDiv.css('display', 'none');
				console.log(xhr.status);
				endInterval();
				buttonClicked = true;
			});
	}

	// click event listener for button
	var button = document.getElementById('btn');
	button.addEventListener('click', function() {
		if (numberInput.val()) {
			buttonClicked ? endInterval() : startInterval(Number(numberInput.val()));
			buttonClicked = !buttonClicked;
		} else {
			console.log(todoMessage);
			todoMessage.html('No number - give me a number');
		}
	});
	// clears timer and starts a 30 cooldown counter (then you can try the api call again)
	function endInterval() {
		clearInterval(id);
		$('#input').css('display', 'none');
		let timer = $('#timer');
		console.log(timer);
		let counter = 0;
		id = setInterval(function() {
			if (counter < 30) {
				counter++;
				timer.text(counter);
			} else {
				clearInterval(id);
				buttonClicked = false;
				$('#input').css('display', 'block');
			}
		}, 1000);
	}
	// here you can try out the timer. Decrease it until you see it fail.
	function startInterval(interval) {
		console.log(typeof interval);
		id = setInterval(function() {
			fetchLimit(10);
		}, interval);
	}
});
