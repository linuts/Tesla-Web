class Climate {
  constructor() {
			
	}

	static get SEAT_HEATERS() {
		return {
			frontLeft: $(".seat.front.left"),
			frontRight: $(".seat.front.right"),
			backLeft: $(".seat.back.left"),
			backCenter: $(".seat.back.center"),
			backRight: $(".seat.back.right")
		}
	}

	// Change heater icon for seat on click
	seat_heater_next(SEAT_HEATER) {
		let imgUrl = SEAT_HEATER.attr("src");
		let imgPath = "images/";
		let mode = Number(imgUrl.substring(imgUrl.length-5, imgUrl.length-4))+1;
		switch(mode) {
			case 0:
				SEAT_HEATER.attr("src", imgPath + "seatheater0.png");
				break;
			case 1:
				SEAT_HEATER.attr("src", imgPath + "seatheater1.png");
				break;
			case 2:
				SEAT_HEATER.attr("src", imgPath + "seatheater2.png");
				break;
			case 3:
				SEAT_HEATER.attr("src", imgPath + "seatheater3.png");
				break;
			default:
				SEAT_HEATER.attr("src", imgPath + "seatheater0.png");
				break;
		}
	}

	// [CALL] Tesla API
	current_temperature() {
		let temperature = Number($(".climate.current").text().split(" ")[2]);
		if(this.target_temperature > temperature) {
			//colder
			$(".climate.status").attr("src", "images/arrows-cold.png");
		} else if(this.target_temperature < temperature) {
			//hotter
			$(".climate.status").attr("src", "images/arrows-hot.png");
		} else {
			//same
			$(".climate.status").attr("src", "images/arrows-null.png");
		}
		return temperature;
	}

	// Get current targeted temperature
	get target_temperature() {
		let target =  $(".climate.target").text();
		if(target == "LO") {
			target = "59°";
		} else if(target == "HI") {
			target = "81°";
		}
		let number = Number(target.substring(0, target.length-1));
		if(number <= 59) {
			return 59;
		} else if(number >= 82) {
			return 82;
		} else {
			return number;
		}
	}
	// Set current targeted temperature
	set target_temperature(number) {
		if(number == "LO" || number <= 59) {
			$(".climate.target").text("LO")
		} else if(number == "HI" || number >= 82) {
			$(".climate.target").text("HI")
		} else {
			$(".climate.target").text(number+"°")
		}
		// Update UI
		this.current_temperature();
	}

}

$( document ).ready(function() {
	let climate = new Climate();

	// Setup click events for seat heaters
	for(index in Climate.SEAT_HEATERS) {
		let seat = Climate.SEAT_HEATERS[index];
		seat.click(function() {
			climate.seat_heater_next(seat);
		});
	}

	// Set the target temperature in UI
	$(".climate.colder").click(function() {
		climate.target_temperature -= 1;
	});
	$(".climate.hotter").click(function() {
		climate.target_temperature += 1;
	});
	
});


