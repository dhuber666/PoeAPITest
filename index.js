$(document).ready(function() {
	
	// global variables
	const LEAGUE_URL = "http://api.pathofexile.com/ladders/harbinger";
	var buttonClicked = false;
	var id;

	// fetches number of players you give it (maximum 200)
	// returns: Array with the players
	function fetchLimit(limit) {
		
		let link = LEAGUE_URL + `?limit=${limit}`;
		console.log(link);

		// API Call
		$.ajax({
		method: "GET",
		url: link,
		}).done(function(res, textStatus, xhr) {

			console.log(xhr.status);
			console.log("Response: ", res);
			console.log("textStatus: ", textStatus);

		}).fail(function(xhr) {
			console.log(xhr.status);
			endInterval();
			buttonClicked = true;
		})
	}

	// click event listener for button
	var button = document.getElementById('btn');
	button.addEventListener("click", function() {
		buttonClicked ? endInterval() : startInterval();
		buttonClicked = !buttonClicked;
		
	})
	// clears timer and starts a 30 cooldown counter (then you can try the api call again)
	function endInterval() {
		clearInterval(id);
		let timer = $('#timer');
		console.log(timer);
		let counter = 0;
		id = setInterval(function() {
			if(counter < 30) {
				counter++;
				timer.text(counter);
			} else {
				clearInterval(id);
				buttonClicked = false;
				startInterval();
			}
		}, 1000)
	}
	// here you can try out the timer. Decrease it until you see it fail. 
	function startInterval() {
		
		id = setInterval(function() {
			fetchLimit(5);
		}, 10000)
	}

	



})