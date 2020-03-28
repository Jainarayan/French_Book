
var score = 0;

$('#correct, #incorrect, #hideContainer, .line, .hideQuestions').hide();

function correctAnswer(){
	score++;
	$('#scoreText').text(score);
	$('#correct, #hideContainer').show();
	$('#simple, #incorrect').hide();
	setTimeout(function(){
		$('#correct, #hideContainer').hide();
		$('#simple').show();
	}, 2000);
}
function incorrectAnswer(){
	$('#incorrect, #hideContainer').show();
	$('#simple, #correct').hide();	
	setTimeout(function(){
		$('#incorrect, #hideContainer').hide();
		$('#simple').show();
	}, 2000);
}



/*---Ques 2---*/
$('.quest2dragItem').draggable({
	stack: '.quest1dragItem',
	revert: 'invalid',
	accept: '.fillInputBox'
});
	
$('.fillInputBox').droppable({			
	tolerance: 'pointer', 
	drop: function(ev,ui)
	{
		if($(ui.draggable).hasClass('Distillation') && $(this).hasClass('Distillation') || $(ui.draggable).hasClass('Residue') && $(this).hasClass('Residue') || $(ui.draggable).hasClass('Troposphere') && $(this).hasClass('Troposphere') || $(ui.draggable).hasClass('Food') && $(this).hasClass('Food'))	
		{				
			dropitem = $(ui.draggable);							
			$(this).append(dropitem);
			$(ui.draggable).css({                
								'top': '0vmin',
								'left': '0vmin',
								'margin-left': '5.5vmin' 
							});	
			ui.draggable.draggable({disabled: true});
			correctAnswer();
		}
		else
		{
			$(ui.draggable).draggable('option','revert',true);
			incorrectAnswer();
		}
			
	}
});


function correctAnswer(){
	score++;
	$('#scoreText').text(score);
	$('#correct, #hideContainer').show();
	$('#simple, #incorrect').hide();
	setTimeout(function(){
		$('#correct, #hideContainer').hide();
		$('#simple').show();
	}, 2000);
	
}

function incorrectAnswer(){
	$('#incorrect, #hideContainer').show();
	$('#simple, #correct').hide();	
	setTimeout(function(){
		$('#incorrect, #hideContainer').hide();
		$('#simple').show();
	}, 2000);
}



