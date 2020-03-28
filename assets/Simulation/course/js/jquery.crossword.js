
(function($){
	$.fn.crossword = function(dataEntry) {
			
			var i = 1;
			var puzzle = {}; 
			puzzle.data = dataEntry;
			
			this.after('<div id="crossword-clues"><h2>Across</h2><ol id="across"></ol><h2>Down</h2><ol id="down"></ol></div>');
			
			var tbl = ['<table id="crossword">'],
			    puzzEl = this,
				clues = $('#crossword-clues'),
				clueLiEls,
				coords,
				entryCount = puzzle.data.length,
				entries = [], 
				rows = [],
				cols = [],
				solved = [],
				tabindex,
				$actives,
				activePosition = 0,
				activeClueIndex = 0,
				currOri,
				targetInput,
				mode = 'interacting',
				solvedToggle = false,
				z = 0;

			var puzInit = {
				
				init: function() {
					currOri = 'across'; 
					
					puzzle.data.sort(function(a,b) {
						return a.position - b.position;
					});

					puzzEl.delegate('input', 'keyup', function(e){
						mode = 'interacting';						
						
						switch(e.which) {
							case 39:
							case 37:
								currOri = 'across';
								break;
							case 38:
							case 40:
								currOri = 'down';
								break;
							default:
								break;
						}
						
						if ( e.keyCode === 9) {
							return false;
						} else if (
							e.keyCode === 37 ||
							e.keyCode === 38 ||
							e.keyCode === 39 ||
							e.keyCode === 40 ||
							e.keyCode === 8 ||
							e.keyCode === 46 ) {
								
							if (e.keyCode === 8 || e.keyCode === 46) {
								currOri === 'across' ? nav.nextPrevNav(e, 37) : nav.nextPrevNav(e, 38); 
							} else {
								nav.nextPrevNav(e);
							}
							
							e.preventDefault();
							return false;
						} else {
							
							console.log('input keyup: '+solvedToggle);
							
							puzInit.checkAnswer(e);

						}

						e.preventDefault();
						return false;					
					});
			
					puzzEl.delegate('input', 'keydown', function(e) {

						if ( e.keyCode === 9) {
							
							mode = "setting ui";
							if (solvedToggle) solvedToggle = false;

							nav.updateByEntry(e);
							
						} else {
							return true;
						}
												
						e.preventDefault();
									
					});
					
					puzzEl.delegate('input', 'click', function(e) {
						mode = "setting ui";
						if (solvedToggle) solvedToggle = false;

						console.log('input click: '+solvedToggle);
					
						nav.updateByEntry(e);
						e.preventDefault();
									
					});
					
					
					clues.delegate('li', 'click', function(e) {
						mode = 'setting ui';
						
						if (!e.keyCode) {
							nav.updateByNav(e);
						} 
						e.preventDefault(); 
					});
					
					
					puzzEl.delegate('#crossword', 'click', function(e) {
						$(e.target).focus();
						$(e.target).select();
					});
					
					puzInit.calcCoords();
					
					clueLiEls = $('#crossword-clues li');
					$('#' + currOri + ' li' ).eq(0).addClass('clues-active').focus();
				
					puzInit.buildTable();
					puzInit.buildEntries();
										
				},
				
				calcCoords: function() {
					
					for (var i = 0, p = entryCount; i < p; ++i) {		
						entries.push(i);
						entries[i] = [];

						for (var x=0, j = puzzle.data[i].answer.length; x < j; ++x) {
							entries[i].push(x);
							coords = puzzle.data[i].orientation === 'across' ? "" + puzzle.data[i].startx++ + "," + puzzle.data[i].starty + "" : "" + puzzle.data[i].startx + "," + puzzle.data[i].starty++ + "" ;
							entries[i][x] = coords; 
						}

						$('#' + puzzle.data[i].orientation).append('<li tabindex="1" data-position="' + i + '">' + puzzle.data[i].clue + '</li>'); 
					}				
					
					for (var i = 0, p = entryCount; i < p; ++i) {
						for (var x=0; x < entries[i].length; x++) {
							cols.push(entries[i][x].split(',')[0]);
							rows.push(entries[i][x].split(',')[1]);
						};
					}

					rows = Math.max.apply(Math, rows) + "";
					cols = Math.max.apply(Math, cols) + "";
		
				},
				
				buildTable: function() {
					for (var i=1; i <= rows; ++i) {
						tbl.push("<tr>");
							for (var x=1; x <= cols; ++x) {
								tbl.push('<td data-coords="' + x + ',' + i + '"></td>');		
							};
						tbl.push("</tr>");
					};

					tbl.push("</table>");
					puzzEl.append(tbl.join(''));
				},
				
				buildEntries: function() {
					var puzzCells = $('#crossword td'),
						light,
						$groupedLights,
						hasOffset = false,
						positionOffset = entryCount - puzzle.data[puzzle.data.length-1].position; // diff. between total ENTRIES and highest POSITIONS
						
					for (var x=1, p = entryCount; x <= p; ++x) {
						var letters = puzzle.data[x-1].answer.split('');

						for (var i=0; i < entries[x-1].length; ++i) {
							light = $(puzzCells +'[data-coords="' + entries[x-1][i] + '"]');
							
							if(x > 1 ){
								if (puzzle.data[x-1].position === puzzle.data[x-2].position) {
									hasOffset = true;
								};
							}
							
							if($(light).empty()){
								$(light)
									.addClass('entry-' + (hasOffset ? x - positionOffset : x) + ' position-' + (x-1) )
									.append('<input maxlength="1" val="" type="text" tabindex="-1"/>');
									
							}
						};
						
					};	
					
					for (var i=1, p = entryCount; i < p; ++i) {
						$groupedLights = $('.entry-' + i);
						if(!$('.entry-' + i +':eq(0) span').length){
							$groupedLights.eq(0)
								.append('<span>' + puzzle.data[i].position + '</span>');
						}
					}	
					
					util.highlightEntry();
					util.highlightClue();
					$('.active').eq(0).focus();
					$('.active').eq(0).select();
										
				},
				
				
				checkAnswer: function(e) {				
					var valToCheck, currVal;
					
					util.getActivePositionFromClassGroup($(e.target));
				
					valToCheck = puzzle.data[activePosition].answer.toLowerCase();

					currVal = $('.position-' + activePosition + ' input')
						.map(function() {
					  		return $(this)
								.val()
								.toLowerCase();
						})
						.get()
						.join('');
					
					if(valToCheck === currVal){	
						$('.active')
							.addClass('done')
							.removeClass('active');
					
						$('.clues-active').addClass('clue-done');
						
						solved.push(valToCheck);
						solvedToggle = true;
						return;
					}
					currOri === 'across' ? nav.nextPrevNav(e, 39) : nav.nextPrevNav(e, 40);
					
				}				


			}; 
			

			var nav = {
				
				nextPrevNav: function(e, override) {

					var len = $actives.length,
						struck = override ? override : e.which,
						el = $(e.target),
						p = el.parent(),
						ps = el.parents(),
						selector;
				
					util.getActivePositionFromClassGroup(el);
					util.highlightEntry();
					util.highlightClue();
					
					$('.current').removeClass('current');
					
					selector = '.position-' + activePosition + ' input';
					
					switch(struck) {
						case 39:
							p
								.next()
								.find('input')
								.addClass('current')
								.select();

							break;
						
						case 37:
							p
								.prev()
								.find('input')
								.addClass('current')
								.select();

							break;

						case 40:
							ps
								.next('tr')
								.find(selector)
								.addClass('current')
								.select();

							break;

						case 38:
							ps
								.prev('tr')
								.find(selector)
								.addClass('current')
								.select();

							break;

						default:
						break;
					}
															
				},
	
				updateByNav: function(e) {
					var target;
					
					$('.clues-active').removeClass('clues-active');
					$('.active').removeClass('active');
					$('.current').removeClass('current');
					currIndex = 0;

					target = e.target;
					activePosition = $(e.target).data('position');
					
					util.highlightEntry();
					util.highlightClue();
										
					$('.active').eq(0).focus();
					$('.active').eq(0).select();
					$('.active').eq(0).addClass('current');
					
					currOri = $('.clues-active').parent('ol').prop('id');
										
					activeClueIndex = $(clueLiEls).index(e.target);
					
				},
			
				updateByEntry: function(e, next) {
					var classes, next, clue, e1Ori, e2Ori, e1Cell, e2Cell;
					
					if(e.keyCode === 9 || next){
						activeClueIndex = activeClueIndex === clueLiEls.length-1 ? 0 : ++activeClueIndex;
					
						$('.clues-active').removeClass('.clues-active');
												
						next = $(clueLiEls[activeClueIndex]);
						currOri = next.parent().prop('id');
						activePosition = $(next).data('position');
												
						util.getSkips(activeClueIndex);
						activePosition = $(clueLiEls[activeClueIndex]).data('position');
						
																								
					} else {
						activeClueIndex = activeClueIndex === clueLiEls.length-1 ? 0 : ++activeClueIndex;
					
						util.getActivePositionFromClassGroup(e.target);
						
						clue = $(clueLiEls + '[data-position=' + activePosition + ']');
						activeClueIndex = $(clueLiEls).index(clue);
						
						currOri = clue.parent().prop('id');
						
					}
						
						util.highlightEntry();
						util.highlightClue();
				}
				
			}; 

			
			var util = {
				highlightEntry: function() {
					$actives = $('.active');
					$actives.removeClass('active');
					$actives = $('.position-' + activePosition + ' input').addClass('active');
					$actives.eq(0).focus();
					$actives.eq(0).select();
				},
				
				highlightClue: function() {
					var clue;				
					$('.clues-active').removeClass('clues-active');
					$(clueLiEls + '[data-position=' + activePosition + ']').addClass('clues-active');
					
					if (mode === 'interacting') {
						clue = $(clueLiEls + '[data-position=' + activePosition + ']');
						activeClueIndex = $(clueLiEls).index(clue);
					};
				},
				
				getClasses: function(light, type) {
					if (!light.length) return false;
					
					var classes = $(light).prop('class').split(' '),
					classLen = classes.length,
					positions = []; 

					for(var i=0; i < classLen; ++i){
						if (!classes[i].indexOf(type) ) {
							positions.push(classes[i]);
						}
					}
					
					return positions;
				},

				getActivePositionFromClassGroup: function(el){

						classes = util.getClasses($(el).parent(), 'position');

						if(classes.length > 1){
							e1Ori = $(clueLiEls + '[data-position=' + classes[0].split('-')[1] + ']').parent().prop('id');
							e2Ori = $(clueLiEls + '[data-position=' + classes[1].split('-')[1] + ']').parent().prop('id');

							e1Cell = $('.position-' + classes[0].split('-')[1] + ' input').index(el);
							e2Cell = $('.position-' + classes[1].split('-')[1] + ' input').index(el);

							if(mode === "setting ui"){
								currOri = e1Cell === 0 ? e1Ori : e2Ori; 
							}

							if(e1Ori === currOri){
								activePosition = classes[0].split('-')[1];		
							} else if(e2Ori === currOri){
								activePosition = classes[1].split('-')[1];
							}
						} else {
							activePosition = classes[0].split('-')[1];						
						}
						
						console.log('getActivePositionFromClassGroup activePosition: '+activePosition);
						
				},
				
				checkSolved: function(valToCheck) {
					for (var i=0, s=solved.length; i < s; i++) {
						if(valToCheck === solved[i]){
							return true;
						}

					}
				},
				
				getSkips: function(position) {
					if ($(clueLiEls[position]).hasClass('clue-done')){
						activeClueIndex = position === clueLiEls.length-1 ? 0 : ++activeClueIndex;
						util.getSkips(activeClueIndex);						
					} else {
						return false;
					}
				}
				
			};
				
			puzInit.init();	
			
			/* $('input').click(function(){
				
				var a = $(this).parent().attr('data-coords');
				console.log(a);
			}); */
			
			$('#hidecontainer').hide();
			
			$('#check').click(function(){
				/* $('td').attr('data-coords',7,3).children('input').text('s');  */
				/* var s ='stomach';
				var a = [];
				a = s.split('')
				for(i=0;i<=a.length - 1;i++){
					console.log(a[i]);
				}
				for(j=1;j<=)
				 */
				$('#hidecontainer').show();
				$("td[data-coords|='7,1']").children('input').val('s').addClass('done');
				$("td[data-coords|='8,1']").children('input').val('t').addClass('done');
				$("td[data-coords|='9,1']").children('input').val('o').addClass('done');
				$("td[data-coords|='10,1']").children('input').val('m').addClass('done');
				$("td[data-coords|='11,1']").children('input').val('a').addClass('done');
				$("td[data-coords|='12,1']").children('input').val('c').addClass('done');
				$("td[data-coords|='13,1']").children('input').val('h').addClass('done');
				
				$("td[data-coords|='7,2']").children('input').val('m').addClass('done');
				$("td[data-coords|='7,3']").children('input').val('a').addClass('done');
				$("td[data-coords|='7,4']").children('input').val('l').addClass('done');
				$("td[data-coords|='7,5']").children('input').val('l').addClass('done');
				$("td[data-coords|='7,6']").children('input').val('i').addClass('done');
				$("td[data-coords|='7,7']").children('input').val('n').addClass('done');
				$("td[data-coords|='7,8']").children('input').val('t').addClass('done');
				$("td[data-coords|='7,9']").children('input').val('e').addClass('done');
				$("td[data-coords|='7,10']").children('input').val('s').addClass('done');
				$("td[data-coords|='7,11']").children('input').val('t').addClass('done');
				$("td[data-coords|='7,12']").children('input').val('i').addClass('done');
				$("td[data-coords|='7,13']").children('input').val('n').addClass('done');
				$("td[data-coords|='7,14']").children('input').val('e').addClass('done');
				
				$("td[data-coords|='6,3']").children('input').val('l').addClass('done');
				$("td[data-coords|='8,3']").children('input').val('r').addClass('done');
				$("td[data-coords|='9,3']").children('input').val('g').addClass('done');
				$("td[data-coords|='10,3']").children('input').val('e').addClass('done');
				$("td[data-coords|='11,3']").children('input').val('i').addClass('done');
				$("td[data-coords|='12,3']").children('input').val('n').addClass('done');
				$("td[data-coords|='13,3']").children('input').val('t').addClass('done');
				$("td[data-coords|='14,3']").children('input').val('e').addClass('done');
				$("td[data-coords|='15,3']").children('input').val('s').addClass('done');
				$("td[data-coords|='16,3']").children('input').val('t').addClass('done');
				$("td[data-coords|='17,3']").children('input').val('i').addClass('done');
				$("td[data-coords|='18,3']").children('input').val('n').addClass('done');
				$("td[data-coords|='19,3']").children('input').val('e').addClass('done');
				
				$("td[data-coords|='1,6']").children('input').val('d').addClass('done');
				$("td[data-coords|='2,6']").children('input').val('i').addClass('done');
				$("td[data-coords|='3,6']").children('input').val('g').addClass('done');
				$("td[data-coords|='4,6']").children('input').val('e').addClass('done');
				$("td[data-coords|='5,6']").children('input').val('s').addClass('done');
				$("td[data-coords|='6,6']").children('input').val('t').addClass('done');
				$("td[data-coords|='7,6']").children('input').val('i').addClass('done');
				$("td[data-coords|='8,6']").children('input').val('o').addClass('done');
				$("td[data-coords|='9,6']").children('input').val('n').addClass('done');
				
				$("td[data-coords|='16,4']").children('input').val('o').addClass('done');
				$("td[data-coords|='16,5']").children('input').val('n').addClass('done');
				$("td[data-coords|='16,6']").children('input').val('g').addClass('done');
				$("td[data-coords|='16,7']").children('input').val('u').addClass('done');
				$("td[data-coords|='16,8']").children('input').val('e').addClass('done');
				
				$("td[data-coords|='15,5']").children('input').val('a').addClass('done');
				$("td[data-coords|='17,5']").children('input').val('u').addClass('done');
				$("td[data-coords|='18,5']").children('input').val('s').addClass('done');
				
				$("td[data-coords|='11,5']").children('input').val('o').addClass('done');
				$("td[data-coords|='11,6']").children('input').val('e').addClass('done');
				$("td[data-coords|='11,7']").children('input').val('s').addClass('done');
				$("td[data-coords|='11,8']").children('input').val('o').addClass('done');
				$("td[data-coords|='11,9']").children('input').val('p').addClass('done');
				$("td[data-coords|='11,10']").children('input').val('h').addClass('done');
				$("td[data-coords|='11,11']").children('input').val('a').addClass('done');
				$("td[data-coords|='11,12']").children('input').val('g').addClass('done');
				$("td[data-coords|='11,13']").children('input').val('u').addClass('done');
				$("td[data-coords|='11,14']").children('input').val('s').addClass('done');
				
				$("td[data-coords|='9,8']").children('input').val('f').addClass('done');
				$("td[data-coords|='10,8']").children('input').val('o').addClass('done');
				$("td[data-coords|='11,8']").children('input').val('o').addClass('done');
				$("td[data-coords|='12,8']").children('input').val('d').addClass('done');
				$("td[data-coords|='13,8']").children('input').val('p').addClass('done');
				$("td[data-coords|='14,8']").children('input').val('i').addClass('done');
				$("td[data-coords|='15,8']").children('input').val('p').addClass('done');
				
				$("td[data-coords|='14,7']").children('input').val('l').addClass('done');
				$("td[data-coords|='14,9']").children('input').val('v').addClass('done');
				$("td[data-coords|='14,10']").children('input').val('e').addClass('done');
				$("td[data-coords|='14,11']").children('input').val('r').addClass('done');
				
				$("td[data-coords|='10,10']").children('input').val('c').addClass('done');
				$("td[data-coords|='12,10']").children('input').val('y').addClass('done');
				$("td[data-coords|='13,10']").children('input').val('m').addClass('done');
				
				$("td[data-coords|='9,13']").children('input').val('m').addClass('done');
				$("td[data-coords|='10,13']").children('input').val('o').addClass('done');
				$("td[data-coords|='12,13']").children('input').val('t').addClass('done');
				$("td[data-coords|='13,13']").children('input').val('h').addClass('done');
			});
							
	}
	
})(jQuery);