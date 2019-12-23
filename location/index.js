$(document).ready(function() {

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function() {


			});
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}

	let layer = new ol.layer.Tile({
				source: new ol.source.OSM()
	});

	let view = new ol.View({
		center: ol.proj.fromLonLat([-71.8186, 43.1784]),
		zoom: 8
	});

	var map = new ol.Map({
		target: 'map',
		layers: [ layer ],
		view: view
	});

	// Fix for 100% window map bug.
	$("#map").css("height", $(window).height()); map.updateSize();
	$(window).resize(function() {
		$("#map").css("height", $(window).height()); map.updateSize();
	});
	
});