var x = document.getElementById("geo");
var lat;	//global variable for latitude to use by getLocation and weatherData
var lon;
var firstDay;   //global variables for google calendar data for specific days
var secondDay;
var thirdDay;


function showInput(){
	document.getElementById('display').innerHTML = 
		document.getElementById("user_input").value;
}
function getLocation() {				//function to obtain location
   

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";		//error message if not supported
  }
}
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 			//obtaind latitude and longitude using x from above
  "<br>Longitude: " + position.coords.longitude;
 console.log(position);
 lat = position.coords.latitude;					//set global lat and lon to be used by weatherData
 lon = position.coords.longitude;
}


function weatherData() {							//function to get weatherData Automatic Location
	var request = new XMLHttpRequest();



	request.open('GET', "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=YOURKEY");



	request.onload = function() {
	var obj =JSON.parse(this.response);
	console.log(obj);
	//document.getElementById('weatherLine').innerHTML = obj.name + " - " + obj.weather[0].description + " - " + obj.main.temp + "  c";  //combine required elements into 1 line of text
	document.getElementById('name').innerHTML = obj.name;				// elements to be obtained
	document.getElementById('weather').innerHTML = obj.weather[0].main;
	document.getElementById('temp').innerHTML = obj.main.temp;
	// document.getElementById('feel').innerHTML = obj.main.feels_like;
	var icon = obj.weather[0].icon
	var image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
	document.getElementById('icon').innerHTML = "<img src='" + image + "'>";
}

request.send();
}
function weatherData2() {							//function to get weatherData User entered Location

	var townU = document.getElementById("userTown").value;
	console.log(townU);
	
	var request = new XMLHttpRequest();



	request.open('GET', "https://api.openweathermap.org/data/2.5/weather?q=" + townU + ",uk&units=metric&appid=YOURKEY");



	request.onload = function() {
	var obj =JSON.parse(this.response);
	console.log(obj);
	//document.getElementById('weatherLine').innerHTML = obj.name + " - " + obj.weather[0].description + " - " + obj.main.temp + "  c";  //combine required elements into 1 line of text
	document.getElementById('name').innerHTML = obj.name;				// elements to be obtained
	document.getElementById('weather').innerHTML = obj.weather[0].main;
	document.getElementById('temp').innerHTML = obj.main.temp;
	// document.getElementById('feel').innerHTML = obj.main.feels_like;
	var icon = obj.weather[0].icon
	var image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
	document.getElementById('icon').innerHTML = "<img src='" + image + "'>";
}

request.send();
}

function hideTable() {
		document.getElementById("tableDisplay").style.display = "";		//function to display hidden table 'ie the app' 
}
function showLocation() {
	document.getElementById("locationDisplay").style.display = "";		//function to display location button
}

function hideButton() {
		document.getElementById("buttonDisplay").style.display="";		//function to display hidden button 'continue'
}
function hideSelect() {
		document.getElementById("selectDisplay").style.display="";		//for background colour selection
}
function hideIconS() {
		document.getElementById("iconSDisplay").style.display="";		//for image selection
}
function changeColor(id,color){

  id.style.backgroundColor=color;
}
function hideManualLoc() {
	document.getElementById("hideManual").style.diplay="none";
}
//function changeIcon(IS) {
	//var IconS= IS.value;
	//console.log(IconS);
//}
function minTwoDigits(n) {
	return (n<10 ? '0' : '') + n;										//function to make date and time 2 digits, not used!!!
}
function dateFunction(){												//function to obtain time and date
	var now = new Date();
	var nowDay = now.getDay();
	var nowHour = now.getHours();
	var nowMin = now.getMinutes();
	nowMin = ("0" + nowMin).slice(-2);									// makes minutes 2 digits by adding 0 to the from and then slice -2) takes the last 2 digits, so 1 becomes 01 and sliced 01. 10 becomes 010 and sliced 10
	var nowDd = now.getDate();
	nowDd2 = nowDd + 1;
	nowDd3 = nowDd + 2;
	nowDd = ("0" + nowDd).slice(-2);
	nowDd2 = ("0" + nowDd2).slice(-2);
	nowDd3 = ("0" + nowDd3).slice(-2);
	var nowMm = now.getMonth();
	nowMm=nowMm + 1;													//month returned as value 0-11 so +1 to make correct.
	nowMm = ("0" + nowMm).slice(-2);
	var nowYy = now.getFullYear();
console.log(now);
var theTime = nowHour  + ":" + nowMin;									//putting hour and min together to make the time
console.log(theTime);

var theDate = nowDd + "-" + nowMm + "-" + nowYy;
console.log(theDate);
firstDay = nowYy + "-" + nowMm + "-" + nowDd;			//for google calendar
secondDay = nowYy + "-" + nowMm + "-" + nowDd2;
thirdDay = nowYy + "-" + nowMm + "-" + nowDd3;
console.log(firstDay);
console.log(secondDay);
console.log(thirdDay);

var dayName = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'];    //day is returned as a number (0-6) the array translates this to names.
var dayNameNow = (dayName[nowDay]);
console.log(dayNameNow);

document.getElementById('theTime').innerHTML = theTime;
document.getElementById('theDate').innerHTML = theDate;
document.getElementById('dayNameNow').innerHTML = dayNameNow;
};
function swapImage(){														//function to change selected image, this relies on a displayed image which is next to the selection box but sized to 1px so not visible, probably not best way for this.
	var image = document.getElementById("imageToSwap");
	var dropd = document.getElementById("imageList");
	image.src = dropd.value;
	console.log(image.src)
	
	document.getElementById('image').innerHTML = "<img src='" + image.src + "'>";
}


// Google Developer Code for Calendar API
 // Client ID and API key from the Developer Console
      var CLIENT_ID = 'YOURKEY.apps.googleusercontent.com';
      var API_KEY = 'YOURKEY';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');


      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
		  appendPre2(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listUpcomingEvents();
		  listUpcomingEvents2();						//run second function for tomorrows data
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {								//todays events
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
	    function appendPre2(message) {								//tomorrows events
        var pre2 = document.getElementById('content2');
        var textContent2 = document.createTextNode(message + '\n');
        pre2.appendChild(textContent2);
      }

//the following is adapted to return data for a specific day
      /**
       * Print the summary and start datetime/date of the next ten events in 
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
  function listUpcomingEvents() {             //todays events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': firstDay + 'T01:00:00+01:00',
		  'timeMax': secondDay + 'T01:00:00+01:00',
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 5,
          'orderBy': 'startTime'
        }).then(function(response) {			
          var events = response.result.items;
          appendPre('');

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
				{var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre((i+1) + ' - ' + event.summary)
            }
			}
          } else {
            appendPre('No upcoming events found.');
          }
		  console.log(events);
        });
      }

	function listUpcomingEvents2() {				//tomorrows events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
         'timeMin': secondDay + 'T01:00:00+01:00',
		  'timeMax': thirdDay + 'T01:00:00+01:00',
          'showDeleted': false,
          'singleEvents': true,
       'maxResults': 5,
         'orderBy': 'startTime'
        }).then(function(response) {
          var events2 = response.result.items;
          appendPre2('');

          if (events2.length > 0) {
            for (i = 0; i < events2.length; i++) {				
			{var event = events2[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre2((i+1) + ' - ' + event.summary)
           }
			}
          } else {
            appendPre2('No upcoming events found.');
         }
		  console.log(events2);
        });
      }
	  