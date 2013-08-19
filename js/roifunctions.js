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
	},
	rec : {
		low : {
			airlines: 50,
			banks: 61,
			csp: 56,
			conelect: 56,
			ccp: 53,
			hp: 49,
			hotels: 59,
			inpro: 58,
			invfirm: 51,
			isps: 56,
			retailers: 52,
			wcs: 55
		},
		high : {
			airlines: 62,
			banks: 75,
			csp: 66,
			conelect: 63,
			ccp: 68,
			hp: 60,
			hotels: 61,
			inpro: 68,
			invfirm: 65,
			isps: 66,
			retailers: 57,
			wcs: 63
		},
		dorecommend : {
			airlines: 73,
			banks: 61,
			csp: 64,
			conelect: 55,
			ccp: 59,
			hp: 61,
			hotels: 77,
			inpro: 62,
			invfirm: 64,
			isps: 62,
			retailers: 72,
			wcs: 68
		},
		peopletold : {
			airlines: 3.4,
			banks: 2.6,
			csp: 3.1,
			conelect: 4.5,
			ccp: 2.3,
			hp: 2.7,
			hotels: 3.7,
			inpro: 2.9,
			invfirm: 2.8,
			isps: 3.1,
			retailers: 3.6,
			wcs: 3.9
		}
	}
};

$.dropdownVars = {
	industry  : {
		value: "airlines",
		dropdown: "#IndustryDropdown"
	},
	walletgap : {
		value: 50,
		dropdown: "#WalletGapDropdown"
	},
	walletconvert : {
		value: 30,
		dropdown: "#WalletCloseRate"
	},
	churngap : {
		value: 50,
		dropdown: "#ChurnGapDropdown"
	},
	churnre : {
		value: 50,
		dropdown: "#ChurnLoyalDropdown"
	},
	recgap : {
		value: 50,
		dropdown: "#RecGapDropdown"
	},
	recconvert : {
		value: 2,
		dropdown: "#RecConvertDropdown"
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
	}
};

$.fieldVars = {
	wallet: {
		laggards: "#WalletLaggards",
		leaders: "#WalletLeaders",
		diff: "#WalletDiff",
		newopps: "#WalletNewOpps",
		incrps: "#WalletIncRPS",
		increv: "#WalletIncRev",
		rpc: "#RPCWallet"
	},
	churn: {
		laggards: "#ChurnLaggards",
		leaders: "#ChurnLeaders",
		diff: "#ChurnDiff",
		churnre: "#ChurnReconsider",
		incrps: "#ChurnIncRPS",
		increv: "#ChurnIncRev",
		rpc: "#RPCChurn"
	},
	rec: {
		laggards: "#RecLaggards",
		leaders: "#RecLeaders",
		diff: "#RecDiff",
		newrecs: "#NewRecs",
		peopletold: "#PeopleTold",
		dorec: "#DoRecommend",
		totalrecs: "#NewRecommendations",
		incrps: "#RecIncRPS",
		increv: "#RecIncRev",
		rpc: "#RPCRec"
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
		var iIncRPS, iLaggardWallet, iLeaderWallet, iDiffWallet, iNewOppWallet, iIncRevWallet, fRPCWallet, iLaggardChurn, iLeaderChurn, iDiffChurn, iChurnReconsider, iRevBenChurn, fRPCChurn, iLaggardRec, iLeaderRec, iRecs, iDoRecommend, fPeopleTold, iTotalRecs, iRevBenRec, fRPCRec
		
		// Variables used for multiple calculations
		iIncRPS = $.sliderVars.revenhan.value - $.sliderVars.revbasic.value;

		// Increasing Wallet-share Calculations
		iLaggardWallet = $.industVar.wallet.low[$.dropdownVars.industry.value];
		iLeaderWallet = $.industVar.wallet.high[$.dropdownVars.industry.value];
		iDiffWallet = iLeaderWallet - iLaggardWallet;
		iNewOppWallet = Math.floor(($.sliderVars.customers.value * 1000000) * ($.dropdownVars.walletgap.value / 100) * (iDiffWallet / 100));
		iIncRevWallet = iNewOppWallet * ($.dropdownVars.walletconvert.value / 100) * iIncRPS;
		fRPCWallet = iIncRevWallet / ($.sliderVars.customers.value * 1000000)
		// Round to two decimal places
		fRPCWallet = Math.round(fRPCWallet*100)/100

		// Displaying wallet share calculations
		$($.fieldVars.wallet.laggards).text(iLaggardWallet + "%");
		$($.fieldVars.wallet.leaders).text(iLeaderWallet + "%");
		$($.fieldVars.wallet.diff).text(iDiffWallet);
		$($.fieldVars.wallet.newopps).text(numberWithCommas(iNewOppWallet));
		$($.fieldVars.wallet.incrps).text(numberWithCommas(iIncRPS));
		$($.fieldVars.wallet.increv).text(numberWithCommas(iIncRevWallet));
		$($.fieldVars.wallet.rpc).text(fRPCWallet);

		// Reducing customer churn calculations
		iLaggardChurn = $.industVar.churn.low[$.dropdownVars.industry.value];
		iLeaderChurn = $.industVar.churn.high[$.dropdownVars.industry.value];
		iDiffChurn = -1*(iLeaderChurn - iLaggardChurn);
		iChurnReconsider = Math.floor(($.sliderVars.customers.value * 1000000) * ($.dropdownVars.churngap.value / 100) * (iDiffChurn / 100));
		iRevBenChurn = iChurnReconsider * ($.dropdownVars.churnre.value / 100) * iIncRPS;
		fRPCChurn = iRevBenChurn / ($.sliderVars.customers.value * 1000000)
		// Round to two decimal places
		fRPCChurn = Math.round(fRPCChurn*100)/100

		// Displaying customer churn calculations
		$($.fieldVars.churn.laggards).text(iLaggardChurn + "%");
		$($.fieldVars.churn.leaders).text(iLeaderChurn + "%");
		$($.fieldVars.churn.diff).text(iDiffChurn);
		$($.fieldVars.churn.churnre).text(numberWithCommas(iChurnReconsider));
		$($.fieldVars.churn.incrps).text(numberWithCommas(iIncRPS));
		$($.fieldVars.churn.increv).text(numberWithCommas(iRevBenChurn));
		$($.fieldVars.churn.rpc).text(fRPCChurn);

		// Increased word of mouth calculations
		iLaggardRec = $.industVar.rec.low[$.dropdownVars.industry.value];
		iLeaderRec = $.industVar.rec.high[$.dropdownVars.industry.value];
		iDiffRec = (iLeaderRec - iLaggardRec);
		iRecs = Math.floor(($.sliderVars.customers.value * 1000000) * ($.dropdownVars.recgap.value / 100) * (iDiffRec / 100));
		iDoRecommend = $.industVar.rec.dorecommend[$.dropdownVars.industry.value];
		fPeopleTold = $.industVar.rec.peopletold[$.dropdownVars.industry.value];
		iTotalRecs = Math.floor(iRecs * (iDoRecommend / 100) * fPeopleTold);
		iRevBenRec = iTotalRecs * ($.dropdownVars.recconvert.value / 100) * iIncRPS;
		fRPCRec = iRevBenRec / ($.sliderVars.customers.value * 1000000)
		// Round to two decimal places
		fRPCRec = Math.round(fRPCRec*100)/100


		// Displaying word of mouth calculations
		$($.fieldVars.rec.laggards).text(iLaggardRec + "%");
		$($.fieldVars.rec.leaders).text(iLeaderRec + "%");
		$($.fieldVars.rec.diff).text(iDiffRec);
		$($.fieldVars.rec.newrecs).text(numberWithCommas(iRecs));
		$($.fieldVars.rec.dorec).text(iDoRecommend + "%");
		$($.fieldVars.rec.peopletold).text(fPeopleTold);
		$($.fieldVars.rec.totalrecs).text(numberWithCommas(iTotalRecs));
		$($.fieldVars.rec.incrps).text(numberWithCommas(iIncRPS));
		$($.fieldVars.rec.increv).text(numberWithCommas(iRevBenRec));
		$($.fieldVars.rec.rpc).text(fRPCRec);

	};

	function numberWithCommas(x) {
    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	// Prints the output to the screen on the page load
	calcOutput();
	
});