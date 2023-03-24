var request = new XMLHttpRequest();

request.open('GET',"URL with KEY");


request.onload = function() {
	var obj =JSON.parse(this.response);
	console.log(obj);
	document.getElementById('name').innerHTML = obj.name;
	document.getElementById('weather').innerHTML = obj.weather[0].description;
	document.getElementById('temp').innerHTML = obj.main.temp;
};
request.send();