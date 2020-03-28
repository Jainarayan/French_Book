
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


/*---Quest1---*/
$('.quest1correct').click(function(){
	if($(this).children().length>0){
		return;
	}
	else{
		$(this).append('<span class="TickMark">&#10004;</span>');
		score++;
		$('#scoreText').text(score);
	}
	$('#correct, #hideContainer').show();
	$('#simple, #incorrect').hide();
	setTimeout(function(){
		$('#correct, #hideContainer').hide();
		$('#simple').show();
	}, 2000); 
});

$('.quest1incorrect').click(function(){
	$('#incorrect, #hideContainer').show();
	$('#simple, #correct').hide();	
	setTimeout(function(){
		$('#incorrect, #hideContainer').hide();
		$('#simple').show();
	}, 2000);		
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
	if(score == 5){
		setTimeout(function(){
			$('#quest1').hide();
			$('#quest2').show();
			score = 0;
			$('#scoreText').text(score);
		}, 2000);	
	}
}

function incorrectAnswer(){
	$('#incorrect, #hideContainer').show();
	$('#simple, #correct').hide();	
	setTimeout(function(){
		$('#incorrect, #hideContainer').hide();
		$('#simple').show();
	}, 2000);
}



