function PopOver(trigger, width, height) {

};

$(document).ready(function() {
	// var content = $('#content');

	// check for hash and load appropriate popover
	if(window.location.hash) {

	} else {
		
	}

	var currentPopOver = undefined;

	function showPopOver(triggerEl) {
		if(currentPopOver !== undefined) {
			hidePopOver(currentPopOver);
		}
		
		var id = triggerEl.href.match(/#(.*)/)[1];
		currentPopOver = $('#'+id);

		currentPopOver.fadeIn();
	}

	function hidePopOver(el) {
		console.log(el)
		$(el).fadeOut();
	}

	// attach event listener
	$('nav a[data-link-type*="popover"]').click(function(e){
		showPopOver(e.currentTarget);
	});

});