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
		$('.tabs').tabs();
		$('.tooltipped').tooltip();
		$('.datepicker').datepicker();
		$('.timepicker').timepicker();
		$('select').formSelect();
		$('.chips-autocomplete').chips({
			placeholder: 'Categorias',
			autocompleteOptions: {
				data: {
					'Ração': null,
					'Comida': null,
					'Coleira': null,
					'Shampoo': null,
					'Escova': null,
					'Brinquedo': null,
					'Roupa': null,

					'Pedigree': null,
					'Special Dog': null,
					'Magnus': null,
					'Xodó': null,
					'PremieR': null
				},
				limit: Infinity,
				minLength: 1
			}
		});
	}); // end of document ready
})(jQuery); // end of jQuery name space

$("input[name='phone']:first").keyup(function(e){
	var key=String.fromCharCode(e.keyCode);
	var value=$(this).val();
	if(value.length==2)$(this).val($(this).val()+' ');
	if(value.length==4|value.length==5)$(this).val($(this).val()+'-')
});


