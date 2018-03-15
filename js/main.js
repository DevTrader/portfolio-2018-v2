function docLoad(){
	console.log(window.innerWidth, window.innerHeight)
	//Intro Fade In
	$(".heading-primary").hide().fadeIn(2500);

	//Hamburger Menu Handler
	$(".nav-button").click(function(){
		$(".navigation").slideToggle("show");
	});
	//If you click a link from nav menu, close the menu
	$(".navigation-item a").click(function(){
		$(".navigation").delay(100).slideToggle("show");
	});

}

$(document).ready(docLoad());