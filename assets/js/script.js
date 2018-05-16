$(document).ready(function(){

	/*
	 * Register.php validation
	 */


	$('#username').on('keyup',function(){
		var username = $(this).val();

		$.ajax({
			url:"./lib/validate_reg_user.php",
			method:"POST",
			data:{"username":username}
		}).done(function(data){
			$('span.reg-error-username').html(data);
			if((data==" ")&& !isEmpty(username)){
				$('span.username-success').html("Username available");
			}else{
				$('span.username-success').html(" ");
			}
		});
	});

	$('#usermail').on('keyup',function(){
		var usermail = $(this).val();

		$.ajax({
			url:"./lib/validate_reg_email.php",
			method:"POST",
			data:{"usermail":usermail}
		}).done(function(data){
			$('span.reg-error-email').html(data);
			if((data==" ")&& !isEmpty(usermail)){
				$('span.email-success').html("Email address is available");
			}else{
				$('span.email-success').html(" ");
			}
		});
	});

	$('#userpassword').on('keyup',function(){
		var userpw = $(this).val();
		var spanerrorpw = $('span.reg-error-pw').html();



		if((userpw.length >= 0) &&(userpw.length <=8)){
			$('span.reg-error-pw').html('Password is too short');
			$('span.userpw-success').html('');
		}
		else{
			$('span.reg-error-pw').html('');
			$('span.userpw-success').html('<i class="fa fa-check" aria-hidden="true"></i>');
		}
	});

	$('#confirmpassword').on('keyup',function(){
		var userpw = $('#userpassword').val();
		var confpw = $('#confirmpassword').val();
		var spanerrorcpw = $('span.reg-error-cpw').html();

		if((userpw != confpw) || (isEmpty(confpw))){
			$('span.reg-error-cpw').html('Password Mismatched');
			$('span.usercpw-success').html('');
		}
		else{
			$('span.reg-error-cpw').html('');
			$('span.usercpw-success').html('<i class="fa fa-check" aria-hidden="true"></i>');
		}
	});

	//Disable spaces for input form
	$("form div input").on("keydown",function(e){
		if (e.which === 32)
	      return false;
	});

	$('form.register div input').on('blur',function(){
		var spanname = $('span.reg-error-username').html();
		var spanmail = $('span.reg-error-email').html();
		var spanpw = $('span.reg-error-pw').html();
		var spancpw = $('span.reg-error-cpw').html();

		

		if(isEmpty(spanname) && isEmpty(spanmail) && isEmpty(spanpw) && isEmpty(spancpw)){
			$('#register_submit').prop("disabled",true);
		}
		else if((spanname == "Username already taken")
				|| (spanname == "Username invalid")
				|| (spanmail == "Email address already registered") 
				|| (spanmail == "Email invalid")
				|| (spanpw == "Password is too short") 
				|| (spancpw == "Password Mismatched"))
			{
				$('#register_submit').prop("disabled",true);
			}

		else{
				$('#register_submit').prop("disabled",false);
			}
	});

	/*
	 * Profile.php
	 */

	$('button.userFirstNamebtn').on('click',function(){
		$('input#userFirstNameinput').prop('readonly',false);
	});

	$('button.userLastNamebtn').on('click',function(){
		$('input#userLastNameinput').prop('readonly',false);
	});

	$('button.userEmailbtn').on('click',function(){
		$('input#userEmailinput').prop('readonly',false);
	});

	$('button.userCitybtn').on('click',function(){
		$('input#userCityinput').prop('readonly',false);
	});

	$('button.profilesave').on('click',function(){
		var firstName = $('input#userFirstNameinput').val();
		var lastName = $('input#userLastNameinput').val();
		var email = $('input#userEmailinput').val();
		var city = $('input#userCityinput').val();
		var userid = $('p.p-head').data('userid');
		$.ajax({
			url:"./lib/update_profile.php",
			method:"POST",
			data: {
				"firstName":firstName,
				"lastName":lastName,
				"email":email,
				"city":city,
				"userid":userid
			}
		}).done(function(data){
			$('span.profilespan').html(data);
			$('input#userFirstNameinput').prop('readonly',true);
			$('input#userLastNameinput').prop('readonly',true);
			$('input#userEmailinput').prop('readonly',true);
			$('input#userCityinput').prop('readonly',true);
		});
	});

	/*
	 * Catalog Sorting	
	 */

	$('#sortselects').on('change',function(){
		var sortval = $(this).val();	
		switch(sortval){
			case 'pName':
				$('.catalogitems').load('./orderByName.php');
				break;
			case 'pCategoryID':
				$('.catalogitems').load('./orderByCat.php');
				break;
			case 'pPrice':
				$('.catalogitems').load('./orderByPrice.php');
				break;
			default:
				$('.catalogitems').load('./orderByName.php');
		}
	});

	/*
 	 * Add to Cart
 	 */

 	$('.catalogtabs:nth-child(1)').addClass('show active');

	$('.addtocart').on('click',function(){
		var pID = $(this).parent().data('pid');
		var qtyclass = '.quantity'+pID;
		var btnclass = '#cartbtn'+pID;
		var qty = parseInt($(qtyclass).val());

		console.log(qty);
		
		$.ajax({
			url:'./lib/addtocart.php',
			method:'POST',
			data:{'pid':pID,'quantity':qty}
		}).done(function(data){
			$('span.totalprice').html(data);
			$(btnclass).toggleClass('d-none');
		});

		$(this).toggleClass('d-none');
		
	});

});

// Checks if string is empty, return true if empty
function isEmpty(str) {
    return (!str || str.length == 0);
}


