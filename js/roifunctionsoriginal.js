// All of the calculations can be found at the bottom of the document.
// The variables are collected at the top for easy editing and changing.
// The naming system used is quite straight forward, and is meant to 
// give consistency between the slider IDs, the labels that correspond to them
// and the variables that represent them in code.

// A namespace for storing all the variables used in the calculations
$.roi = {
	// arrExample : [ item ID, item label ID, value ]
	// These variables are in the same order as they are on the website to make it easier to read them
	arrLawStaff : {
		slider: "#lawstaff",
		label: "#lblLawStaff",
		value: 2
	},
	arrLawCost: {
		slider: "#lawcost", 
		label: "#lblLawCost", 
		value: 150000
	},
	arrSuppStaff: {
		slider: "#suppstaff", 
		label: "#lblSuppStaff", 
		value: 2
	},
	arrSuppCost: {
		slider: "#suppcost", 
		label: "#lblSuppCost", 
		value: 60000
	},
	arrMonitoring : {
		slider: "#monitoring", 
		label: "#lblMonitoring", 
		value: 0
	},
	arrUpdating : {
		slider: "#updating", 
		label: "#lblUpdating", 
		value: 0
	},
	arrCounselAdvice : {
		slider: "#counseladvice", 
		label: "#lblCounselAdvice", 
		value: 0
	},
	arrFlagGaps : {
		slider: "#flaggaps", 
		label: "#lblFlagGaps", 
		value: 0
	},
	arrReviewing : {
		slider: "#reviewing", 
		label: "#lblReviewing", 
		value: 0
	},
	arrPreparing : {
		slider: "#preparing", 
		label: "#lblPreparing", 
		value: 0
	},
	arrCollecting : {
		slider: "#collecting", 
		label: "#lblCollecting", 
		value: 0
	},
	arrFlagGapsCO : {
		slider: "#flaggapsCO", 
		label: "#lblFlagGapsCO", 
		value: 0
	},
	arrDocumenting : {
		slider: "#documenting", 
		label: "#lblDocumenting", 
		value: 0
	},
	arrFollowup : {
		slider: "#followup", 
		label: "#lblFollowUp", 
		value: 0
	},
	arrTotalHours : {
		slider: "#totalhours", 
		label: "#lblTotalHours", 
		value: 0
	},
	arrTotalCost: {
		slider: "#totalcost", 
		label: "#lblTotalCost", 
		value: 0
	},
	arrTimeSaved: {
		slider: "#timesaved", 
		label: "#lblTimeSaved", 
		value: 0
	},
	arrCostSaved: {
		slider: "#costsaved", 
		label: "#lblCostSaved", 
		value: 0
	}
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
	$.roi.arrLawStaff.value = $(this).val(); //Updates the value element of the appropriate array above.
		calcOutput(); //Calls the function to update the totals
	});
	
	$("#lawcost").change(function () {
	$.roi.arrLawCost.value = $(this).val();
		calcOutput();
	});
	
	$("#suppstaff").change(function () {
	$.roi.arrSuppStaff.value = $(this).val();
		calcOutput();
	});
	
	$("#suppcost").change(function () {
	$.roi.arrSuppCost.value = $(this).val();
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
	// There is a bug in some old browers that make this go negative. This fixes that.
	if (ui.value == -1) {
		ui.value = 0;
		};
	$(arrSlider.label).val(ui.value + " Hours" );
};

// Activated when the slider stops. Updates the value of the slider, and calls the function that calculates the output.
// Do not combine this with the SlideFunction function, or else the values will always be one step behind.
function SlideChange(arrSlider, ui) {
	arrSlider.value = $(arrSlider.slider).slider("option", "value");
	calcOutput();
};

// The formula used to calculate the output value when the slider is moved or a dropdown in changed.
	function calcOutput() {
	// Local variables to make it easier to break up the calculations. 
		var iTotalLawyerHours, iTotalSuppHours, iTotalLawyerCost, iTotalSuppCost;
				
		// Lawyer Calculations
		// The .value refers to the value for a certain item, so naturally it is found in each of the variables that are in an array.
		// Go to the top of this file to see the various arrays and elements. 2000 is the approximate number of working hours
		// in a year. 50 is approximately 52, the number of weeks in a year, and gives round numbers.
		iTotalLawyerHours = $.roi.arrLawStaff.value * ( $.roi.arrMonitoring.value + $.roi.arrUpdating.value + $.roi.arrCounselAdvice.value + $.roi.arrFlagGaps.value + $.roi.arrReviewing.value ) * 50;
		iTotalLawyerCost = iTotalLawyerHours * $.roi.arrLawCost.value / 2000;
		
		// Support Calculations
		iTotalSuppHours = $.roi.arrSuppStaff.value * ( $.roi.arrPreparing.value + $.roi.arrCollecting.value + $.roi.arrFlagGapsCO.value + $.roi.arrDocumenting.value + $.roi.arrFollowup.value ) * 50;
		iTotalSuppCost = iTotalSuppHours * $.roi.arrSuppCost.value / 2000;
		
		// End totals
		$.roi.arrTotalHours.value = iTotalLawyerHours + iTotalSuppHours;
		$.roi.arrTotalCost.value = iTotalLawyerCost + iTotalSuppCost;
		$.roi.arrTimeSaved.value = Math.ceil(0.4*(iTotalLawyerHours + iTotalSuppHours));
		$.roi.arrCostSaved.value = 0.4*(iTotalLawyerCost + iTotalSuppCost);
		
		// Used to display the totals
		$($.roi.arrTotalHours.slider).val($.roi.arrTotalHours.value + " Hours" );
		$($.roi.arrTotalCost.slider).val("$" + $.roi.arrTotalCost.value);
		$($.roi.arrTimeSaved.slider).val($.roi.arrTimeSaved.value + " Hours" );
		$($.roi.arrCostSaved.slider).val("$" + $.roi.arrCostSaved.value);
	};
	
	
});