# General Overview

Just a simple ROI calculator written in jQuery that takes advantage of sliders and dropdowns, and that live-updates inline text.

[See the live demo here][1]

# General Use

To add static data, update the objects in the $.industVar namespace.

To add a new dropdown, create your dropdown on the page and then set the initial value using $.dropdownVars (that is, do not place it in the HTML, as this will cause issues if you forget to update it manually later). Also, add the ID there as well.

To add a new slider, add two divs: one for the slider label, and one for the slider. Place initial values and div IDs in $.sliderVars.

To add new fields to be updated, create them in the HTML and then add their ID to $.fieldVars object, which has objects to keep things organized.

All your math should go in the calcOutput() function, which can both compute and display the changes as they happen.

# Files

index.html: used to display everything (as expected)
/js/roifunctions.js: Where all the action is

Everything is is either Bootstrap or jQuery.

[1]: http://www.cxengage.com/customer-experience-roi-calculator