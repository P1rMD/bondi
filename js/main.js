$(document).ready(function() {

	$(function(){

		var pull 		= $('#pull');
		var menu 		= $('.main_nav');
		var menuHeight 	= menu.height();

		$(pull).on('click', function(e) {
			e.preventDefault();
			menu.slideToggle();
		});

	});

});

