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
		},
	},
	churn : {
		low : {
			airlines: 24,
			banks: 44,
			csp: 36,
			conelect: 26,
			ccp: 39,
			hp: 32,
			hotels: 24,
			inpro: 42,
			invfirm: 33,
			isps: 37,
			retailers: 40,
			wcs: 35
		},
		high : {
			airlines: 19,
			banks: 38,
			csp: 30,
			conelect: 17,
			ccp: 33,
			hp: 19,
			hotels: 19,
			inpro: 32,
			invfirm: 20,
			isps: 29,
			retailers: 29,
			wcs: 29
		}
	}
};

$.dropdownVars = {
	industry  : {
		value: "airlines",
		dropdown: "#IndustryDropdown"
	},
	walletclose : {
		value: 50,
		dropdown: "#WalletGapDropdown"
	},
	walletconvert : {
		value: 30,
		dropdown: "#WalletCloseRate"
	},
	churnclose : {
		value: 50,
		dropdown: "#ChurnGapDropdown"
	},
	churnre : {
		value: 50,
		dropdown: "#ChurnLoyalDropdown"
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
	},
	churn: {
		laggards: "#ChurnLaggards",
		leaders: "#ChurnLeaders",
		diff: "#ChurnDiff",
		churnre: "#ChurnReconsider",
		incrps: "#ChurnIncRPS",
		increv: "#ChurnIncRev"
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
	
	// Governs what happens when a dropdown is changed
	$.each($.dropdownVars, function(key, dropdownObject) {
		$(dropdownObject.dropdown).change(function() {
			dropdownObject.value = $(this).val();
			calcOutput();
		});
		$(dropdownObject.dropdown).val(dropdownObject.value)
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
		var iLaggardWallet, iLeaderWallet, iDiffWallet, iNewOppWallet, iIncRPS, iIncRevWallet, iLaggardChurn, iLeaderChurn, iDiffChurn, iChurnReconsider, iRevBenChurn
		
		// Variables used for multiple calculations
		iIncRPS = $.sliderVars.revenhan.value - $.sliderVars.revbasic.value;

		// Increasing Wallet-share Calculations
		iLaggardWallet = $.industVar.wallet.low[$.dropdownVars.industry.value];
		iLeaderWallet = $.industVar.wallet.high[$.dropdownVars.industry.value];
		iDiffWallet = iLeaderWallet - iLaggardWallet;
		iNewOppWallet = Math.floor(($.sliderVars.customers.value * 1000000) * ($.dropdownVars.walletclose.value / 100) * (iDiffWallet / 100));
		iIncRevWallet = iNewOppWallet * ($.dropdownVars.walletconvert.value / 100) * iIncRPS;

		// Displaying wallet share calculations
		$($.fieldVars.wallet.laggards).text(iLaggardWallet + "%");
		$($.fieldVars.wallet.leaders).text(iLeaderWallet + "%");
		$($.fieldVars.wallet.diff).text(iDiffWallet);
		$($.fieldVars.wallet.newopps).text(numberWithCommas(iNewOppWallet));
		$($.fieldVars.wallet.incrps).text(numberWithCommas(iIncRPS));
		$($.fieldVars.wallet.increv).text(numberWithCommas(iIncRevWallet));

		// Reducing customer churn calculations
		iLaggardChurn = $.industVar.churn.low[$.dropdownVars.industry.value];
		iLeaderChurn = $.industVar.churn.high[$.dropdownVars.industry.value];
		iDiffChurn = -1*(iLeaderChurn - iLaggardChurn);
		iChurnReconsider = Math.floor(($.sliderVars.customers.value * 1000000) * ($.dropdownVars.churnclose.value / 100) * (iDiffChurn / 100));
		iRevBenChurn = iChurnReconsider * ($.dropdownVars.churnre.value / 100) * iIncRPS;

		// Displaying customer churn calculations
		$($.fieldVars.churn.laggards).text(iLaggardChurn + "%");
		$($.fieldVars.churn.leaders).text(iLeaderChurn + "%");
		$($.fieldVars.churn.diff).text(iDiffChurn);
		$($.fieldVars.churn.churnre).text(numberWithCommas(iChurnReconsider));
		$($.fieldVars.churn.incrps).text(numberWithCommas(iIncRPS));
		$($.fieldVars.churn.increv).text(numberWithCommas(iRevBenChurn));

	};

	function numberWithCommas(x) {
    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	// Prints the output to the screen on the page load
	calcOutput();
	
});