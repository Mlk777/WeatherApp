function getWeather() {
  function getPosition(position) {
    //Getting longitude and latitude
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);

    //Building date and Adding 0 to the date if minutes < 10
    var d = new Date();
    var month = d.getMonth();
    if (month == 0) {
      month = "01";
    }
    var today = `${d.getFullYear()}-${month}-${d.getUTCDate()}`;
    console.log(today);
    var hours = d.getHours();
    var time = new moment().format("HH:mm:ss");
    console.log(time);
    var minutes = d.getMinutes();
    if (minutes < 10) minutes += "0";
    console.log(minutes);

    //Building api full url depending on latitude and longitude
    var url = apiUrl + "lat=" + latitude + "&lon=" + longitude;
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
        //Sooooo baad
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
                `Good Morning from ${cityName} ! It's ${hours}h${minutes}`
              );
              //console.log("good morning");
              return;
            } else if (d.getHours() == hoursArray[1][j]) {
              $("#cityName").html(
                `Good Afternoon from ${val.name} ! It's ${hours}h${minutes}`
              );
              //console.log("good afternoon");
              return;
            } else if (d.getHours() == hoursArray[2][j]) {
              $("#cityName").html(
                `Good Evening from ${cityName} ! It's ${hours}h${minutes}`
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
          "http://www.solarnews.es/wp-content/uploads/2015/10/back10.jpg"; // or http://res.cloudinary.com/detqxj5bf/image/upload/v1504020580/WWWeather/clearsky.png
        $(".weatherInfo").css("color", "black");
        $("p").css("color", "#343a40");
        $("body").attr("id", "clearSky");
      } //End function
      function inTheMist() {
        $("body").attr("id", "inTheMist");
        $("h1").css("color", "#3c4e47");
        $("p").css("color", "#343a40");
      } //End function
      function makeItSnow() {
        $("body").attr("id", "snowfall");
        $("body").css("background-color", "lavender");
        $("h1").css("color", "#607D8B");
        $("p").css("color", "#03A9F4");
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
        $("body").attr("id", "rainfall");
        $("body").css("background-color", "#f8f9fa");
        $("p").css("color", "#17a2b8");
        $("h1").css("color", "#6b93bb");
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
            }
          },
          interactivity: {
            detect_on: "canvas"
          }
        });
      } //End function
      function Clouds() {
        $("body").append("<div id='clouds'></div>");
        $("p").css("color", "#0e0e0e");
        $("h1").css("color", "#17a2b8");
      } //End function
      function Drizzle() {
        $("body").attr("id", "drizzle");
        $("p").css("color", "#343a40");
        $("h1").css("color", "#495057");
        particlesJS("drizzle", {
          particles: {
            number: {
              value: 90,
              density: {
                enable: false,
                value_area: 200
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
              random: true
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "right",
              straight: true,
              out_mode: "out"
            }
          },
          interactivity: {
            detect_on: "canvas"
          }
        });
      } //End function
      function thunderStorm() {
        $("body").attr("id", "thunderStorm");
        $("p").css("color", "#333");
      } //End function

      function displayBackground() {
        var weather = val.weather[0].main;
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

function curtainCall() {
  $(window).on("scroll", function() {
    if ($(this).scrollTop() <= 0) {
      $("html").addClass("curtain-on");
    } else {
      $("html").removeClass("curtain-on");
    }
  });
}

function curtainButton() {
  $(".curtainButton").click(function(event) {
    $("#card")
      .hide()
      .delay(1500)
      .fadeIn(1000);
    $("html").removeClass("curtain-on");
  });
}

function returnToBed() {
  $("#returnToBed").click(function() {
    $("html").addClass("curtain-on");
  });
}

$(document).ready(function() {
  curtainButton();
  returnToBed();
  curtainCall();
  /*makeItRain();
  Drizzle();
  Clouds();
  clearSky();
  thunderStorm();
  inTheMist();
  makeItSnow();*/
  getWeather();
});
