const getWeather = () => {
  const getPosition = position => {
    //Getting longitude and latitude
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    //Building date and Adding 0 to the date if minutes < 10
    // const d = new Date();
    const date = new Date();

    //Month goes from 0 to 11 so if month is January add 0 in front
    const month = date.getMonth();
    if (month == 0) month = '01';

    const today = `${date.getFullYear()}-${month}-${date.getUTCDate()}`;
    // console.log(`Today's date ${today}`);
    const hours = date.getHours();
    const time = new moment().format('HH:mm:ss');
    // console.log(time);

    let minutes = date.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;

    //Building api full url depending on latitude and longitude
    const url = `${apiUrl}lat=${latitude}&lon=${longitude}`;
    //For testing : const url = "https://fcc-weather-api.glitch.me/api/current?lat=69.142596&lon=26.977247";

    $.getJSON(url, data => {
      //Toggling temperature
      const toggleTemperature = () => {
        //init const

        const tempMinCelsius = Math.round(data.main.temp_min);
        const tempMaxCelsius = Math.round(data.main.temp_max);
        const temperatureCelsius = Math.round(data.main.temp);
        const tempMinFarenheit = Math.round(data.main.temp_min * 1.8 + 32);
        const tempMaxFarenheit = Math.round(data.main.temp_max * 1.8 + 32);
        const temperatureFarenheit = Math.round(data.main.temp * 1.8 + 32);
        let isCelsiusMinMax = true;
        let isCelsius = true;

        //Display basic temperature before toggling it
        $('#temperature').html(
          `The current temperature is ${temperatureCelsius}°C`
        );
        $('#temperatureMinMax').html(
          `Temperature beetween ${tempMinCelsius}°C and ${tempMaxCelsius}°C today`
        );

        //click function current temperature
        $('#temperature').click(() => {
          if (isCelsius) {
            $('#temperature').html(
              `The current temperature is ${temperatureFarenheit}°F`
            );
            isCelsius = !isCelsius;
          } else {
            $('#temperature').html(
              `The current temperature is ${temperatureCelsius}°C`
            );
            isCelsius = !isCelsius;
          }
        });
        //click function range temperature
        $('#temperatureMinMax').click(() => {
          if (isCelsiusMinMax) {
            $('#temperatureMinMax').html(
              `Temperature beetween ${tempMinFarenheit}°F and ${tempMaxFarenheit}°F today`
            );
            isCelsiusMinMax = !isCelsiusMinMax;
          } else {
            $('#temperatureMinMax').html(
              `Temperature beetween ${tempMinCelsius}°C and ${tempMaxCelsius}°C today`
            );
            isCelsiusMinMax = !isCelsiusMinMax;
          }
        });
      };

      const cityName = data.name;
      const wind = Math.round(data.wind.speed * 3.6);
      const sunsetTime = moment
        .unix(data.sys.sunset)
        .format('DD/MM/YYYY HH:mm:ss');
      const currentTime = moment().format('DD/MM/YYYY HH:mm:ss');
      const beforeSunset = Math.abs(
        moment(sunsetTime).diff(currentTime, 'minutes')
      );
      // console.log(delta);

      if (beforeSunset <= 30) {
        $('#sunset').html(`The sun will set in ${beforeSunset} minutes`);
      }

      $('#wind').html(`The wind blows at ${wind}km/h`);

      const displayMessage = () => {
        const hoursArray = [
          ['05', '06', '07', '08', '09', '10', '11'],
          ['12', '13', '14', '15', '16', '17', '18'],
          ['19', '20', '21', '22', '23', '00', '01', '02', '03', '04']
        ];
        for (let i = 0; i < hoursArray.length; i++) {
          const tabElement = hoursArray[i];
          for (let j = 0; j < tabElement.length; j++) {
            if (date.getHours() == hoursArray[0][j]) {
              $('#cityName').html(
                `Good Morning ${cityName} ! It's ${hours}h${minutes}`
              );
              //console.log("good morning");
              return;
            } else if (date.getHours() == hoursArray[1][j]) {
              $('#cityName').html(
                `Good Afternoon ${data.name} ! It's ${hours}h${minutes}`
              );
              //console.log("good afternoon");
              return;
            } else if (date.getHours() == hoursArray[2][j]) {
              $('#cityName').html(
                `Good Evening ${cityName} ! It's ${hours}h${minutes}`
              );
              //console.log("good evening");
              return;
            }
          }
        }
      };

      const clearSky = () => {
        const imageURL =
          'http://www.solarnews.es/wp-content/uploads/2015/10/back10.jpg';
        $('.wrapper p').css('color', '#555555e6');
        $('.wrapper h1').css('color', '#333333b5');
        $('body').attr('id', 'clearSky');
      }; //End function
      const inTheMist = () => {
        $('body').attr('id', 'inTheMist');
        $('.wrapper h1').css('color', '#343a404f');
        $('.wrapper p').css('color', '#3333339c');
      }; //End function
      const makeItSnow = () => {
        $('html').append("<div id='snowfall'></div>");
        $('html').attr('id', 'snowfall');
        //$("body").attr("id", "snowfall");
        $('body').css('background-color', 'lavender');
        $('.wrapper h1').css('color', '#222');
        $('.wrapper p').css('color', '#7995b1');
        particlesJS('snowfall', {
          particles: {
            number: {
              value: 200
            },
            shape: {
              type: 'circle'
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
              direction: 'bottom',
              straight: false
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: false,
                mode: 'bubble'
              },
              onclick: {
                enable: false,
                mode: 'repulse'
              }
            },
            modes: {
              bubble: {
                particles_nb: 12
              }
            }
          }
        });
      }; //End function
      const makeItRain = () => {
        $('html').append("<div id='rainfall'></div>");
        $('html').attr('id', 'rainfall');
        //$("body").attr("id", "rainfall");
        $('body').css('background-color', 'lavender');
        $('.wrapper p').css('color', '#7995b1');
        $('.wrapper h1').css('color', '#222');
        particlesJS('rainfall', {
          particles: {
            number: {
              value: 600,
              density: {
                enable: false,
                value_area: 200
              }
            },
            shape: {
              type: 'image',
              image: {
                src:
                  'https://calisthenics-parks.com/attachments/1A5biYyV335nkUZFLeGGHOtOmrzNxH7zZeZCM3Kd_500.png',
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
              direction: 'bottom',
              straight: true,
              out_mode: 'out'
            },
            line_linked: {
              enable: false
            }
          },
          interactivity: {
            detect_on: 'canvas'
          }
        });
      }; //End function
      const Clouds = () => {
        //$("body").attr("id", "clouds");
        $('body').append("<div id='clouds'></div>");
        $('.wrapper h1').css('color', '#dc35454f');
        $('p').css('color', 'hsla(0, 0%, 40%, 0.92)');
        $('.wrapper hr').css(
          'background-image',
          '-webkit-linear-gradient(left, #dc3545, #dc35455c, #dc3545'
        );
      }; //End function
      const Drizzle = () => {
        $('html').append("<div id='drizzle'></div>");
        $('html').attr('id', 'drizzle');
        //$("body").attr("id", "drizzle");
        $('.wrapper p').css('color', '#2b294a');
        $('.wrapper h1').css('color', 'rgba(0, 0, 0, 0.16862745098039217)');
        particlesJS('drizzle', {
          particles: {
            number: {
              value: 150,
              density: {
                enable: false,
                value_area: 2000
              }
            },
            shape: {
              type: 'image',
              image: {
                src: 'https://pngimg.com/uploads/cloud/cloud_PNG16.png',
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
              direction: 'right',
              straight: false,
              out_mode: 'out'
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onclick: {
                enable: false,
                mode: 'repulse'
              }
            }
          }
        });
      }; //End function
      const thunderStorm = () => {
        $('body').attr('id', 'thunderStorm');
        $('.wrapper h1').css('color', 'rgba(52, 58, 64, 0.37)');
        $('.wrapper p').css('color', '#343a40');
      }; //End function

      const displayBackground = () => {
        const weather = data.weather[0].main;
        // console.log(weather);
        switch (weather) {
          case 'Clear':
            clearSky();
            break;
          case 'Drizzle':
            Drizzle();
            break;
          case 'Clouds':
            Clouds();
            break;
          case 'Rain':
            makeItRain();
            break;
          case 'Snow':
            makeItSnow();
            break;
          case 'Thunderstorm':
            thunderStorm();
            break;
          case 'Mist':
            inTheMist();
            break;
          default:
            console.log('This weather is not handled');
        }
      };

      toggleTemperature();
      displayMessage();
      displayBackground();
    }).fail((jqxhr, textStatus, error) => {
      const err = `${textStatus}, ${error}`;
      console.log(`Request Failed: ${err}`);
    });
  };

  const showError = error => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        getError.innerHTML = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        getError.innerHTML = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        getError.innerHTML = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        getError.innerHTML = 'An unknown error occured.';
        break;
    }
  };

  const getError = document.getElementById('displayError');
  const apiUrl = 'https://fcc-weather-api.glitch.me/api/current?';

  navigator.geolocation.getCurrentPosition(getPosition, showError);
}; //End function getWeather()

$(document).ready(() => {
  $('#card')
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
