// GetClassy JS creator Marvin Elmore 10/02/2013 1.0

/* Email */
var email_confirmation_active = false;	
var email_class_name = "email";
var email_msg_class_name = "email_error_msg";
var email_error_msg = "Is not valid";
var email_pass_msg = "";
var email_confirm_msg = "";	

/* Phone number */
var phoneNumChar = "-";

//--------------------------------- Init GetClassy JS
var GetClassyJS = {
	
    init: function() {
    //function that will initialize the script and do all the bindings
	GetClassyJS.emailValidation();
	GetClassyJS.positionGrid();
	GetClassyJS.phoneValidation();
	GetClassyJS.functionEngine();
	GetClassyJS.animationEngine();
    },
//--------------------------------- Init GetClassy JS Ends	

//--------------------------------- Email Logic
  emailValidation: function(obj) {
		
//Regular email validation	
var validate_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
		$("."+email_class_name).change(function(){		
			// $(this).addClass('current_email');
											   
			if($("."+email_class_name+":eq(0)").val() != "" && $("."+email_class_name+":eq(1)").val() != ""){
			emailConfirmation();//Email confirmation
			}
				
			  if (validate_pattern.test($(this).val())) {
					//Remove error message
				    $(this).next().remove('.'+email_msg_class_name);
				  } else {
					//Add errror message div. Prevent the double
					//If see class in Dom dont show error message again 
					if(!($(this).next().hasClass('.'+email_msg_class_name)) ){ 
				    $(this).after("<div class='"+email_msg_class_name+"'>"+email_error_msg+"</div>");
					//Remove confirm error message
				    $("."+email_class_name+":eq(1)").next().remove('.email_no_match');
						}
					//Remove extra error message on second email	
					if(email_confirmation_active != false){
					$("."+email_class_name+":eq(1)").next().remove('.'+email_msg_class_name);
			   }				
		    }// end function emailcheck			
		});
		
//-------------- function		

	var emailConfirmation = function(e){
		 console.log("Inside emailConfirmation() function");
		 email_confirmation_active = true;
			 	
			if($("."+email_class_name+":eq(0)").val() == $("."+email_class_name+":eq(1)").val()){
				 //alert("match");
				   $("."+email_class_name+":eq(1)").next().remove('.email_no_match');
				     } else {
			     //alert("dont match");
				 if(!($("."+email_class_name+":eq(1)").next().hasClass('email_no_match'))){
				  $("."+email_class_name+":eq(1)").after( "<div class='email_no_match'>Email don't match</div>" );	
				  email_confirmation_active = true;	
				}		
			 }
		  }		
	
    },// Email Function /
//--------------------------------- Email Logic Ends

//--------------------------------- Dom Grid System Logic
  positionGrid: function(obj) {
		
    var grid = 1000;
	var grid_row_pad = "10px";
	var grid_col_pad = "20px";
	
	gridSystem = function(ele, marginLeft, marginTop, float) {
		for (var i=0;i<grid;i++){
		//alert('yes');
		if($(ele).hasClass('g'+[i]) || $(ele).hasClass('gfull')){
			//alert('g'+[i]+ " " +'found class');
			if($(ele).hasClass('gfull')){
				$('.gfull').css({'width': '100%', 'margin-left': marginLeft+'px', 'margin-top': marginTop+'px', 'float': float});
				} else {
				$('.g'+[i]).css({'width': [i]+'px', 'margin-left': marginLeft+'px', 'margin-top': marginTop+'px', 'float': float});	
					}
			return false;
			}		
	     }//End Grid loop
    }
	gridSystem('.grid', 0, 0, 'none');
	gridSystem('.grid_row', 0, 20, 'none');
	gridSystem('.grid_col', 10, 0, 'left');
    },
//--------------------------------- Dom Grid System Logic End

//--------------------------------- Phone Number
  phoneValidation: function(obj) {
	  
	  var c = phoneNumChar;
	  
	  $(".phoneNum").change(function() {  
			var numVal = $(this).val();
			//Check value length show error if less than 10
			if($(this).val().replace(/-/g, '').length < 10){
					//Dont show double error messages
					if(!$(this).next().hasClass('phone_error_msg')){
					  $(this).after("<div class='phone_error_msg'>bad number</div>");
					}
				} else {
				//Remove error message		
				$(this).next().remove('.phone_error_msg');		
			}
			//Show new formatted phone number		
			$(this).val(numVal.replace(/(\d{3})(\d{3})(\d{4})/, '$1'+c+'$2'+c+'$3'));
		});
		
		$(".phoneNum").keypress(function(e) {
    var chr = String.fromCharCode(e.which);
	
	if (!(e.which.valueOf() == 8 || e.which.valueOf() == 9 || e.which.valueOf() == 16 || e.which.valueOf() == 17)){
		 if ("1234567890./()-".indexOf(chr) < 0)
		//$(this).after("<div class='phone_error_msg'>Character not allowed</div>");
			return false;
		} 
		//$(this).next().remove('.phone_error_msg');	
   });
		
  },
//--------------------------------- Phone Number Ends	

//--------------------------------- Animation Engine
  animationEngine: function(obj) {
	  
	//------ Animation speed setup
	var speed;
	var speedArr = new Array( "fast", "slow" );
	var setFunction = false;
	var setFunctionName;
	var functionName;
	
	
	
	//------ Get function name
	$( "[class*='doAfter']" ).each ( function () {
    var elClasses = $( this ).attr ('class').split ( ' ' );

      for ( var index in elClasses ) {
        if ( elClasses[index].match ( /^doAfter_\w+$/ ) ) {
            functionName = elClasses[index].split ( '_' )[1];
            //alert(functionName);
			if(functionName){
			setFunction = true;
			//Eval and Covert back into function
			setFunctionName = eval(functionName);
				}
            break;
        }
      }
    } );
	//------ Get function name end
	
//------------ function	setupAnimation element names	
	function setupAnimationSet(e) {
		//Loop until we get class name
		for (var i=0;i<9999;i++)
		{
			if($('body').find('.'+e+'_'+i).length) {
				
			//Check for each slidespeed in dom
	$( "[class*='slideSpeed']" ).each ( function () {
    var elClasses = $( this ).attr ('class').split ( ' ' );
      for ( var index in elClasses ) {
        if ( elClasses[index].match ( /^slideSpeed_\w+$/ ) ) {
			
            var classNum = elClasses[index].split ( '_' )[1];
			var classFullName = elClasses[index].match ( /^slideSpeed_\w+$/ );
			        
			/*
			if($('.'+ele).hasClass(classFullName)) {
				alert('yes');
				}
			*/	
			
			if($.inArray(classNum, speedArr) > -1){
				speed = classNum;
				animation(e+'_'+i, i, speed);
				} else {
				speed = parseInt(classNum);	
				animation(e+'_'+i, i, speed);
				}
            break;
        }
      }
    });	
				
			  //alert('got it');
			 //INIT Start up animation function
			   
			  return false;
			}
		}
	}
	
	
	//Create array search for animation class name 
	var setupAnimArr = ['slideUp','slideDown','slideRight','slideLeft'];
	for (var i = 0; i < setupAnimArr.length; i++) {
		for (var k = 0; k < 999; k++) {
    //alert('.'+setupAnimArr[i]);
    if($('body').find('.'+setupAnimArr[i]+'_'+k).length){
		//alert('found one');
		setupAnimationSet(setupAnimArr[i]);
		
		}
		
	  }
    }
	


	//Event animation
	//setupAnimationSet('click_slideUp');
	//setupAnimationSet('click_slideDown');
	//setupAnimationSet('click_slideRight');
	//setupAnimationSet('click_slideLeft');
	
//------------ function	
	function animation(ele, distance, speed) {

	var goTop = {marginBottom: distance+"px"};
	var goBottom = {marginTop: distance+"px"};
	var goRight = {marginLeft: distance+"px"};
	var goLeft = {marginRight: distance+"px"};
	var direction;
	var currentEve;

    //Use same element name for direction 
	for (var i=0;i<9999;i++)
	{
    if(ele === "slideUp_"+i){direction = goTop;}
	if(ele === "slideDown_"+i){direction = goBottom;}
	if(ele === "slideRight_"+i){direction = goRight;}
	if(ele === "slideLeft_"+i){direction = goLeft;}
	}
	
	
	//Check for each slidespeed in dom
	$( "[class*='slideSpeed']" ).each ( function () {
    var elClasses = $( this ).attr ('class').split ( ' ' );
      for ( var index in elClasses ) {
        if ( elClasses[index].match ( /^slideSpeed_\w+$/ ) ) {
			
            var classNum = elClasses[index].split ( '_' )[1];
			var classFullName = elClasses[index].match ( /^slideSpeed_\w+$/ );
			        
			
			if($('.'+ele).hasClass(classFullName)) {
				//alert('yes');
				
				if($.inArray(classNum, speedArr) > -1){
				speed = classNum;
				} else {
				speed = parseInt(classNum);	
					}
            break;
				
				}
			
			
        }
      }
    });

		
	$("."+ele).animate(direction, speed, function() {
		// Animation complete.
		if($("."+ele).hasClass('doAfter_'+functionName)){
	    runFunction();
		}
		//return false;
		
	  });
	  
    }  
	
//------------ function		
	//After animation run function if available
	function runFunction(){
		if(setFunction === true){
		  setFunctionName();
			} else {
				}
		return false;
		}
	
//------------ function		
	function dothis() {
		alert("working");
		}
		
	function dothissecond() {
		//alert("workingsec");
		}	
	
//------------ function			
	
	function eventListener(a, eve){
	//eventListener(element, event, element2)	
		var eventArr = ["click", "change", "blur"];
		
		if($.inArray(eve, eventArr) > -1){
		currentEve = eve;
		} else {
		return false;
		}
            
		$("."+a).on(currentEve, function(){
			alert("oooo");
		//Test below remove once done.
		//animation("slideDown_300", 200)		
		});
	}
	eventListener("clickStart_ooooo", "click");
		
  },
//--------------------------------- Animation Engine Ends

//--------------------------------- Function Engine
  functionEngine: function(obj) {
		 
		 }
//--------------------------------- Function Engine	Ends
	
}

$( document ).ready(function() {
GetClassyJS.init();
});