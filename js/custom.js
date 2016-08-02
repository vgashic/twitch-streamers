/*global $*/

var streamersList = ["OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "ESL_SC2"];
var streamUrl = "https://api.twitch.tv/kraken/streams/";
var channelUrl = "https://api.twitch.tv/kraken/channels/";

function fillStreamersList(name) {

	$.getJSON(channelUrl + name, function(channelData) {
		var logoUrl = channelData.logo;
		var profileUrl = channelData.url;


		$.getJSON(streamUrl + name, function(streamData) {
			console.log(streamData);

			var game = streamData.stream === null ? "Offline" : channelData.game;
			var status = streamData.stream === null ? "" : channelData.status;

			var htmlElement = "<div class='row channel {status}'>\n \
	<div class='col-xs-2 channel-logo'>\n \
		<img src='" + logoUrl + "' class='logo img-circle'>\n \
	</div>\n \
	<div class='col-xs-10 col-sm-3 channel-name'>\n \
		<a href='" + profileUrl + "'>" + name + "</a> \n \
	</div>\n \
	<div class='col-xs-10 col-sm-7 channel-data'>\n \
		<span>" + game + "</span> \n \
		<span class='hidden-xs-down'>" + status + "</span> \n \
	</div>\n \
	</div>\n \
</div>";



			if (streamData.stream === null) {
				$(".streamers-list-offline").append(htmlElement.replace("{status}", "offline"));
			} else {
				$(".streamers-list-online").append(htmlElement.replace("{status}", "online"));
			}
		});
	});


}

function getStreamersData(arr) {
	"use strict";
	console.log(arr);
	for (var i = 0; i < arr.length; i++) {
		fillStreamersList(arr[i]);
	}
}

$(document).ready(function() {
	getStreamersData(streamersList);

	$(".filter-cbox").on("click", function() {
		var id = this.id;

		if (id == "cbox-online") {
			if (this.checked) {
				$(".online").removeClass("hidden");
			} else {
				$(".online").addClass("hidden");
			}
		} else {
			if (this.checked) {
				$(".offline").removeClass("hidden");
			} else {
				$(".offline").addClass("hidden");
			}
		}
	});
});