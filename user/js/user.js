

$("document").ready(function(){


function checkUserLogin(){
	$.ajax({
	url:backUrl+"/api/web/users/check/login",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
	success:function(obj){
		
		if(obj.result!=null){
			var welcom="欢迎您回来";
			basicUser=obj.result;
			var str ='<li><a>'+welcom+'</a></li>'+'<li><a href="../user/myinfo.html"><span class="text-primary">'+basicUser.name+'</span></a></li>'+'<li><a href="#" style="color:#32CD32" class="logoutButton">注销</a></li><li><a href="#" > </a></li>';
			$("#userLoginUl").append(str);
			
		}else{
			var str = '<li><a href="#login-modal" data-toggle="modal"><span class="glyphicon glyphicon-log-in"></span>  登录</a></li>'+' <li><a href="#register-modal" data-toggle="modal"><span class="glyphicon glyphicon-user"></span>注册</a></li>'+'<li><a href="#"></a></li>';
			$("#userLoginUl").append(str);
			
		}
		
		if(myInfoTag==1){
			$("#myinfoName").text(basicUser.name);
			$("#myinfo-email").text(basicUser.email);
			$("#myinfo-mobile").text(basicUser.mobile);
			myInfoTag=0;
		}
		

	}

});	
	
}
checkUserLogin();




$("#userLoginUl").delegate(".logoutButton","click",function(){

	$.ajax({
	url:backUrl+"/api/web/users/logout",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
	success:function(obj){
		
		alert(obj.message);

	}

});	





});



$("#myInfoPasswordUpdateButton").click(function(){
	var oldPassword =$("#myinfo-update-old-password").val();
	var newPassword=$("#myinfo-update-new-password").val();
	$.ajax({
	url:backUrl+"/api/web/users/update-password",
	type:"POST",
	dataType:"json",
	data:{
		"oldPassword":oldPassword,
		"newPassword":newPassword
	},
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
	success:function(obj){
		alert(obj.message);
	}

});	
	
	
	
});


$("#myInfoEmailUpdateButton").click(function(){
	var email =$("#myinfo-update-new-email").val();

	$.ajax({
	url:backUrl+"/api/web/users/update-email",
	type:"POST",
	dataType:"json",
	data:{
		"email":email
	},
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
	success:function(obj){
		alert(obj.message);
	}

});	
	
	
	
});



$("#loginButton").click(function (){

	var userName = $("#loginUserName").val();
	var userPassWord = $("#loginUserPassword").val();
	
$.ajax({
	url:backUrl+"/api/web/users/login",
	type:"POST",
	dataType:"json",
	data:{
		"mobile":userName,
		"password":userPassWord
	},
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
	success:function(obj){
		$("#userLoginUl").empty();
		checkUserLogin();
		alert(obj.message);
	}

});	
	
});



$("#registerButton").click(function(){
			var mobile = $("#registerUserName").val();
			var userPassword = $("#registerUserPassword").val();
			var checkPassword = $("#registerCheckUserPassword").val();
			var mobileCode = $("#registerMobileCode").val();
			if(userPassword!=checkPassword){
				alert("password not match!");
			}
			else{
				$.ajax({
					url:backUrl+"/api/web/users/register",
					type:"POST",
					dataType:"json",
					data:{
						"mobile":mobile,
						"password":userPassword
					},
					xhrFields: {
						   withCredentials: true
					   },
					crossDomain: true,
					success:function(obj){
						alert(obj.message);
					}

				});		
			}
});







	
});

