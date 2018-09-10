$(document).ready(function(){

// Declaration of variables
	var lat, long;
	var weatherType, windSpeed, city, kTemp, fTemp, cTemp, humidity;
	var tempSwap = true;

// Getting geolocation and passing to the getData() function
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			lat = position.coords.latitude;
			long = position.coords.longitude;
			getData(lat, long);
			// console.log(lat);
			// console.log(long);
		});
	}

// creating getData() function
	function getData(lat, long){
// requesting api to get data
		var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=4ef6b43fa1afbeede0bbbbf74d99483b";
		$.getJSON(api, function(data){
			weatherType = data.weather[0].description;
			kTemp = data.main.temp;
			windSpeed = data.wind.speed;
			city = data.name;
			humidity = data.main.humidity;
			// console.log(weatherType);
			// console.log(kelvin);
			// console.log(windSpeed);
			// console.log(city);
			// console.log(data);

// converting kelvin into fahrenheit
	fTemp = ((kTemp-273)*9/5 + 32).toFixed(1);

// converting kelvin into celsius
	cTemp = (kTemp-273).toFixed(1);

// converting m/s to km/h
	windSpeed = (windSpeed*3.6).toFixed(1);

	$("#city").html(city);
	$("#weatherType").html(weatherType);
	$("#cTemp").html(cTemp + " &#8451;");
	$("#windSpeed").html(windSpeed + " km/h");
	$("#humidity").html(humidity + "%");

// function to toggle between celsius and fahrenheit
	$("#cTemp").click(function(){
		if(tempSwap === true){
			$("#cTemp").html(fTemp + " &#8457;");
			tempSwap = false;
		}
		else{
			$("#cTemp").html(cTemp + " &#8451;");
			tempSwap = true;
		}
	});

	if(cTemp<15){
		$("body").css("background-image", "url(https://ak1.picdn.net/shutterstock/videos/15893251/thumb/1.jpg)");
	}
	else if((cTemp<20) && (cTemp>=15)){
		$("body").css("background-image", "url(https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/66t7Woj/snowfall-of-a-winter-cold-weather_4zdvfvche__F0000.png)");
	}
	else if((cTemp<30) && (cTemp>=20)){
		$("body").css("background-image", "url(http://thewallpaper.co/wp-content/uploads/2016/10/Free-Weather-Background-hd-wallpapers-windows-apple-amazing-4k-samsung-wallpapers-free-download-1920x1080.jpg)");
	}
	else if((cTemp<=40) && (cTemp>=30)){
		$("body").css("background-image", "url(http://www.danspapers.com/wp-content/uploads/2015/12/BrightSunBlueSkyWEB.jpg)");
	}
	else if(cTemp>40){
		$("body").css("background-image", "url(http://www.wallpapers13.com/wp-content/uploads/2017/07/Desert-Landscape-Summer-sunset-in-the-desert-red-sand-beautiful-pictures-1920x1200-915x515.jpg)");
	}
	else{
		$("body").css("background-image", "url(https://rampages.us/halawadhi96/wp-content/uploads/sites/5047/2015/02/nature-landscape-alluring-picture-hot-desert-sun-hd-wallpaper-background-hot-as-sun-desert-song-lyrics-hot-as-sun-desert-song-desert-hot-springs-sunshine-cafe-730x456.jpg)");
	}

		});
	}

});
