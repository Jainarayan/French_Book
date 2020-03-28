
(function($) {
	$(function() {
		
		var crosswordData = [
			 	{
					clue: "Action that helps in mixing and churning the food",
					answer: "Stomach",
					position: 1,
					orientation: "across",
					startx: 7,
					starty: 1
				},
				{
					clue: "A process of breaking down complex substances present in food into simpler substances",
					answer: "Digestion",
					position: 6,
					orientation: "across",
					startx: 1,
					starty: 6
				},
			 	{
					clue: "A process of digestion begins in the ______________ itself",
					answer: "Mouth",
					position: 10,
					orientation: "across",
					startx: 9,
					starty: 13
				},
				{
					clue: "A tube 25 cms long",
					answer: "Oesophagus",
					position: 4,
					orientation: "down",
					startx: 11,
					starty: 5
				},				
				{
					clue: "Absorb nutrients and minerals from food",
					answer: "Smallintestine",
					position: 1,
					orientation: "down",	
					startx: 7,
					starty: 1
				},
				{
					clue: "Absorbs water and many minerals present in the food",
					answer: "Largeintestine",
					position: 2,
					orientation: "across",
					startx: 6,
					starty: 3
				},
				{
					clue: "Helps to expel the waste material from the body",
					answer: "Anus",
					position: 5,
					orientation: "across",
					startx: 15,
					starty: 5
				},
				{
					clue: "Taste food using the ____________ present in the mouth",
					answer: "tongue",
					position: 3,
					orientation: "down",
					startx: 16,
					starty: 3
				},
				{
					clue: "The oesophagus is also known as",
					answer: "foodpipe",
					position: 8,
					orientation: "across",
					startx: 9,
					starty: 8
				},
				{
					clue: "Semi-digested food is now known as",
					answer: "chyme",
					position: 9,
					orientation: "across",
					startx: 10,
					starty: 10
				},
				{
					clue: "The small intestine receives juices from __________ and pancreas",
					answer: "liver",
					position: 7,
					orientation: "down",
					startx: 14,
					starty: 7
				}
				
			] 
	
		$('#crossword-wrapper').crossword(crosswordData);
		
	})
	
})(jQuery)
