var request = new XMLHttpRequest(); 

request.open('GET', "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOURKEY");


request.onload = function() {
	var response = request.response;
	var parsedData = JSON.parse(response);
	console.log(parsedData);
}

request.send();