$(document).ready(function(){
  
var $terms = {keywords : [
  ' jspm, pune',
  'mit, pune',
  'jog, pune',
  'dy patil, pune',
  'symboysis, pune',
   ]
  /* icons : [
   		'../sqoolz/images/icons/slider-icon1.png',
   		'../sqoolz/images/icons/jyoti-inter.png',
   		'../sqoolz/images/icons/darshan.png',
   		'../sqoolz/images/icons/slider-icon1.png',
   		'../sqoolz/images/icons/jyoti-inter.png',
   		'../sqoolz/images/icons/darshan.png',
   		'../sqoolz/images/icons/slider-icon1.png',
   		'../sqoolz/images/icons/jyoti-inter.png',
   		'../sqoolz/images/icons/darshan.png',
   		'../sqoolz/images/icons/slider-icon1.png',
   		'../sqoolz/images/icons/jyoti-inter.png',
   		'../sqoolz/images/icons/darshan.png',
   		'../sqoolz/images/icons/slider-icon1.png',
   		'../sqoolz/images/icons/jyoti-inter.png',
   		'../sqoolz/images/icons/darshan.png',
   ]*/
   };
   
var $return = [];

var $default = 
	'<li class="prediction-item focus"><img src="images/icons/state-board.png" /><span class="prediction-text">state</span></li>'+
	'<li class="prediction-item focus"><img src="images/icons/sbsc.png" /><span class="prediction-text">cbsc</span></li>'+
	'<li class="prediction-item focus"><img src="images/icons/icse.png" /><span class="prediction-text">ib</span></li>'+
	'<li class="prediction-item focus"><img src="images/icons/ib.png"/><span class="prediction-text">igsc</span></li>'+
	'<li class="prediction-item focus"><img src="images/icons/igcse.png" /><span class="prediction-text">board</span></li>'+
	'<li class="prediction-item focus"><img src="images/icons/state-board.png"/><span class="prediction-text">pune</span></li>'+
	'<li class="prediction-item focus"><img src="images/icons/sbsc.png"/><span class="prediction-text">satara</span></li>'+
	'<li class="prediction-item focus"><img src="images/icons/icse.png" /><span class="prediction-text">rtn</span></li>'
;
//alert($terms.keywords.length);

/**
*	@param str - string to search in array
*	@param strArray - array of available strings
*/
function strInArray(str, strArray) {	
  for (var j=0; j < strArray.keywords.length; j++) {
  	//check the string is in available data array
  	//&&
  	//check dropdown length is less than five, we are displaying only five elements in dropdown
    if (strArray.keywords[j].match(str) && $return.length < 5) {
      //to display typed character in bold 
      var $h = strArray.keywords[j].replace(str, '<strong>'+str+'</strong>');
      
      //push this result in array name return
      //we get text in college, city format
      //split them on ',' and display nicely
      var clg_loc = $h.split(',');
      $return.push('<li class="prediction-item"><span class="prediction-text">' + clg_loc[0] + '</span> <br/> <span class="subtitle-scf-search">'+clg_loc[1]+'</span></li>');
    }
  }
}

/**
*	when user type something in dropdown and then searches in the given result by system by up and
*	down arrow key 
*/
	function nextItem(kp) {
	  //if ( $('.focus').length > 0 ) {
	    var $next = $('.focus').next(),
	        $prev = $('.focus').prev();
	  //}	  
	  if ( kp == 38 ) { // Up	 
	    if ( $('.focus').is(':first-child') ) {
	      $prev = $('.prediction-item:last-child');
	    }	    
	    $('.prediction-item').removeClass('focus');
	    $prev.addClass('focus');
	    
	  } else if ( kp == 40 ) { // Down	  
	    if ( $('.focus').is(':last-child') ) {
	      $next = $('.prediction-item:first-child');
	    }	    
	    $('.prediction-item').removeClass('focus');
	    $next.addClass('focus');
	  }
	}
	
	
	$(document).on('click', '.prediction-item', function(){
		$text = $(this).find('span').text();
		//$textp = $(this).find('label').text();

		$outputText = 
		$('.output').slideUp(function(){
		  $(this).html('');
		});
		$('.search-bar').val($text);
	});   

	  
	$(function(){  
		$('.search-bar').keyup(function(e){  	
			var find_val = $(this).val();
			//alert('find_val : '+find_val);
			//to display default search list
			if ( $(this).val().length == 0  && e.keyCode == 8) {
				$('.output').html($default).slideDown();	
				$('.prediction-item:first-child').addClass('focus'); 

				//when user searches from populated dropdown
				if ( $key == 38 || $key == 40 ) {
				  nextItem($key);
				  return;
				}
				return;
			}
		
		$key = e.keyCode;
		//when user searches from populated dropdown
		if ( $key == 38 || $key == 40 ){
		  nextItem($key);
		  return;
		}
	    
	    
    
	setTimeout(function() {
		//get the user entered value
		//var $search = $('.search-bar').val();
		var $search = find_val;

		//initializa array which contains result
		$return = [];

		//search typed string is in array or not      
		strInArray($search, $terms);

		if ( $search == '' || ! $('input').val ) {
			$('.output').html('').slideUp();
		} 
		else {
			$('.output').html($return).slideDown();
		}

		$arr = [];
		if($return.length == 0){
			//to add no record found 
			$arr[0] = '<li class="prediction-item no-result"><span class="prediction-text">No record found...</span></li>';      	
			$arr += $default;
			$('.output').html($arr);      		  	
		}

		$('.prediction-item').on('click', function(){
			$text = $(this).find('span').text();
			//alert($text);
			$('.output').slideUp(function(){
			  //$(this).html('');
			});
			$('.search-bar').val($text);
		});

		$('.prediction-item:first-child').addClass('focus');
		      
		}, 50);
	});
});
  
	$('.search-bar').focus(function(){	
		if ( $('.prediction-item').length > 0 ) {      
			$('.output').slideDown();      
		}  
		else{
			$('.output').html($default).slideDown();	       	
		}  
	    
		$('.searchform').submit(function(e){
			e.preventDefault();
			$text = $('.focus').find('span').text();
			$('.output').slideUp();
			$('.search-bar').val($text);
			$('input').blur();
		});
	});
  
	$('.search-bar').blur(function(){
		if ( $('.prediction-item').length > 0 ) {
			$('.output').delay(350).slideUp();
		}    
	});  
});