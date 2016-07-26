/*global $*/

var streamersList = ["OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "ESL_SC2"];
var streamUrl = "https://api.twitch.tv/kraken/streams/";
var channelUrl = "https://api.twitch.tv/kraken/channels/";

function fillStreamersList(name) {

	$.getJSON(channelUrl + name, function(data) {
		var logoUrl = data.logo;
		var profileUrl = data.url;

		$.getJSON(streamUrl + name, function(data) {
			console.log(logoUrl);
			var htmlElement = "<div class='row channel {status}'>\n \
	<div class='col-sm-1'>\n \
		<img src='" + logoUrl + "' class='logo img-circle'>\n \
	</div>\n \
		<div class='col-sm-3'>\n \
			<a href='" + profileUrl + "'>" + name + "</a> \n \
		</div>\n \
		<div class='col-sm-8'>\n \
			<span>status</span> \n \
		</div>\n \
	</div>\n \
</div>";



			if (data.stream === null) {
				$(".streamers-list-offline").append(htmlElement.replace("{status}", "offline"));
			} else {
				$(".streamers-list-online").append(htmlElement.replace("{status}", "online"));
			}
		});
	});


}

function getStreamersData(arr) {
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