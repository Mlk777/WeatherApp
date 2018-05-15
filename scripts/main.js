function getWeather() {
  function getPosition(position) {
    //Getting longitude and latitude
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    //Building date and Adding 0 to the date if minutes < 10
    var d = new Date();

    //Month goes from 0 to 11 so if month is January add 0 in front
    var month = d.getMonth();
    if (month == 0) {
      month = "01";
    }

    var today = `${d.getFullYear()}-${month}-${d.getUTCDate()}`;
    console.log(`la date d'aujourd'hui ${today}`);
    var hours = d.getHours();
    var time = new moment().format("HH:mm:ss");
    console.log(time);

    var minutes = d.getMinutes();
    if (minutes < 10) minutes += "0";
    console.log(minutes);

    //Building api full url depending on latitude and longitude
    var url = apiUrl + "lat=" + latitude + "&lon=" + longitude;
    //For testing : var url = "https://fcc-weather-api.glitch.me/api/current?lat=69.142596&lon=26.977247";
    console.log(url);

    $.getJSON(url, function(val) {
      //Toggling temperature
      function toggleTemperature() {
        //init var
        var tempMinCelsius = Math.round(val.main.temp_min);
        var tempMaxCelsius = Math.round(val.main.temp_max);
        var temperatureCelsius = Math.round(val.main.temp);
        var tempMinFarenheit = Math.round(val.main.temp_min * 1.8 + 32);
        var tempMaxFarenheit = Math.round(val.main.temp_max * 1.8 + 32);
        var temperatureFarenheit = Math.round(val.main.temp * 1.8 + 32);
        var celsiusMinMax = true;
        var celsius = true;

        //Display basic temperature before toggling it
        $("#temperature").html(
          `The current temperature is ${temperatureCelsius}°C`
        );
        $("#temperatureMinMax").html(
          `Temperature beetween ${tempMinCelsius}°C and ${tempMaxCelsius}°C today`
        );

        //click function current temperature
        $("#temperature").click(function() {
          if (celsius) {
            $("#temperature").html(
              `The current temperature is ${temperatureFarenheit}°F`
            );
            celsius = false;
          } else {
            $("#temperature").html(
              `The current temperature is ${temperatureCelsius}°C`
            );
            celsius = true;
          }
        });
        //click function range temperature
        $("#temperatureMinMax").click(function() {
          if (celsiusMinMax) {
            $("#temperatureMinMax").html(
              `Temperature beetween ${tempMinFarenheit}°F and ${tempMaxFarenheit}°F today`
            );
            celsiusMinMax = false;
          } else {
            $("#temperatureMinMax").html(
              `Temperature beetween ${tempMinCelsius}°C and ${tempMaxCelsius}°C today`
            );
            celsiusMinMax = true;
          }
        });
      }

      var cityName = val.name;
      var wind = Math.round(val.wind.speed * 3.6);
      var sunset = moment.unix(val.sys.sunset);
      var date1 = moment(`${today} ${sunset.format("HH:mm:ss")}`);
      var date2 = moment(`${today} ${time}`);
      console.log(date1);
      console.log(date2);
      var diff = date2.diff(date1, "minutes");
      console.log(diff);

      var beforeSunset;

      if (Math.abs(diff) <= 30) {
        beforeSunset = diff;
        $("#sunset").html(`The sun will set in ${beforeSunset} minutes`);
      }

      $("#wind").html(`The wind blows at ${wind}km/h`);

      function displayMessage() {
        var hoursArray = [
          ["05", "06", "07", "08", "09", "10", "11"],
          ["12", "13", "14", "15", "16", "17", "18"],
          ["19", "20", "21", "22", "23", "00", "01", "02", "03", "04"]
        ];
        for (i = 0; i < hoursArray.length; i++) {
          var tabElement = hoursArray[i];
          for (j = 0; j < tabElement.length; j++) {
            if (d.getHours() == hoursArray[0][j]) {
              $("#cityName").html(
                `Good Morning ${cityName} ! It's ${hours}h${minutes}`
              );
              //console.log("good morning");
              return;
            } else if (d.getHours() == hoursArray[1][j]) {
              $("#cityName").html(
                `Good Afternoon ${val.name} ! It's ${hours}h${minutes}`
              );
              //console.log("good afternoon");
              return;
            } else if (d.getHours() == hoursArray[2][j]) {
              $("#cityName").html(
                `Good Evening ${cityName} ! It's ${hours}h${minutes}`
              );
              //console.log("good evening");
              return;
            }
          }
        }
      }
      /*var morning = ["05", "06", "07", "08", "09", "10", "11"];
          var afternoon = ["12", "13", "14", "15", "16", "17", "18"];
          var evening = ["19", "20", "21", "22", "23", "00", "01", "02", "03", "04"];
          for (var i = 0; i < morning.length; i++) {
            if (d.getHours() == morning[i]) {
              $("#cityName").html(`Good Morning from ${cityName} ! It's ${hours}h${minutes}`);
            }
          }
          for (var i = 0; i < afternoon.length; i++) {
            if (d.getHours() == afternoon[i]) {
              $("#cityName").html(`Good Afternoon from ${val.name} ! It's ${hours}h${minutes}`);
            }
          }
          for (var i = 0; i < evening.length; i++) {
            if (d.getHours() == evening[i]) {
              $("#cityName").html(`Good Evening from ${cityName} ! It's ${hours}h${minutes}`);
            }
          }
        }*/

      function clearSky() {
        var imageURL =
          "http://www.solarnews.es/wp-content/uploads/2015/10/back10.jpg";
        $(".wrapper p").css("color", "#555555e6");
        $(".wrapper h1").css("color", "#333333b5");
        $("body").attr("id", "clearSky");
      } //End function
      function inTheMist() {
        $("body").attr("id", "inTheMist");
        $(".wrapper h1").css("color", "#343a404f");
        $(".wrapper p").css("color", "#3333339c");
      } //End function
      function makeItSnow() {
        $("html").append("<div id='snowfall'></div>");
        $("html").attr("id", "snowfall");
        //$("body").attr("id", "snowfall");
        $("body").css("background-color", "lavender");
        $(".wrapper h1").css("color", "#222");
        $(".wrapper p").css("color", "#7995b1");
        particlesJS("snowfall", {
          particles: {
            number: {
              value: 200
            },
            shape: {
              type: "circle"
            },
            size: {
              value: 5,
              random: true
            },
            line_linked: {
              enable: false
            },
            move: {
              enable: true,
              speed: 2,
              direction: "bottom",
              straight: false
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: false,
                mode: "bubble"
              },
              onclick: {
                enable: false,
                mode: "repulse"
              }
            },
            modes: {
              bubble: {
                particles_nb: 12
              }
            }
          }
        });
      } //End function
      function makeItRain() {
        $("html").append("<div id='rainfall'></div>");
        $("html").attr("id", "rainfall");
        //$("body").attr("id", "rainfall");
        $("body").css("background-color", "lavender");
        $(".wrapper p").css("color", "#7995b1");
        $(".wrapper h1").css("color", "#222");
        particlesJS("rainfall", {
          particles: {
            number: {
              value: 600,
              density: {
                enable: false,
                value_area: 200
              }
            },
            shape: {
              type: "image",
              image: {
                src:
                  "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/blue-tiedyed-cloth-icons-alphanumeric/070052-blue-tiedyed-cloth-icon-alphanumeric-vertical-line.png",
                width: 100,
                height: 100
              }
            },
            opacity: {
              random: true
            },
            size: {
              value: 15,
              random: true,
              anim: {
                enable: true,
                speed: 40
              }
            },
            move: {
              enable: true,
              speed: 30,
              direction: "bottom",
              straight: true,
              out_mode: "out"
            },
            line_linked: {
              enable: false
            }
          },
          interactivity: {
            detect_on: "canvas"
          }
        });
      } //End function
      function Clouds() {
        //$("body").attr("id", "clouds");
        $("body").append("<div id='clouds'></div>");
        $(".wrapper h1").css("color", "#dc35454f");
        $("p").css("color", "hsla(0, 0%, 40%, 0.92)");
        $(".wrapper hr").css(
          "background-image",
          "-webkit-linear-gradient(left, #dc3545, #dc35455c, #dc3545"
        );
      } //End function
      function Drizzle() {
        $("html").append("<div id='drizzle'></div>");
        $("html").attr("id", "drizzle");
        //$("body").attr("id", "drizzle");
        $(".wrapper p").css("color", "#2b294a");
        $(".wrapper h1").css("color", "rgba(0, 0, 0, 0.16862745098039217)");
        particlesJS("drizzle", {
          particles: {
            number: {
              value: 150,
              density: {
                enable: false,
                value_area: 2000
              }
            },
            shape: {
              type: "image",
              image: {
                src: "https://pngimg.com/uploads/cloud/cloud_PNG16.png",
                width: 100,
                height: 100
              }
            },
            opacity: {
              random: true
            },
            size: {
              value: 215,
              random: false
            },
            move: {
              enable: true,
              speed: 0.3,
              direction: "right",
              straight: false,
              out_mode: "out"
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onclick: {
                enable: false,
                mode: "repulse"
              }
            }
          }
        });
      } //End function
      function thunderStorm() {
        $("body").attr("id", "thunderStorm");
        $(".wrapper h1").css("color", "rgba(52, 58, 64, 0.37)");
        $(".wrapper p").css("color", "#343a40");
      } //End function

      function displayBackground() {
        var weather = val.weather[0].main;
        console.log(weather);
        switch (weather) {
          case "Clear":
            clearSky();
            break;
          case "Drizzle":
            Drizzle();
            break;
          case "Clouds":
            Clouds();
            break;
          case "Rain":
            makeItRain();
            break;
          case "Snow":
            makeItSnow();
            break;
          case "Thunderstorm":
            thunderStorm();
            break;
          case "Mist":
            inTheMist();
            break;
          default:
            console.log("This weather is not handled");
        }
      }

      toggleTemperature();
      displayMessage();
      displayBackground();
    }).fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        getError.innerHTML = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        getError.innerHTML = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        getError.innerHTML = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        getError.innerHTML = "An unknown error occured.";
        break;
    }
  }

  var getError = document.getElementById("displayError");
  var apiUrl = "https://fcc-weather-api.glitch.me/api/current?";

  navigator.geolocation.getCurrentPosition(getPosition, showError);
} //End function getWeather()

$(document).ready(function() {
  $("#card")
    .hide()
    .delay(1500)
    .fadeIn(1000);
  //makeItRain();
  //Drizzle();
  /*Clouds();
  clearSky();
  thunderStorm();
  inTheMist();*/
  //makeItSnow();
  getWeather();
});
