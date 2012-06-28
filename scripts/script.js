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
			// check for hash and load appropriate popover
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

			$('#content a.close').click($.proxy(function(e){
				var id = $(e.currentTarget).parents('li').attr('id');

				this.hidePopOver();
				e.preventDefault();
			}, this));

			$(document).click($.proxy(function(e){
				// if a popover is open and 
				if(e.target.id && e.target.id !== this.currentPopOverId) {
					this.hidePopOver();
				}
			}, this));

			$(window).resize($.proxy(function(){
				this.setContentPositioning();
			}, this));
		},
		showPopOver: function(id){
			if($('#'+id).length == 0) return;

			if(this.currentPopOverId !== undefined && id !== this.currentPopOverId) {
				this.hidePopOver();
			}
			
			this.setCurrentPopOverId(id);
			this.currentPopOver().fadeIn();
		},
		hidePopOver: function(){
			this.currentPopOver().fadeOut();
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