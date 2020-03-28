


$('#light_box').hide();

$('#glossary').click(function(){
	/* var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	$(window).resize(function() {
		windowWidth = $(window).width();
		windowHeight = $(window).height();	  
	}); */
	/* console.log(windowWidth); */
	var left  = ($(window).width()/2)-(900/2),
    top   = ($(window).height()/2)-(600/2),
    popup = window.open ("glossary.html", "popup", "width=1300, height=600, top="+top+", left="+left);
});


$('#close-img').click(function(){
	$('#light_box').hide();
	$('#container').show();
});


