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
			data:  {
				"firstName":firstName,
				"lastName":lastName,
				"email":email,
				"city":city,
				"userid":userid
			}
		}).done(function(data){
			$('span.profilespan').show();
			$('span.profilespan').html(data);
			$('input#userFirstNameinput').prop('readonly',true);
			$('input#userLastNameinput').prop('readonly',true);
			$('input#userEmailinput').prop('readonly',true);
			$('input#userCityinput').prop('readonly',true);
			$('span.profilespan').fadeOut(3000);
		});
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

		if(qty==0){
			$(qtyclass).val(1);
			qty = 1;
		}
		
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

	$('.inputqty').on('blur',function(){
		var pID = $(this).parent().parent().data('pid');
		var qtyclass = '.quantity'+pID;
		var qty = parseInt($(qtyclass).val());

		$.ajax({
			url:'./lib/addtocart.php',
			method:'POST',
			data:{'pid':pID,'quantity':qty}
		}).done(function(data){
			$('span.totalprice').html(data);
		});
	});

	$('.plusbtn,.minusbtn').on('click',function(){
		var pID = $(this).parent().parent().parent().data('pid');
		var qtyclass = '.quantity'+pID;
		var qty = parseInt($(qtyclass).val());

		if(qty==0){
			$(this).parent().parent().siblings('.addtocart').toggleClass('d-none');
			$(this).parent().parent().toggleClass('d-none');
		}	

		$.ajax({
			url:'./lib/addtocart.php',
			method:'POST',
			data:{'pid':pID,'quantity':qty}
		}).done(function(data){
			$('span.totalprice').html(data);
		});
	});

	/*
 	 * Edit Cart
 	 */

 	$('.editinputqty').on('blur',function(){
 		var inputqty = $(this).val();
 		var subprice = $(this).parent().siblings('.subprice');
 		var unitprice = parseFloat($(this).parent().siblings('.unitprice').data('unitprice'));
 		var itemid = $(this).parent().parent().data('productid');
 		var newsubprice = inputqty * unitprice;
 		subprice.html("₱"+newsubprice);

 		var uprices = $('.unitprice');
 		var qtys = $('.editinputqty');
 		var totalprice = 0;

 		for (var i=0; i < uprices.length; i++) {
 			var uprice = uprices[i].attributes[1].value;
 			var qty = qtys[i].value;
 			var subtotal = uprice * qty;
 			totalprice += subtotal;
 		}

 		totalprice = totalprice.toLocaleString(undefined, {
		  minimumFractionDigits: 2,
		  maximumFractionDigits: 2
		});

 		$('.totalpricebot').html('₱'+totalprice);
 		

 		$.ajax({
			url:'./lib/addtocart.php',
			method:'POST',
			data:{'pid':itemid,'quantity':inputqty}
		}).done(function(data){
			$('span.totalprice').html(data);
		});
 	});
 	/*
 	 * Cart Buttons
 	 */

 	$('button.logincart').on('click',function(){
 		window.location.href = './login.php#mainnav';
 	});

 	$('button.registercart').on('click',function(){
 		window.location.href = './register.php#mainnav';
 	});

 	$('button.checkoutbtn').on('click',function(){
 		window.location.href = './checkout.php#mainnav';
 	});


 	/*
 	 * Delete Item on cart
 	 */
 	$('i.deletecartitem').on('click',function(){
 		var id = $(this).parent().parent().data('productid');
 		var container = $(this).parent().parent();
 		var qty = 0;
 		container.hide();

 		$.ajax({
 			url:'./lib/deletefromcart.php',
 			method:'POST',
 			data:{"id":id,"qty":qty}
 		}).done(function(data){
 			$('span.deletemessage').show();
 			$('span.deletemessage').html(data);
 			$('span.deletemessage').fadeOut(2500);
 		});

 		$.ajax({
 			url:'./lib/addtocart.php',
 			method:'POST',
 			data:{"pid":id,"quantity":qty}
 		}).done(function(data){
 			$('span.totalprice').html(data);
 			$('.totalpricebot').html(data);
 		});
 	});

});

// Checks if string is empty, return true if empty
function isEmpty(str) {
    return (!str || str.length == 0);
}

//adding quantity to specific cart item
function plus(id){
	var qtyclass = '.quantity'+id;
	$(qtyclass).val(parseInt($(qtyclass).val())+1);
}

//subtracting quantity to specific cart item
function minus(id){
	var qtyclass = '.quantity'+id;
	$(qtyclass).val(parseInt($(qtyclass).val())-1);
}


