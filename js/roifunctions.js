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
		low : {
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
		high : {
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
		}
	}
};

$.dropdownVars = {
	industry  : {
		value: "airlines"
	},
	walletclose : {
		value: 50
	},
	walletconvert : {
		value: 30
	}
};

$.sliderVars = {
	customers  : {
		slider: "#CustomersSlider",
		label: "#lblCustomers",
		value: 22,
		min: 1,
		max: 100,
		step: 1
	},
	revbasic  : {
		slider: "#RevBasicSlider",
		label: "#lblRevBasic",
		value: 500,
		min: 10,
		max: 5000,
		step: 10
	},
	revenhan  : {
		slider: "#RevEnhanSlider",
		label: "#lblRevEnhan",
		value: 1000,
		min: 10,
		max: 5000,
		step: 10
	},
	costpercall  : {
		slider: "#CostPerCallSlider",
		label: "#lblCostPerCall",
		value: 5.85,
		min: 0.1,
		max: 20.0,
		step: 0.1
	},
	callvolume  : {
		slider: "#CallVolumeSlider",
		label: "#lblCallVolume",
		value: 22,
		min: 1,
		max: 300,
		step: 1
	},
	callduration : {
		slider: "#CallDurationSlider",
		label: "#lblCallDuration",
		value: 300,
		min: 10,
		max: 1000,
		step: 10
	},
	walletconvert : {
		slider: "#WalletConvert",
		label: "#lblWalletConvert",
		value: 30,
		min: 0,
		max: 100,
		step: 5
	}
};

$.fieldVars = {
	wallet: {
		laggards: "#WalletLaggards",
		leaders: "#WalletLeaders",
		diff: "#WalletDiff",
		newopps: "#WalletNewOpps",
		incrps: "#WalletIncRPS",
		increv: "#WalletIncRev"
	}
};
			
$(function(){

	// Initialize the sliders
	$.each($.sliderVars, function(key, sliderObject) {
		$(sliderObject.slider).slider({
			// Occurs when the user begins to move the slider
			slide: function( event, ui ) {
			SlideFunction(sliderObject, ui);
			},
			// Occurs when the slider stops moving
			change: function( event, ui) {
			SlideChange(sliderObject, ui);
			},
			// Initializes the slider values
			value: sliderObject.value,
			min: sliderObject.min,
			max: sliderObject.max,
			step: sliderObject.step
		});
		$(sliderObject.label + ">span").text(numberWithCommas(sliderObject.value));
	});
	
	// The first line ensures that the code executes when their value is changed.
	$("#IndustryDropdown").change(function () {
		$.dropdownVars.industry.value = $(this).val(); //Updates the value element of the appropriate array above.
		calcOutput(); //Calls the function to update the totals
	});

	$("#WalletGapDropdown").change(function () {
		$.dropdownVars.walletclose.value = $(this).val(); //Updates the value element of the appropriate array above.
		calcOutput(); //Calls the function to update the totals
	});

	$("#WalletCloseRate").change(function () {
		$.dropdownVars.walletclose.value = $(this).val(); //Updates the value element of the appropriate array above.
		calcOutput(); //Calls the function to update the totals
	});
	

	// Activated when the slider moves. Updates the label for the slider.
	function SlideFunction(guiItem, ui) {
	// There is a bug in some old browers that make this go negative. This fixes that.
		if (ui.value == -1) {
			ui.value = 0;
			};
		$(guiItem.label + ">span").text(numberWithCommas(ui.value));
	};

	// Activated when the slider stops. Updates the value of the slider, and calls the function that calculates the output.
	// Do not combine this with the SlideFunction function, or else the values will always be one step behind.
	function SlideChange(guiItem, ui) {
		guiItem.value = $(guiItem.slider).slider("option", "value");
		calcOutput();
	};

	// The formula used to calculate the output value when the slider is moved or a dropdown in changed.
	function calcOutput() {
	// Local variables to make it easier to break up the calculations. 
		var iLaggardWallet, iLeaderWallet, iDiffWallet, iNewOppWallet, sNewOppWallet, iIncRPSWallet, sIncRPSWallet, iIncRev, sIncRev
		
		// Increasing Wallet-share Calculations
		iLaggardWallet = $.industVar.wallet.low[$.dropdownVars.industry.value];
		iLeaderWallet = $.industVar.wallet.high[$.dropdownVars.industry.value];
		iDiffWallet = iLeaderWallet - iLaggardWallet;
		iNewOppWallet = Math.floor(($.sliderVars.customers.value * 1000000) * ($.dropdownVars.walletclose.value / 100) * (iDiffWallet / 100));
		iIncRPSWallet = $.sliderVars.revenhan.value - $.sliderVars.revbasic.value;
		iIncRev = iNewOppWallet * ($.dropdownVars.walletconvert.value / 100) * iIncRPSWallet

		// Convert to numbers with commas
		sNewOppWallet = numberWithCommas(iNewOppWallet);
		sIncRPSWallet = numberWithCommas(iIncRPSWallet);
		sIncRev = numberWithCommas(iIncRev);

		// Displaying wallet share calculations
		$($.fieldVars.wallet.laggards).text(iLaggardWallet + "%");
		$($.fieldVars.wallet.leaders).text(iLeaderWallet + "%");
		$($.fieldVars.wallet.diff).text(iDiffWallet);
		$($.fieldVars.wallet.newopps).text(sNewOppWallet);
		$($.fieldVars.wallet.incrps).text(sIncRPSWallet);
		$($.fieldVars.wallet.increv).text(sIncRev);

	};

	function numberWithCommas(x) {
    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	// Prints the output to the screen on the page load
	calcOutput();
	
});