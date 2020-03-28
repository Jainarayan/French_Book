$(document).ready(function(){
	var data;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('GET', 'js/jsonjs.json', true);
	xmlhttp.onload = function(){
		data = JSON.parse(xmlhttp.responseText);
		showWords(data);
		 console.log(data);
	};
	xmlhttp.send(); 

	function showWords(data){
		data.sort(function(a, b){
			return a.word - b.word;
		});		
		$.each(data, function(index, word){	
			$("#text").append('<div class="divSelect" id='+data[index].id+ '>' +data[index].word+ '</div>');
			/* console.log(data[index].word) */			
		})
	}
	
	$(document).on('click', '.divSelect', function(){
		var a = $(this).attr('id');
		/* console.log(a) */
		$.each(data, function(index, id){
			var b;
			if(data[index].id == a){
				$('#showText').text(data[index].definition);
			}			
		})
		/* $('#showText').text(); */
	});
	
	$("#search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		console.log(value);
		$(".divSelect").filter(function() {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
	  
	$('#search').on('search', function() {
		
		showWords(data);
	});

});