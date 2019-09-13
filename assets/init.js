(function($){
	$(function(){

		$('.sidenav-left').sidenav();
		$('.sidenav-right').sidenav({
			edge:'right',
		});
		$('.collapsible').collapsible();
		$('.modal').modal();
		$('.parallax').parallax();
		$('.scrollspy').scrollSpy();
		$(".dropdown-trigger").dropdown({
			coverTrigger: false,
		});
	}); // end of document ready
})(jQuery); // end of jQuery name space

$("input[name='phone']:first").keyup(function(e){
	var key=String.fromCharCode(e.keyCode);
	var value=$(this).val();
	if(value.length==2)$(this).val($(this).val()+' ');
	if(value.length==4|value.length==5)$(this).val($(this).val()+'-')
});


