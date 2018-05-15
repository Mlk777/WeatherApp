$(document).ready(function() {
  var channelList = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
  ];

  channelList.forEach(channel => {
    var url = `https://wind-bow.gomix.me/twitch-api/streams/${channel}?callback=?`;
    //console.log(url);
    $.getJSON(url, state => {
      //console.log(state);
      var streamUrl = `https://www.twitch.tv/${channel}`;
      if (state.stream === null) {
        //console.log("hors ligne");
        var channelLink = state._links.channel; //Channel link

        var offline = `<a href=${streamUrl} target='_blank'><div id='arrowOffline' class='text-center'>
                        <div id='channel'>${channel.toUpperCase()}</div></div></a>`;

        $(".trunk").append(offline);
      } else {
        var game = state.stream.game.toUpperCase(); //What is currently streamed
        var status = state.stream.channel.status; //Details on what is currently streamed
        var viewers = state.stream.viewers; //Number of viewers
        var language = state.stream.channel.language.toUpperCase(); //Stream language
        var time = state.stream.created_at; //Online since TZ format

        var online = `<a href=${streamUrl} target='_blank'><div id='arrowOnline' class='text-center' data-toggle='tooltip' data-placement='right' data-original-title='Currently streaming : ${game} \r\n  Viewers : ${viewers} \r\n Language : ${language} \r\n Details : ${status} \r\n Online since : ${new Date(
          time
        )}'><div id='channel'>${channel.toUpperCase()}</div></div></a>`;

        $(".trunk").append(online);
      }
    });
  });
  $("body").tooltip({
    selector: "[data-toggle='tooltip']",
    container: "body"
  });
});
