// All of the calculations can be found at the bottom of the document.
// The variables are collected at the top for easy editing and changing.
// The naming system used is quite straight forward, and is meant to 
// give consistency between the slider IDs, the labels that correspond to them
// and the variables that represent them in code.

// A namespace for storing all the variables used in the calculations
$.industVar = {
	// arrExample : [ item ID, item label ID, value ]
	// These variables are in the same order as they are on the website to make it easier to read them
	wallet : {
		low: {
			airlines: 56,
			banks: 70,
			csp: 68,
			conelect: 61,
			ccp: 63,
			hp: 60,
			hotels: 60,
			inpro: 64,
			invfirm: 60,
			isps: 69,
			retailers: 60,
			wcs: 66
		},
		high: {
			airlines: 70,
			banks: 82,
			csp: 77,
			conelect: 69,
			ccp: 77,
			hp: 73,
			hotels: 70,
			inpro: 71,
			invfirm: 71,
			isps: 77,
			retailers: 69,
			wcs: 73
		},
	}
};

$.guiVars = {
	customers  : {
		slider: "#CustomersSlider",
		label: "#lblCustomers",
		value: 22
	},
	revbasic  : {
		slider: "#RevBasicSlider",
		label: "#lblRevBasic",
		value: 500
	},
	revenhan  : {
		slider: "#RevEnhanSlider",
		label: "#lblRevEnhan",
		value: 1000
	},
	costpercall  : {
		slider: "#CostPerCallSlider",
		label: "#lblCostPerCall",
		value: 5.85
	},
	callvolume  : {
		slider: "#CallVolumeSlider",
		label: "#lblCallVolume",
		value: 22
	},
	callduration  : {
		slider: "#CallDurationSlider",
		label: "#lblCallDuration",
		value: 300
	}
};
			
$(function(){

	// Initialize the sliders
	$('#CustomersSlider').slider ({
		value: 22,
		min: 1,
		max: 100,
		step: 1
	});

	$('#RevBasicSlider').slider ({
		value: 500,
		min: 10,
		max: 5000,
		step: 10
	});

	$('#RevEnhanSlider').slider ({
		value: 1000,
		min: 10,
		max: 5000,
		step: 10
	});

	$('#CostPerCallSlider').slider ({
		value: 5.85,
		min: 0.1,
		max: 20.0,
		step: 0.1
	});

	$('#CallVolumeSlider').slider ({
		value: 22,
		min: 1,
		max: 300,
		step: 1
	});

	$('#CallDurationSlider').slider ({
		value: 300,
		min: 10,
		max: 1000,
		step: 10
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
	$('#CustomersSlider').slider({
		// Occurs when the user begins to move the slider
		slide: function( event, ui ) {
			SlideFunction($.guiVars.customers, ui);
		},
		// Occurs when the slider stops moving
		change: function( event, ui) {
			SlideChange($.guiVars.customers, ui);
		}
	});

	$('#RevBasicSlider').slider({
		// Occurs when the user begins to move the slider
		slide: function( event, ui ) {
			SlideFunction($.guiVars.revbasic, ui);
		},
		// Occurs when the slider stops moving
		change: function( event, ui) {
			SlideChange($.guiVars.revbasic, ui);
		}
	});

	$('#RevEnhanSlider').slider({
		// Occurs when the user begins to move the slider
		slide: function( event, ui ) {
			SlideFunction($.guiVars.revenhan, ui);
		},
		// Occurs when the slider stops moving
		change: function( event, ui) {
			SlideChange($.guiVars.revenhan, ui);
		}
	});

	$('#CostPerCallSlider').slider({
		// Occurs when the user begins to move the slider
		slide: function( event, ui ) {
			SlideFunction($.guiVars.costpercall, ui);
		},
		// Occurs when the slider stops moving
		change: function( event, ui) {
			SlideChange($.guiVars.costpercall, ui);
		}
	});

	$('#CallVolumeSlider').slider({
		// Occurs when the user begins to move the slider
		slide: function( event, ui ) {
			SlideFunction($.guiVars.callvolume, ui);
		},
		// Occurs when the slider stops moving
		change: function( event, ui) {
			SlideChange($.guiVars.callvolume, ui);
		}
	});

	$('#CallDurationSlider').slider({
		// Occurs when the user begins to move the slider
		slide: function( event, ui ) {
			SlideFunction($.guiVars.callduration, ui);
		},
		// Occurs when the slider stops moving
		change: function( event, ui) {
			SlideChange($.guiVars.callduration, ui);
		}
	});

// Activated when the slider moves. Updates the label for the slider.
function SlideFunction(guiVars, ui) {
	// There is a bug in some old browers that make this go negative. This fixes that.
	if (ui.value == -1) {
		ui.value = 0;
		};
	$(guiVars.label).val(ui.value);
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