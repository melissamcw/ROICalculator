// This is an ROI calculator written for CRSTL Solutions
// All of the calculations can be found at the bottom of the document.
// The variables are collected at the top for easy editing and changing.
// The naming system used is quite straight forward, and is meant to 
// give consistency between the slider IDs, the labels that correspond to them
// and the variables that represent them in code. This was written in jQuery as
// of March 5th, 2012, and takes advantage of the jQueryUI for the sliders.
// The dropdowns are just regular dropdowns, but are bound to jQuery events
// so that they can update the totals live.

// A namespace for storing all the variables used in the calculations
$.roi = {
	// iExample : [ item ID, item label ID, value ]
	// These variables are in the same order as they are on the website to make it easier to read them
	arrLawStaff : ["#lawstaff", "lblLawStaff", 2],
	arrLawCost: ["#lawcost", "lblLawCost", 150000],
	arrSuppStaff: ["#suppstaff", "lblSuppStaff", 2],
	arrSuppCost: ["#suppcost", "lblSuppCost", 60000],
	arrMonitoring : ["#monitoring", "#lblMonitoring", 0],
	arrUpdating : ["#updating", "#lblUpdating", 0],
	arrCounselAdvice : ["#counseladvice", "#lblCounselAdvice", 0],
	arrFlagGaps : ["#flaggaps", "#lblFlagGaps", 0],
	arrReviewing : ["#reviewing", "#lblReviewing", 0],
	arrPreparing : ["#preparing", "#lblPreparing", 0],
	arrCollecting : ["#collecting", "#lblCollecting", 0],
	arrFlagGapsCO : ["#flaggapsCO", "#lblFlagGapsCO", 0],
	arrDocumenting : ["#documenting", "#lblDocumenting", 0],
	arrFollowup : ["#followup", "#lblFollowUp", 0],
	arrTotalHours : ["#totalhours", "#lblTotalHours", 0],
	arrTotalCost: ["#totalcost", "#lblTotalCost", 0],
	arrTimeSaved: ["#timesaved", "#lblTimeSaved", 0],
	arrCostSaved: ["#costsaved", "#lblCostSaved", 0]
};
			
$(function(){

	// Sets the initial value, minimum, maximum and step increment for all the sliders
	$('.initialize').slider ({
		value: 0,
		min: 0,
		max: 10,
		step: 1
	});

	// Dropdown menus
	
	// The first line ensures that the code executes when their value is changed.
	$("#lawstaff").change(function () {
	$.roi.arrLawStaff[2] = $(this).val(); //Updates the value element of the appropriate array above.
		calcOutput(); //Calls the function to update the totals
	});
	
	$("#lawcost").change(function () {
	$.roi.arrLawCost[2] = $(this).val();
		calcOutput();
	});
	
	$("#suppstaff").change(function () {
	$.roi.arrSuppStaff[2] = $(this).val();
		calcOutput();
	});
	
	$("#suppcost").change(function () {
	$.roi.arrSuppCost[2] = $(this).val();
		calcOutput();
	});
				
	// Sliders
$('#monitoring').slider({
		// Occurs when the user begins to move the slider
		slide: function( event, ui ) {
			SlideFunction($.roi.arrMonitoring, ui);
		},
		// Occurs when the slider stops moving
		change: function( event, ui) {
			SlideChange($.roi.arrMonitoring, ui);
		}
	});

$('#updating').slider({
		slide: function( event, ui ) {
			SlideFunction($.roi.arrUpdating, ui);
		},
		change: function( event, ui) {
			SlideChange($.roi.arrUpdating, ui);
		}
	});
	
$('#counseladvice').slider({
		slide: function( event, ui ) {
			SlideFunction($.roi.arrCounselAdvice, ui);
		},
		change: function( event, ui) {
			SlideChange($.roi.arrCounselAdvice, ui);
		}
	});
	
$('#flaggaps').slider({
		slide: function( event, ui ) {
			SlideFunction($.roi.arrFlagGaps, ui);
		},
		change: function( event, ui) {
			SlideChange($.roi.arrFlagGaps, ui);
		}
	});
	
$('#reviewing').slider({
		slide: function( event, ui ) {
			SlideFunction($.roi.arrReviewing, ui);
		},
		change: function( event, ui) {
			SlideChange($.roi.arrReviewing, ui);
		}
	});
	
$('#preparing').slider({
		slide: function( event, ui ) {
			SlideFunction($.roi.arrPreparing, ui);
		},
		change: function( event, ui) {
			SlideChange($.roi.arrPreparing, ui);
		}
	});
	
$('#collecting').slider({
		slide: function( event, ui ) {
			SlideFunction($.roi.arrCollecting, ui);
		},
		change: function( event, ui) {
			SlideChange($.roi.arrCollecting, ui);
		}
	});
	
$('#flaggapsCO').slider({
		slide: function( event, ui ) {
			SlideFunction($.roi.arrFlagGapsCO, ui);
		},
		change: function( event, ui) {
			SlideChange($.roi.arrFlagGapsCO, ui);
		}
	});
	
$('#documenting').slider({
		slide: function( event, ui ) {
			SlideFunction($.roi.arrDocumenting, ui);
		},
		change: function( event, ui) {
			SlideChange($.roi.arrDocumenting, ui);
		}
	});
	
$('#followup').slider({
		slide: function( event, ui ) {
			SlideFunction($.roi.arrFollowup, ui);
		},
		change: function( event, ui) {
			SlideChange($.roi.arrFollowup, ui);
		}
	});

// Activated when the slider moves. Updates the label for the slider.
function SlideFunction(arrSlider, ui) {
	// There is a bug in jQuery UI 1.8.18 that allow the slider to go negative sometimes. This is a quick patch.
	if (ui.value == -1) {
		ui.value = 0;
		};
	$(arrSlider[1]).val(ui.value + " Hours" );
};

// Activated when the slider stops. Updates the value of the slider, and calls the function that calculates the output.
// Do not combine this with the SlideFunction function, or else the values will always be one step behind.
function SlideChange(arrSlider, ui) {
	arrSlider[2] = $(arrSlider[0]).slider("option", "value");
	calcOutput();
};

// The formula used to calculate the output value when the slider is moved or a dropdown in changed.
	function calcOutput() {
	// Local variables to make it easier to break up the calculations. 
		var iTotalLawyerHours, iTotalSuppHours, iTotalLawyerCost, iTotalSuppCost;
				
		// Lawyer Calculations
		// The [2] refers to the value for a certain item, so naturally it is found in each of the variables that are in an array.
		// Go to the top of this file to see the various arrays and elements. 2000 is the approximate number of working hours
		// in a year. 50 is approximately 52, the number of weeks in a year, and gives round numbers.
		iTotalLawyerHours = $.roi.arrLawStaff[2] * ( $.roi.arrMonitoring[2] + $.roi.arrUpdating[2] + $.roi.arrCounselAdvice[2] + $.roi.arrFlagGaps[2] + $.roi.arrReviewing[2] ) * 50;
		iTotalLawyerCost = iTotalLawyerHours * $.roi.arrLawCost[2] / 2000;
		
		// Support Calculations
		iTotalSuppHours = $.roi.arrSuppStaff[2] * ( $.roi.arrPreparing[2] + $.roi.arrCollecting[2] + $.roi.arrFlagGapsCO[2] + $.roi.arrDocumenting[2] + $.roi.arrFollowup[2] ) * 50;
		iTotalSuppCost = iTotalSuppHours * $.roi.arrSuppCost[2] / 2000;
		
		// End totals
		$.roi.arrTotalHours[2] = iTotalLawyerHours + iTotalSuppHours;
		$.roi.arrTotalCost[2] = iTotalLawyerCost + iTotalSuppCost;
		$.roi.arrTimeSaved[2] = Math.ceil(0.4*(iTotalLawyerHours + iTotalSuppHours));
		$.roi.arrCostSaved[2] = 0.4*(iTotalLawyerCost + iTotalSuppCost);
		
		// Used to display the totals
		$($.roi.arrTotalHours[0]).val($.roi.arrTotalHours[2] + " Hours" );
		$($.roi.arrTotalCost[0]).val("$" + $.roi.arrTotalCost[2]);
		$($.roi.arrTimeSaved[0]).val($.roi.arrTimeSaved[2] + " Hours" );
		$($.roi.arrCostSaved[0]).val("$" + $.roi.arrCostSaved[2]);
	};
	
	
});