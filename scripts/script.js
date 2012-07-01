$(document).ready(function() {

	var PopOverController = {
		setCurrentPopOverId: function(id){
			if(!this.currentPopOverId) {
				this.currentPopOverId = undefined;
			}
			this.currentPopOverId = id;
		},
		currentPopOver: function(){
			return $('#' + this.currentPopOverId);
		},
		initialize: function(){
			// if there's a hash load appropriate popover
			if(window.location.hash) {
				var id = window.location.hash.replace('#','');
				this.showPopOver(id);
			}

			// get height of tallest content box for determining content positioning
			$('#content li').each($.proxy(function(i,o){
				var currentHeight = $(o).height() + $('nav').height();
				if(!this.contentHeight || currentHeight > this.contentHeight) {
					this.contentHeight = currentHeight;
				}
			}, this));

			// set nav and popovers as fixed or static depending on window height
			this.setContentPositioning();

			// attach event listeners
			$('nav a').click($.proxy(function(e){
				this.showPopOver(e.currentTarget.href.match(/#(.*)/)[1]);
				e.preventDefault();
			}, this));

			// popover close button
			$('#content a.close').click($.proxy(function(e){
				this.hidePopOver();
				e.preventDefault();
			}, this));

			// if a popover is open and you click anywhere but on it, close it
			$(document).click($.proxy(function(e){
				if(this.openingState === 'open' && e.target.id !== this.currentPopOverId) {
					this.hidePopOver();
				}
			}, this));

			// tweet popup window
			$('#twitter-popup').click($.proxy(function(e){
				this.openTwitter(e);
			}, this));

			// window resize changes content positioning for short/tall windows
			$(window).resize($.proxy(function(){
				this.setContentPositioning();
			}, this));
		},
		openTwitter: function(e){
			var windowObjectReference,
				offset = $('#twitter').offset(),
				contentLeft = offset.left,
				contentTop = offset.top,
				popupHeight = 170;

			if(window.screenX) {
				var windowLeft = window.screenX,
					windowTop = window.screenY;
			} else {
				var windowLeft = window.screenLeft,
					windowTop = window.screenTop;
			}

			windowObjectReference = window.open("http://twitter.com/share?text=Just%20read%20The%20Curiosity%20of%20School%20by%20Zander%20Sherman.%20Sparked%20a%20lot%20of%20ideas%20about%20schooling%20and%20education .&url=http://www.zandersherman.com/",
				"Twitter",
				"resizable=yes,scrollbars=no,status=no,left="+(windowLeft+contentLeft)+",top="+(windowTop+contentTop-popupHeight-window.scrollY)+",width=486,height="+popupHeight);

			if(windowObjectReference) e.preventDefault();
		},
		showPopOver: function(id){
			if($('#'+id).length == 0) return;

			if(this.currentPopOverId !== undefined && id !== this.currentPopOverId) {
				this.hidePopOver();
			}
			
			this.setCurrentPopOverId(id);
			this.openingState = 'opening';
			this.currentPopOver().fadeIn($.proxy(function(){
				this.openingState = 'open';
			}, this));
		},
		hidePopOver: function(){
			this.currentPopOver().fadeOut();
			this.openingState = undefined;
			this.setCurrentPopOverId('undefined');
		},
		setContentPositioning: function(){
			var height = $(window).height();

			if(height < this.contentHeight) {
				$('body').addClass('short');
			} else {
				$('body').removeClass('short');
			}
		}
	};

	PopOverController.initialize();

});