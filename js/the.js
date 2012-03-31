$('.animate').hover(
	function () {
		$('#c1').stop().animate({
			left: "30px"
			},function() {
				$('#aOt').fadeIn();
		});
		$('#c2').stop().animate({
			left: "-30px"
		});
	},
	function () {
		$('#aOt').fadeOut(function() {
			$('#c1').stop().animate({
				left: "-30px"
			});
			$('#c2').stop().animate({
				left: "30px"
			});

		});
	}
);

$('#calculate').click(function(e){
	var r = $('#radius').val();
	calculateAngle(r);
	e.preventDefault();
});


function calculateAngle( radius ) {
	$('#demoOutput').html(''); // clear from last run

	// 1/4 of the area, rounded to 8 decimal places
	var LHS = (Math.PI * Math.pow(radius, 2)) / 4
		LHS = round(LHS, 8);

	var RHS = 0.0;
	var height = 0.0;
	var step = 1.0;
	var previousActionWasAdd = true;
	var iterator = 0;

	$('#demoOutput').append('<h4>Brute forcing the height value</h4>');

	// Brute force to find what value of h makes the LHS == RHS
	while ( RHS != LHS ){

		if (iterator++ > 100) // Shouldn't loop this long
			break;

		// If h is too small
		if (LHS > RHS) {
			// If the last time we added also, keep the incremental step the same
			if (previousActionWasAdd)
				height += step;
			// Otherwise, reduce the step by half and add it to h
			else {
				step /= 2;
				height += step;
				previousActionWasAdd = true;
			}
		// If h is too big
		} else if ( LHS < RHS ) {
			// If we added previous, reduce the step by half and subtract
			if (previousActionWasAdd){
				step /= 2;
				height -= step;
				previousActionWasAdd = false;
			// Otherwise, subtract again
			} else
				height -= step;

		}

		// Calulcate the RHS based on the formula of a circular segment
		RHS = Math.pow(radius,2) * Math.acos( (radius - height) / radius) - ( radius - height) * Math.sqrt(2*radius*height - Math.pow(height, 2));
		// Round it to 8 decimal places
		RHS = round(RHS, 8);

		// Log our work
		$('#demoOutput').append('<strong>Iteration #'+iterator + '</strong> - <span class="h">Height = ' + height + '</span>  <span class="lhs">LHS = ' +LHS+ '</span><span class="rhs">RHS = ' + RHS + '</span><br />');
	}

	// Now that we found the h, let's find the chord
	var halfChord = Math.sqrt( height * (2*radius - height));
	$('#demoOutput').append("<br />Half the Cord is: " + halfChord + '<br />');

	// Find r-h
	var distanceToCenter = radius - height;
	$('#demoOutput').append('radius - segmentHeight is: ' + distanceToCenter + '<br />');

	// Find the angle times two
	var angle = 2 * Math.atan(halfChord / distanceToCenter);

	$('#demoOutput').append("<br /><strong>Answer is: " + angle*(180/Math.PI) + " &deg;, or " + angle + " radians.</strong>");
}

// This functions rounds a num to any given dec places
function round(num, dec) {
	return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
}
