
var testName, testDuration, testMode, testLogo, checkboxId, questTypeValue, numberofDivs, i, j, headercheckBoxes, listcheckBoxes, totalMark, copyMode, questModeCheck, questModeText, marks, mode, countSelectedTick, QuestBoxTick, MarksBoxTick, tickSelected, QuestBoxFill, MarksBoxFill, fillSelected, QuestBoxTof, MarksBoxTof, tofSelected, QuestBoxMatch, MarksBoxMatch, matchSelected, QuestBoxShort, MarksBoxShort, shortSelected, QuestBoxLong, MarksBoxLong, longSelected, QuestBoxPicQ, MarksBoxPicQ, picQSelected, countSelectedTypeTick, countquestTypeFill, countquestTypeTof, countquestTypematch, countquestTypepicQ, countquestTypeshort, countquestTypelong;
var checkboxesId = 1,                       
	questTypeId = 1,                        
	state = false,                          
	arrayChapters = [],                      
	count = 1,                              
	countQuestions = 0,                     
	countMarks = 0,
	showQuestionTypeList = 1,
	totalMarksTof = 0, 
	totalMarksfill = 0, 
	totalMarkstick = 0, 
	totalMarksmatch = 0, 
	totalMarksshort = 0,
	totalMarkslong = 0,
	totalMarkspic = 0,
	innerLists = 1,
	totalShort = 0,
	totalTof = 0,
	totalFill = 0,
	totalLong = 0,
	totalPicQ = 0,
	totalMatch = 0,
	totalTick = 0,
	countAutoTotalQuest = 0,
	countAutoTotalMarks = 0,
	listCount = 1,
	browseClick = false,
	selectedFill = false,
	selectedTick = false,
	selectedTof = false,
	selectedMatch = false,
	selectedShort = false,
	selectedLong = false,
	selectedPic = false;
	
var selectedQuestshort = [],
	selectedQuestTof = [],
	selectedQuesttick = [],
	selectedQuestlong = [],
	selectedQuestfill = [];
	
$('#alertContainer1, #alertContainer2, #alertContainer3').hide();
$('#AddButton').attr('disabled', 'true');
$('#hideBack').show();
$('#hideNext, .ManualshowBottomButtons, .AutoshowBottomButtons').hide();
$('#backButton').css('opacity', '0.5');


/*-- Test Duration Range Slider --*/
$(function () {
$("#input").change(function () {
	$("#testDuration").val($("#input").val());
  });
});


/*-- Choose File click --*/
$('.detailsBrowse').click(function(){
	browseClick = true;
});
	
/*-- Load Data from XML --*/
$.ajax({
	type: 'GET',
	url: 'js/data.xml',
	dataType: 'xml',
	success: function xmlParser(xml){
		$(xml).find('chapter').each(function(){
			$('.selectChapters').append('<div id="chapterList"><input class="checkBoxes" type="checkbox" id="'+checkboxesId+'"> '+$(this).attr('num')+'. '+$(this).text()+' </div>');
			checkboxesId = checkboxesId + 1;
		});
		
		$(xml).find('qtype').each(function(){
			$('#questionMode').append('<option class="questType" id='+questTypeId+' value='+$(this).attr('lbl')+'>'+$(this).attr('desc')+'</option>');
			questTypeId = questTypeId + 1;
		});	
	}
});


/*-- Select Question Type DropDown List - Manual Mode --*/
$('#questionButton').click(function(){		
	$('#ManualquestSelected, #ManualtotalMarks').text(0);
	$('#displayQuestions').show();
	$('#displayQuestionsText').hide();
	$('#questionContent, #questTypeHeader').empty();
	questTypeValue = $('.questType:selected').attr('value');
	$('#questionContent').empty();
	$('#questionContent').show();
	var listIdCheck1 = 1;
	var innerlistId1 = 1;
	innerLists = 1;
	$('#questionContent').append('<strong><div id="showMarkContainer">Enter Marks for this category: <input type="number" class="totalMark" id="totalMark'+questTypeValue+'" min="0" disabled/></div></strong>');
	for(var i=0; i<=arrayChapters.length - 1; i++){
		var j = arrayChapters[i];
		var headerIdCheck = 1;	
					
		$('#questionContent').append('<div id="numberofDivsId'+(i+1)+'" class="numberofDivsStyle '+arrayChapters[i]+'"></div>');			
		$.ajax({
			type: 'GET',
			url: 'js/data.xml',
			dataType: 'xml',
			ajaxJ: j,
			ajaxI: i,
			success: function xmlParser(xml){
				// Capture the current value of 'i'.
				
				j = this.ajaxJ; // Reinstate the correct value for 'i'.
				i = this.ajaxI;
				
				$(xml).find('question[chapter="'+j+'"][type="'+questTypeValue+'"] questTitle').each(function(){
					$('#numberofDivsId'+(i+1)).append('<input class="headercheckBoxes '+questTypeValue+'" type="checkbox" id="headerIdCheckBox'+headerIdCheck+'"/><div class="headerStyle" id="headerStyle'+(i+1)+'" style="font-weight: bold;">'+(i+1)+'. '+$(this).text()+'</div>');
					headerIdCheck = headerIdCheck + 1;
				});
				$(xml).find('question[chapter="'+j+'"][type="'+questTypeValue+'"] images').each(function(){
					$('#headerStyle'+(i+1)).append('<div><img class="questImages" src="images/'+$(this).text()+'"/></div>');
				});
				
				$(xml).find('question[chapter="'+j+'"][type="'+questTypeValue+'"] subq').each(function(){
					var questTypetext = $(this).text();
					var countText = (questTypetext.match(/=/g) || []).length;
					var split = questTypetext.split('=');
					$('#numberofDivsId'+(i+1)).append('<ol type="a" id="listId'+(i+1)+'"></ol>');
					var listIdCheck = 1;
					var innerlistId = 1;
					
					for(var s=0; s<=countText; s++){
						$('#listId'+(i+1)).append('<li id="'+listIdCheck1+'innerListId'+innerlistId+'" class="listStyle"><input class="listcheckBoxes '+questTypeValue+'" type="checkbox" id="'+listIdCheck1+'listIdCheckBox'+listIdCheck+'" value="'+split[s]+'">'+split[s]+'</li>'); 
						listIdCheck = listIdCheck + 1;
						innerlistId = innerlistId + 1;
					}
					listIdCheck1 = listIdCheck1 + 1;					
					innerlistId1 = innerlistId1 + 1;					
				});	
				$(xml).find('question[chapter="'+j+'"][type="'+questTypeValue+'"] ans').each(function(){
					var questAnswertext = $(this).text();
					var countAnswerText = (questAnswertext.match(/=/g) || []).length;
					var splitAnswer = questAnswertext.split('=');
										
					for(var k=1; k<=(countAnswerText+1); k++){
							$('#'+innerLists+'innerListId'+k).append('<span class="hideAnswers" id="'+innerLists+'innerListId'+k+'" style="float: right; border: 1px solid;">'+splitAnswer[(k-1)]+'</span>'); 
						}
					innerLists = innerLists + 1;
				});
				
				$(xml).find('question[chapter="'+j+'"][type="match"] ans').each(function(){					
					$('#headerStyle'+(i+1)).append('<span class="hideAnswers">'+$(this).text()+'</span>');					
				});
			}
		});
	}
});


/*-- Main checkboxes change --*/
$(document).on('change', '.headercheckBoxes', function(){
	headercheckBoxes = $(this).attr('id');
	if($('#' +headercheckBoxes).is(':checked')){
		$('#' +headercheckBoxes).siblings('ol').find('.listcheckBoxes').prop('checked', true);
		$('.totalMark').prop('disabled', false);
		$('#hideQuestion').hide();
		$('#AddButton').css('opacity', '1')
	} 
	else{
		$('#' +headercheckBoxes).siblings('ol').find('.listcheckBoxes').prop('checked', false);
	}
	
	if($(".headercheckBoxes:checked").length == 0){
		$('#hideQuestion').show();
		$('#AddButton').css('opacity', '0.5');
		$('.totalMark').prop('disabled', true);
	}
});

/*-- Sub checkboxes change --*/
$(document).on('change', '.listcheckBoxes', function(){
	listcheckBoxes = $(this).attr('id');
	if($('#' +listcheckBoxes).is(':checked')){
		$(this).parents('li').parents('ol').siblings('.headercheckBoxes').prop('checked', true);
		$('.totalMark').prop('disabled', false);
		$('#hideQuestion').hide();
		$('#AddButton').css('opacity', '1');
	} 
	else{
		if($('#' +listcheckBoxes).parent().siblings('li').children('input').is(':checked')){
			$('#' +listcheckBoxes).parents('li').parents('ol').siblings('.headercheckBoxes').prop('checked', true);
		}
		else{			
			$('#' +listcheckBoxes).parents('li').parents('ol').siblings('.headercheckBoxes').prop('checked', false);
		}
	}	
	
	if($(".listcheckBoxes:checked").length == 0){
		$('#hideQuestion').show();
		$('#AddButton').css('opacity', '0.5');
		$('.totalMark').prop('disabled', true);
	}	
});

/*-- Test Add Button - Manual Mode --*/
function addButtonContent(){
	
	questModeCheck = $('#questionMode').select().val();	
	if(questModeCheck == 'Tof'){
		totalMarksTof = parseInt($('#totalMarkTof').val() * $(".listcheckBoxes:checked").length);
		totalTof = $('.listStyle .Tof:checked').length;
		$('#ManualtotalMarks').text(totalMarksTof);
	}
	if(questModeCheck == 'short'){
		totalMarksshort = parseInt($('#totalMarkshort').val() * $(".listcheckBoxes:checked").length);
		totalShort = $('.listStyle .short:checked').length;
		$('#ManualtotalMarks').text(totalMarksshort);
	}	
	if(questModeCheck == 'fillblank'){
		totalMarksfill = parseInt($('#totalMarkfillblank').val() * $(".listcheckBoxes:checked").length);
		totalFill = $('.listStyle .fillblank:checked').length;
		$('#ManualtotalMarks').text(totalMarksfill);
	}
	if(questModeCheck == 'longa'){
		totalMarkslong = parseInt($('#totalMarklonga').val() * $(".listcheckBoxes:checked").length);
		totalLong = $('.listStyle .longa:checked').length;
		$('#ManualtotalMarks').text(totalMarkslong);
	}	
	if(questModeCheck == 'tick'){
		totalMarkstick = parseInt($('#totalMarktick').val() * $(".listcheckBoxes:checked").length);
		totalTick = $('.listStyle .tick:checked').length;
		$('#ManualtotalMarks').text(totalMarkstick);
	}
	if(questModeCheck == 'match'){
		totalMarksmatch = parseInt($('#totalMarkmatch').val() * $(".headercheckBoxes:checked").length);
		totalMatch = $('.match:checked').length;
		$('#ManualtotalMarks').text(totalMarksmatch);
	}	
	if(questModeCheck == 'picQ'){
		totalMarkspic = parseInt($('#totalMarkpicQ').val() * $(".listcheckBoxes:checked").length);
		totalPicQ = $('.listStyle .picQ:checked').length;
		$('#ManualtotalMarks').text(totalMarkspic);
	}		
			
	$('#displayQuestionsText').show();
	$('#questionContent').hide();
	countQuestions = $(".listcheckBoxes:checked").length;		
	$('#ManualquestSelected').text(countQuestions);
	$('#hideNext').hide();
	$('#nextButton').css('opacity', '1');
	$('#hideQuestion').show();
	$('#AddButton').css('opacity', '0.5')
	questModeCheck = $('#questionMode').select().val();
	questModeText = $('#questionMode option:selected').text();
	
	countMarks = totalMarksTof + totalMarksshort + totalMarksfill + totalMarkslong + totalMarkstick + totalMarksmatch + totalMarkspic;
	
	
	$('#tofAdded').text(totalTof);
	$('#fillAdded').text(totalFill);
	$('#tickAdded').text(totalTick);
	$('#shortAdded').text(totalShort);
	$('#longAdded').text(totalLong);
	$('#picQAdded').text(totalPicQ);
	$('#matchAdded').text(totalMatch);
	
	if(questModeCheck == 'fillblank' || questModeCheck == 'tick' || questModeCheck == 'Tof' || questModeCheck == 'longa' || questModeCheck == 'short'){
					
		var selected = new Array();
		var selectedAnswers = new Array();
		$(".listcheckBoxes:checked").each(function(){
			selected.push(this.value);
			selectedAnswers.push($(this).siblings('span').text());
		});	
		
		if(questModeCheck == 'Tof'){
			marks = $('#totalMarkTof').val();
		}
		if(questModeCheck == 'short'){
			marks = $('#totalMarkshort').val();
		}
		
		if(questModeCheck == 'fillblank'){
			marks = $('#totalMarkfillblank').val();
		}
		if(questModeCheck == 'longa'){
			marks = $('#totalMarklonga').val();
		}
		
		if(questModeCheck == 'tick'){
			marks = $('#totalMarktick').val();
		}
		
		/*-- If Questions are added again --*/	
		if((questModeCheck == 'fillblank' && selectedFill == true) || (questModeCheck == 'tick' && selectedTick == true) || (questModeCheck == 'Tof' && selectedTof == true) || (questModeCheck == 'short' && selectedShort == true) || (questModeCheck == 'longa' && selectedLong == true)){
			$('.showQuestionList'+questModeCheck).empty();
			$('#'+questModeCheck+' .showedMarks').remove();
			$('#'+questModeCheck).append('<strong style="position: absolute; top: 6vmin; right: 3vmin;" class="showedMarks"><span style="float: right;">['+marks+' x '+$('.listcheckBoxes:checked').length+']</span></strong>')

			for(var i=0; i<selected.length; i++){		
				$('.showQuestionList'+questModeCheck).append('<li class="checkList">'+selected[i]+'</li>')
				$('.showQuestionList'+questModeCheck).append('<span class="hidePreviewAnswers" style="color: red;">Answer: '+selectedAnswers[i]+'</span>')
			}
		}
		
		/*-- If Questions are added first time --*/
		else{
			$('.showQuestions').append('<div class="showQuestionStyle" id="'+questModeCheck+'"><strong class="showedMarks"><span style="float: right;">['+marks+' x '+$('.listcheckBoxes:checked').length+']</span></strong></div>');
		
			$('#'+questModeCheck).append('<strong><div id="'+showQuestionTypeList+'">'+showQuestionTypeList+'. '+questModeText+'</div></strong>')
			
			$('#'+questModeCheck).append('<ol type="a" class="showQuestionList'+questModeCheck+'"></ol>');
			for(var i=0; i<selected.length; i++){		
				$('.showQuestionList'+questModeCheck).append('<li class="checkList">'+selected[i]+'</li>')
				$('.showQuestionList'+questModeCheck).append('<span class="hidePreviewAnswers" style="color: red;">Answer: '+selectedAnswers[i]+'</span>')
			}
			showQuestionTypeList = showQuestionTypeList + 1;
		}
		
		if(questModeCheck == 'fillblank'){
			selectedFill = true;
		}
		if(questModeCheck == 'tick'){
			selectedTick = true;
		}
		if(questModeCheck == 'Tof'){
			selectedTof = true;
		}
		if(questModeCheck == 'short'){
			selectedShort = true;
		}
		if(questModeCheck == 'longa'){
			selectedLong = true;
		}
	}

		
	if(questModeCheck == 'match'){			
		var selectedMatchImage = new Array();
		var selectedMatchAnswer = new Array();
		$(".match:checked").each(function () {
			selectedMatchImage.push($(this).siblings('.headerStyle').children('div').children('.questImages').attr('src'));
			selectedMatchAnswer.push($(this).siblings('.headerStyle').children('span').text())
		});
		
		countQuestions = $(".headercheckBoxes:checked").length;		
		$('#ManualquestSelected').text(countQuestions);
		
		marks = $('#totalMarkmatch').val();
		var questAnswertext = $(".match:checked").siblings('.headerStyle').children('span').text();
		var countAnswerText = (questAnswertext.match(/=/g) || []).length;
		var splitAnswer = questAnswertext.split('=');

		
		if((questModeCheck == 'match' && selectedMatch == true)){
			$('.showQuestionList'+questModeCheck).empty();
			$('#'+questModeCheck+' .showedMarks').remove();
			$('#'+questModeCheck).append('<strong style="position: absolute; top: 6vmin; right: 3vmin;" class="showedMarks"><span style="float: right;">['+marks+' x '+$('.headercheckBoxes:checked').length+']</span></strong>')

			for(var i=0; i<selectedMatchImage.length; i++){			
				$('.showQuestionList'+questModeCheck).append('<li class="questionList'+questModeCheck+'" id="questionList'+questModeCheck+''+i+'" style="margin-bottom: 2vmin;"><img style="width: 60vmin; height: 25vmin;" src="'+selectedMatchImage[i]+'"/></li>');
				$('.showQuestionList'+questModeCheck).append('<div id="'+i+'questionList'+questModeCheck+'" class="hidePreviewAnswers" style="color: red;">Answer: <span type="a" id="matchAnswerList"></span></div>'); 
				$('#'+i+'questionList'+questModeCheck).children('#matchAnswerList').append(''+selectedMatchAnswer[i]+''); 	
			}		
		}
		else{
			$('.showQuestions').append('<div class="showQuestionStyle" id="'+questModeCheck+'"><strong class="showedMarks"><span style="float: right;">['+marks+' x '+$('.headercheckBoxes:checked').length+']</span></strong></div>');		
			$('#'+questModeCheck).append('<strong><div id="'+showQuestionTypeList+'">'+showQuestionTypeList+'. '+questModeText+'</div></strong>')		
			$('#'+questModeCheck).append('<ol type="a" class="showQuestionList'+questModeCheck+'"></ol>');
			for(var i=0; i<selectedMatchImage.length; i++){			
				$('.showQuestionList'+questModeCheck).append('<li class="questionList'+questModeCheck+'" id="questionList'+questModeCheck+''+i+'" style="margin-bottom: 2vmin;"><img style="width: 60vmin; height: 25vmin;" src="'+selectedMatchImage[i]+'"/></li>');
				$('.showQuestionList'+questModeCheck).append('<div id="'+i+'questionList'+questModeCheck+'" class="hidePreviewAnswers" style="color: red;">Answer: <span type="a" id="matchAnswerList"></span></div>'); 
				$('#'+i+'questionList'+questModeCheck).children('#matchAnswerList').append(''+selectedMatchAnswer[i]+''); 	
			}		
			showQuestionTypeList = showQuestionTypeList + 1;
		}
		
		if(questModeCheck == 'match'){
			selectedMatch = true;
		}
				
	}
	
	if(questModeCheck == 'picQ'){
		var selectedpicQ = new Array();
		var selectedAnswers = new Array();
		$(".listcheckBoxes:checked").each(function () {
			selectedpicQ.push(this.value);
			selectedAnswers.push($(this).siblings('span').text());
		});		
			
		marks = $('#totalMarkpicQ').val();			
				
		var selectedImage = new Array();
		$(".picQ:checked").each(function (){
			selectedImage.push($(this).siblings('.headerStyle').children('div').children('.questImages').attr('src'));
		});
		
		if((questModeCheck == 'picQ' && selectedPic == true)){
			$('.showQuestionList'+questModeCheck).empty();
			$('#'+questModeCheck+' .showedMarks').remove();
			$('#'+questModeCheck).append('<strong style="position: absolute; top: 6vmin; right: 3vmin;" class="showedMarks"><span style="float: right;">['+marks+' x '+$('.headercheckBoxes:checked').length+']</span></strong>')

			for(var i=0; i<selectedpicQ.length; i++){
				$('.showQuestionList'+questModeCheck).append('<img style="width: 60vmin; height: 25vmin;" src="'+selectedImage[imageCorrection]+'"/>')	
				$('.showQuestionList'+questModeCheck).append('<li>'+selectedpicQ[i]+'</li>');
				$('.showQuestionList'+questModeCheck).append('<span class="hidePreviewAnswers" style="color: red;">Answer: '+selectedAnswers[i]+'</span>')
				
				imageCorrection = imageCorrection + 2;
			}	
		}
		else{
			$('.showQuestions').append('<div class="showQuestionStyle" id="'+questModeCheck+'"><strong><span style="float: right;">['+marks+' x '+$('.listcheckBoxes:checked').length+']</span></strong></div>');		
			$('#'+questModeCheck).append('<strong><div id="'+showQuestionTypeList+'">'+showQuestionTypeList+'. '+questModeText+'</div></strong>')		
			$('#'+questModeCheck).append('<ol type="a" class="showQuestionList'+questModeCheck+'"></ol>');
			var imageCorrection = 0;
			for(var i=0; i<selectedpicQ.length; i++){
				$('.showQuestionList'+questModeCheck).append('<img style="width: 60vmin; height: 25vmin;" src="'+selectedImage[imageCorrection]+'"/>')	
				$('.showQuestionList'+questModeCheck).append('<li>'+selectedpicQ[i]+'</li>');
				$('.showQuestionList'+questModeCheck).append('<span class="hidePreviewAnswers" style="color: red;">Answer: '+selectedAnswers[i]+'</span>')
				
				imageCorrection = imageCorrection + 2;
			}
			showQuestionTypeList = showQuestionTypeList + 1;
		}
		
		if(questModeCheck == 'picQ'){
			selectedPic = true;
		}
	}	
}

/*-- Add Button - Manual --*/
$('#AddButton').click(function(){	
	if($('.totalMark').val() == ''){
		$('#alertContainer1').show();
		$('.alertContent').text("Please provide Marks for this Question Type.");
		return false;		
	}
	else{
		questModeCheck = $('#questionMode').select().val();
		if((questModeCheck == 'fillblank' && selectedFill == true) || (questModeCheck == 'tick' && selectedTick == true) || (questModeCheck == 'Tof' && selectedTof == true) || (questModeCheck == 'match' && selectedMatch == true) || (questModeCheck == 'short' && selectedShort == true) || (questModeCheck == 'longa' && selectedLong == true) || (questModeCheck == 'picQ' && selectedPic == true)){
			$('#alertContainer3').show();
			$('.alertContent').text('This Question Category already added. Do you want to "Replace" it.');
			count = 3;
			$('#topMenu'+count).children('a').removeClass('inactive').addClass('active');
			count++;
			$('#topMenu'+(count)).children('a').removeClass('active').addClass('inactive');
			return false;
		}
		else{
			addButtonContent();		
		}
	}
});

$('#copyButton, #copyButtonImage').click(function(){	
	var copyTypeValue = $('#copyMode option:selected').attr('value');
	
	if(copyTypeValue == "Teacher's Copy"){
		$('.hidePreviewAnswers').show();
		$('#previewCopy').text($('#copyMode option:selected').val());
	}
	if(copyTypeValue == "Student's Copy"){
		$('.hidePreviewAnswers').hide();
		$('#previewCopy').text($('#copyMode option:selected').val());
	}
});

/*-- Back button --*/
$('#back').click(function(){	
	$('#AddButton').attr('disabled', 'true');
	showQuestionTypeList = 1;
	countMarks = 0;
	totalMarksTof = 0, 
	totalMarksfill = 0, 
	totalMarkstick = 0, 
	totalMarksmatch = 0, 
	totalMarksshort = 0,
	totalMarkslong = 0,
	totalMarkspic = 0,
	innerLists = 1;
	$('#ManualtotalMarks').text(countMarks);
	if(count == 1){
		$('#backButton').css('opacity', '0.5');
		$('#hideBack').show();
	}
	$('#div'+count).hide();
	--count;
	if(count == 1){
		$('#hideBack').show();
		$('#backButton').css('opacity', '0.5');
	}
	
	if(count == 2 && mode == 'Manual'){
		$('#div3a').hide();
	}
	
	if(count == 2 && mode == 'Auto'){
		
		$('#div3b').hide();
	}
	
	if(count == 3 && mode == 'Auto'){
		$('.emptyContent, .emptyContainers').empty();
		$('#AutoquestSelected, #AutototalMarks').text(0);
		$('.AutoshowBottomButtons').show();
	}
	
	if(count == 3 && mode == 'Manual'){
		$('.ManualshowBottomButtons').show();
		$('#ManualquestSelected, #ManualtotalMarks').text(0);
	}
	
	$('#topMenu'+count).children('a').removeClass('inactive').addClass('active');
	$('#topMenu'+(count+1)).children('a').removeClass('active').addClass('inactive');
	countQuestions = 0;
	$('#ManualquestSelected').text(0);
	
	if(count == 2){
		$('.emptyContent, .emptyContainers').empty();
		$('#hideNext').hide();
		$('#nextButton').css('opacity', '1');
		$('.ManualshowBottomButtons, .AutoshowBottomButtons').hide();
		selectedFill = false,
		selectedTick = false,
		selectedTof = false,
		selectedMatch = false,
		selectedShort = false,
		selectedLong = false,
		selectedPic = false;
	}
	
	if(count == 3){
		$('.emptyContent, .emptyContainers').empty();
		generateQuestionList();
		$('#nextButton').css('opacity', '0.5');
		$('#hideNext').show();
		$('#hideQuestion').show();
		$('#AddButton').css('opacity', '0.5');
		$('#QuestBoxTick, #QuestBoxFill, #QuestBoxTof, #QuestBoxMatch, #QuestBoxShort, #QuestBoxLong, #QuestBoxPicQ').val(0);
		$('#MarksBoxTick, #MarksBoxFill, #MarksBoxTof, #MarksBoxMatch, #MarksBoxShort, #MarksBoxLong, #MarksBoxPicQ').val(1);
		$('#fillAdded, #tickAdded, #tofAdded, #matchAdded, #shortAdded, #longAdded, #picQAdded').text(0);
		totalTof = totalFill = totalTick = totalShort = totalLong = totalPicQ = totalMatch= 0;
		selectedFill = false,
		selectedTick = false,
		selectedTof = false,
		selectedMatch = false,
		selectedShort = false,
		selectedLong = false,
		selectedPic = false;
		
	}
	$('#div'+count).show();
});

$('.alertOkayButton').click(function(){
	$('#alertContainer1').hide();
});

/*-- Next button --*/
$('#next').click(function(){
	
	mode = $('#testMode option:selected').val();	
	testName = $('#testName').val();
	testDuration = $('#input').val();
	testMode = $('#testMode').select().val();
	testLogo = $('#blah').attr('src');
	console.log(testLogo)
	$('#backButton').css('opacity', '1');
	$('#hideBack').hide();
	if($('#testName').val().length == 0 || $('#testDuration').val().length == 0){
		$('#alertContainer1').show();
		$('.alertContent').text('Enter details to proceed further.');
		$('#backButton').css('opacity', '0.5');
		$('#hideBack').show();
		return false;
	}
	
	if(count == 2 && $('.checkBoxes:checked').length == 0){
		$('#alertContainer1').show();
		$('.alertContent').text('Select Chapters, then click Next.');
		return false;
	}
	if(count == 2 && $('.checkBoxes:checked').length != 0){
		generateQuestionList();	
	}

	if(count == 3 && mode == 'Manual'){	
		$('#alertContainer2').show();
		$('.alertContent').text('Do you want to Preview Test or Add more Questions. Click Yes to continue and No to add more.');
		count = 3;
		return false;
	}

	
	if(count == 3 && mode == 'Auto'){		
		if(QuestBoxTick > tickSelected || QuestBoxFill > fillSelected || QuestBoxTof > tofSelected || QuestBoxMatch > matchSelected || QuestBoxShort > shortSelected || QuestBoxPicQ > picQSelected || QuestBoxLong > longSelected ){
			$('#alertContainer1').show();
			$('.alertContent').text('Selected number of Questions are More than available number of Questions.');
			return false;
		}
		else if(QuestBoxTick == 0 && QuestBoxFill == 0 && QuestBoxTof == 0 && QuestBoxMatch == 0 && QuestBoxShort == 0 && QuestBoxLong == 0 && QuestBoxPicQ == 0){
			$('#alertContainer1').show();
			$('.alertContent').text('Please select Questions to proceed further.');
			return false;
		}
		else{			
			$('#alertContainer2').show();
			$('.alertContent').text('Do you want to Preview Test or Add more Questions. Click Yes to continue and No to add more.');
			count = 3;
			return false;
		}
	}
		
	$('#questionContent').empty();			
	$('#div'+count).hide();
	$('#topMenu'+count).children('a').removeClass('active').addClass('inactive');
	count++;
	$('#topMenu'+(count)).children('a').removeClass('inactive').addClass('active');

	if(count == 3 && mode == 'Auto'){
		$('#QuestBoxTick, #QuestBoxFill, #QuestBoxTof, #QuestBoxMatch, #QuestBoxShort, #QuestBoxLong, #QuestBoxPicQ').val(0);
		$('#MarksBoxTick, #MarksBoxFill, #MarksBoxTof, #MarksBoxMatch, #MarksBoxShort, #MarksBoxLong, #MarksBoxPicQ').val(1);
		$('#div3b').show();
		$('#hideNext, #hideQuestion').show();
		$('#nextButton').css('opacity', '0.5');
		$('.AutoshowBottomButtons').show();
		$('#AutoquestSelected, #AutototalMarks').text(0);		
	}
	if(count == 3 && mode == 'Manual'){
		$('#div3a').show();
		$('#hideNext, #hideQuestion').show();
		$('#nextButton').css('opacity', '0.5');
		$('.ManualshowBottomButtons').show();
		$('#ManualquestSelected, #ManualtotalMarks').text(0);	
		$('#AddButton').css('opacity', '0.5');
	}
	
	countQuestions = 0;
	$('#div'+count).show();
	
	arrayChapters.sort(function(a,b) 
	{
	   return a - b;
	});	
});

/*-- Question Input box change - Auto Mode --*/
$('.QuestBox').on('change', function(){
	$('#hideNext, #hideQuestion').hide();
	$('#nextButton').css('opacity', '1');
	QuestBoxTick = parseInt($('#QuestBoxTick').val());
	MarksBoxTick = parseInt($('#MarksBoxTick').val());
	tickSelected = parseInt($('#tickSelected').text());
	QuestBoxFill = parseInt($('#QuestBoxFill').val());
	MarksBoxFill = parseInt($('#MarksBoxFill').val());
	fillSelected = parseInt($('#fillSelected').text());
	QuestBoxTof = parseInt($('#QuestBoxTof').val());
	MarksBoxTof = parseInt($('#MarksBoxTof').val());
	tofSelected = parseInt($('#tofSelected').text());
	QuestBoxMatch = parseInt($('#QuestBoxMatch').val());
	MarksBoxMatch = parseInt($('#MarksBoxMatch').val());
	matchSelected = parseInt($('#matchSelected').text());
	QuestBoxShort = parseInt($('#QuestBoxShort').val());
	MarksBoxShort = parseInt($('#MarksBoxShort').val());
	shortSelected = parseInt($('#shortSelected').text());
	QuestBoxLong = parseInt($('#QuestBoxLong').val());
	MarksBoxLong = parseInt($('#MarksBoxLong').val());
	longSelected = parseInt($('#longSelected').text());
	QuestBoxPicQ = parseInt($('#QuestBoxPicQ').val());
	MarksBoxPicQ = parseInt($('#MarksBoxPicQ').val());
	picQSelected = parseInt($('#picQSelected').text());
	countAutoTotalQuest = QuestBoxFill + QuestBoxTick + QuestBoxTof + QuestBoxMatch + QuestBoxShort + QuestBoxLong + QuestBoxPicQ;
	countAutoTotalMarks = MarksBoxTick * QuestBoxTick + MarksBoxFill * QuestBoxFill + MarksBoxTof * QuestBoxTof + MarksBoxMatch * QuestBoxMatch + MarksBoxShort * QuestBoxShort + MarksBoxLong * QuestBoxLong + MarksBoxPicQ * QuestBoxPicQ;
	$('#AutoquestSelected').text(countAutoTotalQuest);
	$('#AutototalMarks').text(countAutoTotalMarks);
});

/*-- Marks Input box change - Auto Mode --*/
$('.MarksBox').on('change', function(){
	$('#hideNext, #hideQuestion').hide();
	$('#nextButton').css('opacity', '1');
	QuestBoxTick = parseInt($('#QuestBoxTick').val());
	MarksBoxTick = parseInt($('#MarksBoxTick').val());
	tickSelected = parseInt($('#tickSelected').text());
	QuestBoxFill = parseInt($('#QuestBoxFill').val());
	MarksBoxFill = parseInt($('#MarksBoxFill').val());
	fillSelected = parseInt($('#fillSelected').text());
	QuestBoxTof = parseInt($('#QuestBoxTof').val());
	MarksBoxTof = parseInt($('#MarksBoxTof').val());
	tofSelected = parseInt($('#tofSelected').text());
	QuestBoxMatch = parseInt($('#QuestBoxMatch').val());
	MarksBoxMatch = parseInt($('#MarksBoxMatch').val());
	matchSelected = parseInt($('#matchSelected').text());
	QuestBoxShort = parseInt($('#QuestBoxShort').val());
	MarksBoxShort = parseInt($('#MarksBoxShort').val());
	shortSelected = parseInt($('#shortSelected').text());
	QuestBoxLong = parseInt($('#QuestBoxLong').val());
	MarksBoxLong = parseInt($('#MarksBoxLong').val());
	longSelected = parseInt($('#longSelected').text());
	QuestBoxPicQ = parseInt($('#QuestBoxPicQ').val());
	MarksBoxPicQ = parseInt($('#MarksBoxPicQ').val());
	picQSelected = parseInt($('#picQSelected').text());
	countAutoTotalQuest = QuestBoxFill + QuestBoxTick + QuestBoxTof + QuestBoxMatch + QuestBoxShort + QuestBoxLong + QuestBoxPicQ;
	countAutoTotalMarks = MarksBoxTick * QuestBoxTick + MarksBoxFill * QuestBoxFill + MarksBoxTof * QuestBoxTof + MarksBoxMatch * QuestBoxMatch + MarksBoxShort * QuestBoxShort + MarksBoxLong * QuestBoxLong + MarksBoxPicQ * QuestBoxPicQ;
	$('#AutoquestSelected').text(countAutoTotalQuest);
	$('#AutototalMarks').text(countAutoTotalMarks);
});

$('.alertNoButton').click(function(){
	$('#alertContainer2').hide();
	count = 3;
});

$('.alertNoButton3').click(function(){
	$('#alertContainer3').hide();
	count = 3;
	$('.ManualshowBottomButtons').show();
	$('#ManualquestSelected, #ManualtotalMarks').text(0);	
});

/*-- Yes Button - Auto Mode --*/
$('.alertYesButton3').click(function(){
	showQuestionTypeList = showQuestionTypeList - 1;
	$('#topMenu'+count).children('a').removeClass('active').addClass('inactive');
	$('#topMenu'+(count+1)).children('a').removeClass('inactive').addClass('active');
	$('.ManualshowBottomButtons, .AutoshowBottomButtons').hide();
	$('.showQuestionList'+questModeCheck).empty();
	$('#alertContainer3').hide();
	console.log(questModeCheck)
	addButtonContent();			
	count = 3;
	$('.ManualshowBottomButtons').show();	
});

/*-- Yes Button - Manual Mode --*/
$('.alertYesButton').click(function(){	
	$('#topMenu'+count).children('a').removeClass('active').addClass('inactive');
	$('#topMenu'+(count+1)).children('a').removeClass('inactive').addClass('active');
	$('#div4').show();
	$('#hideQuestion, #alertContainer2').hide();
	$('#hideNext').show();
	$('#nextButton').css('opacity', '0.5');
	$('#copyMode').select().val("Teacher's Copy");
	copyMode = $('#copyMode').select().val();
	var date = $.datepicker.formatDate('dd/mm/yy', new Date());
	$('.ManualshowBottomButtons, .AutoshowBottomButtons').hide();
	$('#previewName').text(testName);
	$('#previewCopy').text(copyMode);
	$('#previewTime').text(testDuration);
	$('#previewMarks').text(countMarks);
	$('#previewDate').text(date);
	if(browseClick == true){
		$('#previewLogo').show();
		$('#previewLogo').append('<img src="'+testLogo+'" style="width: 10vmin;"/>')
	}
	else{
		$('#previewLogo').hide();
	}	
	if(mode == 'Auto'){
		/* $('.emptyContent').empty(); */
		/* $('#previewMarks').text(countAutoTotalMarks);
		if(QuestBoxTick == 0 && QuestBoxFill == 0 && QuestBoxTof == 0 && QuestBoxMatch == 0 && QuestBoxShort == 0 && QuestBoxLong == 0 && QuestBoxPicQ == 0){
			$('#alertContainer1').show();
			$('.alertContent').text('Please select Questions to proceed further.');
			return false;
		}
		
		else if(QuestBoxTick > tickSelected || QuestBoxFill > fillSelected || QuestBoxTof > tofSelected || QuestBoxMatch > matchSelected || QuestBoxShort > shortSelected || QuestBoxLong > longSelected || QuestBoxPicQ > picQSelected){
			$('#alertContainer1').show();
			$('.alertContent').text('Selected number of Questions are More than available number of Questions.');
			return false;
		}
		else{			
			showAutoQuestions();
			$('#div4').show();
		} */
		$('#previewMarks').text(countAutoTotalMarks);
		showAutoQuestions();
		$('#div4').show();
	}
	count = 4;	
});

/*-- Auto Mode functionality --*/
function showAutoQuestions(){
	listCount = 1;
	
	if(QuestBoxTick > 0){		
		$('.showQuestions').append('<div class="showQuestionStyle" id="tickMarks"><strong>'+listCount+'. Tick the correct option<span style="float: right;">['+QuestBoxTick+' x '+MarksBoxTick+']</span></strong></div>');
		$('#tickMarks').append('<ol type="a" class="showQuestionListtickMarks"></ol>');
		for(var i=0; i<QuestBoxTick; i++){
			var elements = $(".countTickQuest");
			var dupElements = elements;
			var randomelement = dupElements[Math.floor(Math.random() * dupElements.length)];
			
			if($('.ListtickMark').find(randomelement).length == 0){
				$('.showQuestionListtickMarks').append('<li class="ListtickMark" id="ListtickMarks'+i+'"></li>')
				$('#ListtickMarks'+i).append(randomelement)			
			}
			else{
				i = i - 1;
			}		
		}			
		listCount = listCount + 1;
	}
	if(QuestBoxFill > 0){	
		$('.showQuestions').append('<div class="showQuestionStyle" id="fillMarks"><strong>'+listCount+'. Fill in the blanks<span style="float: right;">['+QuestBoxFill+' x '+MarksBoxFill+']</span></strong></div>');
		$('#fillMarks').append('<ol type="a" class="showQuestionListfillMarks"></ol>');
		for(var i=0; i<QuestBoxFill; i++){
			var elements = $(".countFillQuest");
			var randomelement = elements[Math.floor(Math.random() * elements.length)];
			
			if($('.ListfillMark').find(randomelement).length == 0){
				$('.showQuestionListfillMarks').append('<li class="ListfillMark" id="ListfillMarks'+i+'"></li>')
				$('#ListfillMarks'+i).append(randomelement);		
			}
			else{
				i = i - 1;
			}		
		}			
		listCount = listCount + 1;
	}
	if(QuestBoxTof > 0){	
		$('.showQuestions').append('<div class="showQuestionStyle" id="tofMarks"><strong>'+listCount+'. True or False<span style="float: right;">['+QuestBoxTof+' x '+MarksBoxTof+']</span></strong></div>');
		$('#tofMarks').append('<ol type="a" class="showQuestionListTofMarks"></ol>');
		for(var i=0; i<QuestBoxTof; i++){
			var elements = $(".countTofQuest");
			var randomelement = elements[Math.floor(Math.random() * elements.length)];
			
			if($('.ListTofMark').find(randomelement).length == 0){
				$('.showQuestionListTofMarks').append('<li class="ListTofMark" id="ListTofMarks'+i+'"></li>')
				$('#ListTofMarks'+i).append(randomelement).append(randomelement)
			
			}
			else{
				i = i - 1;
			}		
		}			
		listCount = listCount + 1;
	}
	
	if(QuestBoxMatch > 0){	
		$('.showQuestions').append('<div class="showQuestionStyle" id="matchMarks"><strong>'+listCount+'. Match the following<span style="float: right;">['+QuestBoxMatch+' x '+MarksBoxMatch+']</span></strong></div>');
		$('#matchMarks').append('<ol type="a" class="showQuestionListMatchMarks"></ol>');
		for(var i=0; i<QuestBoxMatch; i++){
			var elements = $(".countMatchQuest");
			var randomelement = elements[Math.floor(Math.random() * elements.length)];
			
			if($('.ListMatchMark').find(randomelement).length == 0){
				$('.showQuestionListMatchMarks').append('<li class="ListMatchMark" id="ListMatchMarks'+i+'"></li>')				
				$('#ListMatchMarks'+i).append(randomelement)			
			}
			else{
				i = i - 1;
			}		
		}			
		listCount = listCount + 1;
	}
	
	if(QuestBoxShort > 0){	
		$('.showQuestions').append('<div class="showQuestionStyle" id="shortMarks"><strong>'+listCount+'. Short answer type question<span style="float: right;">['+QuestBoxShort+' x '+MarksBoxShort+']</span></strong></div>');
		$('#shortMarks').append('<ol type="a" class="showQuestionListShortMarks"></ol>');
		for(var i=0; i<QuestBoxShort; i++){
			var elements = $(".countShortQuest");
			var randomelement = elements[Math.floor(Math.random() * elements.length)];
			
			if($('.ListShortMark').find(randomelement).length == 0){
				$('.showQuestionListShortMarks').append('<li class="ListShortMark" id="ListShortMarks'+i+'"></li>')
				$('#ListShortMarks'+i).append(randomelement)
		
			}
			else{
				i = i - 1;
			}		
		}			
		listCount = listCount + 1;
	}
	
	if(QuestBoxLong > 0){	
		$('.showQuestions').append('<div class="showQuestionStyle" id="longMarks"><strong>'+listCount+'. Long answer type question<span style="float: right;">['+QuestBoxLong+' x '+MarksBoxLong+']</span></strong></div>');
		$('#longMarks').append('<ol type="a" class="showQuestionListLongMarks"></ol>');
		for(var i=0; i<QuestBoxLong; i++){
			var elements = $(".countLongQuest");
			var randomelement = elements[Math.floor(Math.random() * elements.length)];
			
			if($('.ListLongMark').find(randomelement).length == 0){
				$('.showQuestionListLongMarks').append('<li class="ListLongMark" id="ListLongMarks'+i+'"></li>')
				$('#ListLongMarks'+i).append(randomelement)
	
			}
			else{
				i = i - 1;
			}		
		}			
		listCount = listCount + 1;
	}
	
	if(QuestBoxPicQ > 0){	
		$('.showQuestions').append('<div class="showQuestionStyle" id="picQMarks"><strong>'+listCount+'. Picture based question<span style="float: right;">['+QuestBoxPicQ+' x '+MarksBoxLong+']</span></strong></div>');
		$('#picQMarks').append('<ol type="a" class="showQuestionListPicQMarks"></ol>');
		for(var i=0; i<QuestBoxPicQ; i++){
			var elements = $(".countPicQQuest");
			var randomelement = elements[Math.floor(Math.random() * elements.length)];
			
			if($('.ListPicQMark').find(randomelement).length == 0){
				$('.showQuestionListPicQMarks').append('<li class="ListPicQMark" id="ListPicQMarks'+i+'"></li>')
				$('#ListPicQMarks'+i).append(randomelement)
	
			}
			else{
				i = i - 1;
			}		
		}			
		listCount = listCount + 1;
	}
		
}

/*-- Select All checkboxes for Chapters --*/
$('#selectAll').click(function(){
	var length;
	$('.checkBoxes').each(function(){
		if(!state){
			this.checked = true;
			length = $('.checkBoxes:checked').length;
			arrayChapters.push($('#' +length).attr('id'));			
		}	
		else{
			this.checked = false; 
			length = $('.checkBoxes:not(:checked)').length;
			var removeChapter = $('#' +length).attr('id');
			arrayChapters = $.grep(arrayChapters, function(value) {
				return value != removeChapter;
			});
		}
	});
	
	if(state){
		state = false;
	}
	else{
		state = true;
	}
});

/*-- Checkbox change --*/
$(document).on('change', '.checkBoxes', function(){
	checkboxId = $(this).attr('id');
	if($('#' +checkboxId).is(':checked')){
		arrayChapters.push(checkboxId);
	} 
	else{
		var removeChapter = checkboxId;
	
		arrayChapters = $.grep(arrayChapters, function(value) {
		  return value != removeChapter;
		});
	}
});


/*-- Read image when clicked on browse --*/
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
			$('#blah').css('width', '20vmin');
			$('#blah').css('height', '20vmin');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imgInp").change(function(){
    readURL(this);
});


/*-- Print Data --*/
function printData()
{
   var divToPrint=document.getElementById("printContent");
   newWin= window.open("");
   newWin.document.write(divToPrint.outerHTML);
   newWin.print();
   newWin.close();
}

$('#printButton').on('click',function(){
	printData();
})


/*-- Auto Mode - Generate Data ---*/

function generateQuestionList(){
	
	/* var selectquestTypeTick, countquestTypeTick, split; */ 
	for(var i=0; i<=arrayChapters.length - 1; i++){
		var j = arrayChapters[i];
		var headerIdCheck = 1;	
		var ch;			
		$.ajax({
			type: 'GET',
			url: 'js/data.xml',
			dataType: 'xml',
			ajaxJ: j,
			ajaxI: i,
			success: function xmlParser(xml){	
				
				j = this.ajaxJ; // Reinstate the correct value for 'i'.
				i = this.ajaxI;
				/* console.log(j) */
				$(xml).find('question[chapter = '+j+'][type="tick"] subq').each(function(){
					var selectquestTypeTick = $(this).text();
					var countquestTypeTick = (selectquestTypeTick.match(/=/g) || []).length;
					var split = selectquestTypeTick.split('=');
					
					for(var s=0; s<=countquestTypeTick; s++){
						$('#selectedXMLTick').append('<p class="countTickQuest countSelectedQuestions" id="ch'+j+'countselectedXMLTick'+s+'">'+split[s]+'</p>')
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="tick"] ans').each(function(){
					var selectquestTypeTick = $(this).text();
					var countquestTypeTick = (selectquestTypeTick.match(/=/g) || []).length;
					var split = selectquestTypeTick.split('=');
					
					for(var s=0; s<=countquestTypeTick; s++){
						$('#ch'+j+'countselectedXMLTick'+s).append('<div class="hidePreviewAnswers" style="color: red; margin-top: 2vmin;" id="ch'+j+'countselectedXMLAnsTick'+s+'">Answer: '+split[s]+'</div>')
					}
				});

				$(xml).find('question[chapter = '+j+'][type="fillblank"] subq').each(function(){
					var selectquestTypeFill = $(this).text();
					var countquestTypeFill = (selectquestTypeFill.match(/=/g) || []).length;
					var split = selectquestTypeFill.split('=');
					
					for(var s=0; s<=countquestTypeFill; s++){
						$('#selectedXMLFill').append('<p class="countFillQuest countSelectedQuestions" id="ch'+j+'countselectedXMLFill'+s+'">'+split[s]+'</p>')
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="fillblank"] ans').each(function(){
					var selectquestTypeFill = $(this).text();
					var countquestTypeFill = (selectquestTypeFill.match(/=/g) || []).length;
					var split = selectquestTypeFill.split('=');
					
					for(var s=0; s<=countquestTypeFill; s++){
						$('#ch'+j+'countselectedXMLFill'+s).append('<div class="hidePreviewAnswers" style="color: red; margin-top: 2vmin;" id="ch'+j+'countselectedXMLAnsFill'+s+'">Answer: '+split[s]+'</div>')
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="Tof"] subq').each(function(){
					var selectquestTypeTof = $(this).text();
					var countquestTypeTof = (selectquestTypeTof.match(/=/g) || []).length;
					var split = selectquestTypeTof.split('=');
					
					for(var s=0; s<=countquestTypeTof; s++){
						$('#selectedXMLTof').append('<p class="countTofQuest countSelectedQuestions" id="ch'+j+'countselectedXMLTof'+s+'">'+split[s]+'</p>')
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="Tof"] ans').each(function(){
					var selectquestTypeTof = $(this).text();
					var countquestTypeTof = (selectquestTypeTof.match(/=/g) || []).length;
					var split = selectquestTypeTof.split('=');
					
					for(var s=0; s<=countquestTypeTof; s++){
						$('#ch'+j+'countselectedXMLTof'+s).append('<div class="hidePreviewAnswers" style="color: red; margin-top: 2vmin;" id="ch'+j+'countselectedXMLAnsTof'+s+'">Answer: '+split[s]+'</div>')
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="match"] images').each(function(){
					var selectquestTypematch = $(this).text();
					var countquestTypematch = (selectquestTypematch.match(/=/g) || []).length;
					var split = selectquestTypematch.split('=');
					
					for(var s=0; s<=countquestTypematch; s++){
						$('#selectedXMLmatch').append('<p class="countMatchQuest countSelectedQuestions" id="ch'+j+'countselectedXMLmatch'+s+'"><img src="images/'+split[s]+'" style="width: 60vmin;" /></p>');
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="match"] ans').each(function(){
					var selectquestTypematch = $(this).text();
					var countquestTypematch = (selectquestTypematch.match(/=/g) || []).length;
					var split = selectquestTypematch.split('=');
					
					for(var s=0; s<=countquestTypematch; s++){
						$('#ch'+j+'countselectedXMLmatch'+s).append('<div class="hidePreviewAnswers" style="color: red; margin-top: 2vmin;" id="ch'+j+'countselectedXMLAnsmatch'+s+'">Answer: '+selectquestTypematch+'</div>')
					}
					
				});
				
				$(xml).find('question[chapter = '+j+'][type="picQ"] images').each(function(){
					var selectquestTypepicQ = $(this).text();
					var countquestTypepicQ = (selectquestTypepicQ.match(/=/g) || []).length;
					var split = selectquestTypepicQ.split('=');
					
					for(var s=0; s<=countquestTypepicQ; s++){
						$('#selectedXMLpicQ').append('<p class="countPicQQuest countSelectedQuestions" id="ch'+j+'countselectedXMLpicQ'+s+'"><img src="images/'+split[s]+'" style="width: 45vmin;"></p>')
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="picQ"] subq').each(function(){
					var selectquestTypepicQ = $(this).text();
					var countquestTypepicQ = (selectquestTypepicQ.match(/=/g) || []).length;
					var split = selectquestTypepicQ.split('=');
					
					for(var s=0; s<=countquestTypepicQ; s++){
						$('#ch'+j+'countselectedXMLpicQ'+s).append('<div id="ch'+j+'countselectedXMLAnspicQ'+s+'">'+split[s]+'</div>')
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="picQ"] ans').each(function(){
					var selectquestTypepicQ = $(this).text();
					var countquestTypepicQ = (selectquestTypepicQ.match(/=/g) || []).length;
					var split = selectquestTypepicQ.split('=');
					
					for(var s=0; s<=countquestTypepicQ; s++){
						$('#ch'+j+'countselectedXMLpicQ'+s).append('<div class="hidePreviewAnswers" style="color: red; margin-top: 2vmin;" id="ch'+j+'countselectedXMLAnspicQ'+s+'">Answer: '+split[s]+'</div>')
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="short"] subq').each(function(){
					var selectquestTypeshort = $(this).text();
					var countquestTypeshort = (selectquestTypeshort.match(/=/g) || []).length;
					var split = selectquestTypeshort.split('=');
					
					for(var s=0; s<=countquestTypeshort; s++){
						$('#selectedXMLshort').append('<p class="countShortQuest countSelectedQuestions" id="ch'+j+'countselectedXMLshort'+s+'">'+split[s]+'</p>')
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="short"] ans').each(function(){
					var selectquestTypeshort = $(this).text();
					var countquestTypeshort = (selectquestTypeshort.match(/=/g) || []).length;
					var split = selectquestTypeshort.split('=');
					
					for(var s=0; s<=countquestTypeshort; s++){
						$('#ch'+j+'countselectedXMLshort'+s).append('<div class="hidePreviewAnswers" style="color: red; margin-top: 2vmin;" id="ch'+j+'countselectedXMLAnsshort'+s+'">Answer: '+split[s]+'</div>')
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="longa"] subq').each(function(){
					var selectquestTypelong = $(this).text();
					var countquestTypelong = (selectquestTypelong.match(/=/g) || []).length;
					var split = selectquestTypelong.split('=');
					
					for(var s=0; s<=countquestTypelong; s++){
						$('#selectedXMLlong').append('<p class="countLongQuest countSelectedQuestions" id="ch'+j+'countselectedXMLlong'+s+'">'+split[s]+'</p>')
					}
				});
				
				$(xml).find('question[chapter = '+j+'][type="longa"] ans').each(function(){
					var selectquestTypelong = $(this).text();
					var countquestTypelong = (selectquestTypelong.match(/=/g) || []).length;
					var split = selectquestTypelong.split('=');
					
					for(var s=0; s<=countquestTypelong; s++){
						$('#ch'+j+'countselectedXMLlong'+s).append('<div class="hidePreviewAnswers" style="color: red; margin-top: 2vmin;" id="ch'+j+'countselectedXMLAnslong'+s+'">Answer: '+split[s]+'</div>')
					}
				});
				
				countSelectedTypeTick = $('#selectedXMLTick .countSelectedQuestions').length;
				countquestTypeFill = $('#selectedXMLFill .countSelectedQuestions').length;
				countquestTypeTof = $('#selectedXMLTof .countSelectedQuestions').length;
				countquestTypematch = $('#selectedXMLmatch .countSelectedQuestions').length;
				countquestTypepicQ = $('#selectedXMLpicQ .countSelectedQuestions').length;
				countquestTypeshort = $('#selectedXMLshort .countSelectedQuestions').length;
				countquestTypelong = $('#selectedXMLlong .countSelectedQuestions').length;				
			
				$('#tickSelected').text(countSelectedTypeTick);
				$('#fillSelected').text(countquestTypeFill);
				$('#tofSelected').text(countquestTypeTof);
				$('#matchSelected').text(countquestTypematch);
				$('#shortSelected').text(countquestTypeshort);
				$('#longSelected').text(countquestTypelong);
				$('#picQSelected').text(countquestTypepicQ);
			}
		});
		
	}
	
}
