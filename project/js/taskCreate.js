$("document").ready(function(){


//时间戳转时间
function add0(m){return m<10?'0'+m:m }
function format(shijianchuo)
{
//shijianchuo是整数，否则要parseInt转换
var time = new Date(shijianchuo);
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}


function findChildTasks(domId,modelId){


$.ajax({
	url:backUrl+"/api/web/task/find-child-tasks",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "parentId":modelId
    },
    success:function(obj){
      
        }
    

    }); 


};







//获取项目下的所有模块
$("#projectSelect").change(function(){

var projectId = $("#projectSelect").val();


$.ajax({
	url:backUrl+"/api/web/task/find-project-models",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "projectId":projectId
    },
    success:function(obj){
        var  arr = obj.result;
        $("#ProjectModelBody").text("");
        arr.map(function(value,index){
            var str ='<tr ><td style="color:#0000FF;">'+value.name+'</td><td style="color:#0000FF;">'+value.descMessage+'</td>'
            +'<td><a href="#" style="font-size:10px;"  data-toggle="modal" data-target="#viewTaskModelInfo" class="viewTaskModelInfoButton" value="'+value.id+'">查看任务模块</a><br><a href="#" style="font-size:10px;"  data-toggle="modal" data-target="#updateTaskModelInfo" class="updateTaskModelInfoButton" value="'+value.id+'">编辑任务模块</a>'
            +'<br><a href="#" style="font-size:10px;" class="deleteTaskModelInfoButton" value="'+value.id+'" >删除任务模块</a></td>';
            $("#ProjectModelBody").append(str);

        });
        $("#count").text(arr.length);

        }
    

    }); 





});







//外部新建任务模块按钮
$("#createTaskModelPrimaryButton").click(function(){

$("#TaskModelName").val("");
$("#TaskModelDesc").val("");


});






//创建任务模块

$("#createTaskModelButton").click(function(){

var name = $("#TaskModelName").val();
var descMessage = $("#TaskModelDesc").val();
var projectId = $("#projectSelect").val();
$.ajax({
	url:backUrl+"/api/web/task/create-model",
	type:"POST",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
      data:{
           "name":name,
           "descMessage":descMessage,
           "projectId":projectId
       },
    crossDomain: true,
    success:function(obj){
        alert(obj.message);
    }

    }); 
 });


//任务模块查看

$("#ProjectModelBody").delegate(".viewTaskModelInfoButton","click",function(e){
var target = $(e.target);
var modelId = target.attr("value");

$.ajax({
	url:backUrl+"/api/web/task/find-model-info",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "modelId":modelId
    },
    success:function(obj){
        var info = obj.result;
        var arr =info.projectTasks;

        $("#viewTaskModelInfoName").val(info.name);
        $("#viewTaskModelInfoDesc").val(info.descMessage);
        $("#viewTaskModelInfoCreaterName").val(info.createrName);
        $("#viewTaskModelInfoOfProject").val(info.projectId);
        $("#viewTaskModelInfoCreateDate").val(format(info.createdDate));
        $("#viewTaskModelInfoChildTaskDiv").text("");

        arr.map(function(value,index){

            var str ='<a href="#" class="list-group-item childTask" value="'+value.id+'">'+value.name+'</a>'
            $("#viewTaskModelInfoChildTaskDiv").append(str);


        });


      
        }
    
    }); 


})

//查看子任务点击存放ID
$("#viewTaskModelInfoChildTaskDiv").delegate(".childTask","click",function(e){
var target = $(e.target);
$("#viewChildTaskIdInput").val(target.attr("value"));

})



//查看子任务查看
$("#viewChildTaskButton").click(function(){

var taskId = $("#viewChildTaskIdInput").val();


$.ajax({
	url:backUrl+"/api/web/task/find-by-id",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "id":taskId
    },
    success:function(obj){

        var result = obj.result.projectTask;
        var des=obj.result.statusDesc;

        var extras =JSON.parse(result.extraJson);
        $("#viewChildTaskInfoName").val(result.name);
        $("#viewChildTaskInfoDesc").val(result.descMessage);
        $("#viewChildTaskInfoCreaterName").val(extras.createrName);
        $("#viewChildTaskInfoOfProject").val(result.projectId);
        $("#viewChildTaskInfoName").val(result.name);
        $("#viewChildTaskInfoStatus").val(des);
        $("#viewChildTaskInfoCreateDate").val(format(result.createdAt));
        $("#viewChildTaskInfoEndDate").val(format(result.endedAt));

        }

    }); 




    $.ajax({
	url:backUrl+"/api/web/task/find-users",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "id":taskId
    },
    success:function(obj){

        var users = obj.result.users;
        var canAddUsers = obj.result.canAddUsers;

        $("#viewChildTaskInfoCanAddUsersDiv").text("");
        $("#viewChildTaskInfoUsersDiv").text("");

        canAddUsers.map(function(value,index){
            var str='<a href="#" class="list-group-item" >'+value.name+'</a>';
            $("#viewChildTaskInfoCanAddUsersDiv").append(str);

        })

        users.map(function(value,index){
            var str='<a href="#" class="list-group-item" >'+value.name+'</a>';
            $("#viewChildTaskInfoUsersDiv").append(str);

        })
     
        }

    }); 






});



//编辑任务模块
$("#ProjectModelBody").delegate(".updateTaskModelInfoButton","click",function(e){
    var target =$(e.target);
    var modelId =target.attr("value");
    $("#updateProjectTaskModelId").val(modelId);

$.ajax({
	url:backUrl+"/api/web/task/find-model-info",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "modelId":modelId
    },
    success:function(obj){
        var info = obj.result;
        var arr =info.projectTasks;

        $("#updateTaskModelInfoName").val(info.name);
        $("#updateTaskModelInfoDesc").val(info.descMessage);
        $("#updateTaskModelInfoCreaterName").val(info.createrName);
        $("#updateTaskModelInfoOfProject").val(info.projectId);
        $("#updateTaskModelInfoCreateDate").val(format(info.createdDate));
        $("#updateTaskModelInfoChildTaskDiv").text("");

        arr.map(function(value,index){

            var str ='<a href="#" class="list-group-item childTask" value="'+value.id+'">'+value.name+'</a>'
            $("#updateTaskModelInfoChildTaskDiv").append(str);

        });

        }
    
    });


})


//任务模块删除

$("#ProjectModelBody").delegate(".deleteTaskModelInfoButton","click",function(e){
var target = $(e.target);

var taskId=target.attr("value");

$.ajax({
	url:backUrl+"/api/web/task/delete-model",
	type:"POST",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "taskId":taskId
    },
    success:function(obj){

       alert(obj.message);
     
        }

    }); 


})


//编辑子任务存放ID
$("#updateTaskModelInfoChildTaskDiv").delegate(".childTask","click",function(e){
var target = $(e.target);
$("#updateChildTaskIdInput").val(target.attr("value"));

})

//编辑子任务查看

$("#updateViewChildTaskButton").click(function(){

var taskId = $("#updateChildTaskIdInput").val();


$.ajax({
	url:backUrl+"/api/web/task/find-by-id",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "id":taskId
    },
    success:function(obj){

        var result = obj.result.projectTask;
        var des=obj.result.statusDesc;

        var extras =JSON.parse(result.extraJson);
        $("#viewChildTaskInfoName").val(result.name);
        $("#viewChildTaskInfoDesc").val(result.descMessage);
        $("#viewChildTaskInfoCreaterName").val(extras.createrName);
        $("#viewChildTaskInfoOfProject").val(result.projectId);
        $("#viewChildTaskInfoName").val(result.name);
        $("#updateUpdateChildTaskInfoStatus").val(des);
        $("#viewChildTaskInfoCreateDate").val(format(result.createdAt));
        $("#viewChildTaskInfoEndDate").val(format(result.endedAt));

        }

    }); 




    $.ajax({
	url:backUrl+"/api/web/task/find-users",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "id":taskId
    },
    success:function(obj){

        var users = obj.result.users;
        var canAddUsers = obj.result.canAddUsers;

        $("#viewChildTaskInfoCanAddUsersDiv").text("");
        $("#viewChildTaskInfoUsersDiv").text("");

        canAddUsers.map(function(value,index){
            var str='<a href="#" class="list-group-item" >'+value.name+'</a>';
            $("#viewChildTaskInfoCanAddUsersDiv").append(str);

        })

        users.map(function(value,index){
            var str='<a href="#" class="list-group-item" >'+value.name+'</a>';
            $("#viewChildTaskInfoUsersDiv").append(str);

        })
     
        }

    }); 



})



//编辑子任务编辑


$("#updateUpdateChildTaskButton").click(function(){
var taskId = $("#updateChildTaskIdInput").val();


$.ajax({
	url:backUrl+"/api/web/task/find-by-id",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "id":taskId
    },
    success:function(obj){

        var result = obj.result.projectTask;
        var des=obj.result.statusDesc;

        var extras =JSON.parse(result.extraJson);
        $("#updateUpdateChildTaskInfoName").val(result.name);
        $("#updateUpdateChildTaskInfoDesc").val(result.descMessage);
        $("#updateUpdateChildTaskInfoCreaterName").val(extras.createrName);
        $("#updateUpdateChildTaskInfoOfProject").val(result.projectId);
        $("#updateUpdateChildTaskInfoName").val(result.name);
        $("#updateUpdateChildTaskInfoStatus").val(des);
        $("#updateUpdateChildTaskInfoCreateDate").val(format(result.createdAt));
        $("#updateUpdateChildTaskInfoEndDate").val(format(result.endedAt));

        }

    }); 




    $.ajax({
	url:backUrl+"/api/web/task/find-users",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "id":taskId
    },
    success:function(obj){

        var users = obj.result.users;
        var canAddUsers = obj.result.canAddUsers;

        $("#updateUpdateChildTaskInfoCanAddUsersDiv").text("");
        $("#updateUpdateChildTaskInfoUsersDiv").text("");

        canAddUsers.map(function(value,index){
            var str='<a href="#" class="list-group-item canAddUserA" id="canAddUserA'+value.id+'" value="'+value.id+'">'+value.name+'</a>';
            $("#updateUpdateChildTaskInfoCanAddUsersDiv").append(str);

        })

        users.map(function(value,index){
            var str='<a href="#" class="list-group-item userA" id="userA'+value.id+'" value="'+value.id+'">'+value.name+'</a>';
            $("#updateUpdateChildTaskInfoUsersDiv").append(str);

        })
     
        }

    }); 



});

//编辑子任务删除

$("#updateDeleteChildTaskButton").click(function(){
var taskId = $("#updateChildTaskIdInput").val();

$.ajax({
	url:backUrl+"/api/web/task/delete-child",
	type:"POST",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "taskId":taskId
    },
    success:function(obj){

       alert(obj.message);
     
        }

    }); 



})





//编辑子任务编辑确定

$("#updateUpdateChildTaskSubmitButton").click(function(){


var taskId = $("#updateChildTaskIdInput").val();


var obj={};

obj.id=taskId;
obj.name=$("#updateUpdateChildTaskInfoName").val();

obj.descMessage=$("#updateUpdateChildTaskInfoDesc").val();

obj.endedDate=$("#updateUpdateChildTaskInfoEndDate").val();

 var arr=$("#updateUpdateChildTaskInfoUsersDiv").children("a");
 var array=[];

for(var i =0 ;i<arr.length;i++){
    array.push($(arr.get(i)).attr("value"));
}
  
obj.userId=JSON.stringify(array);
$.ajax({
	url:backUrl+"/api/web/task/update",
	type:"POST",
	dataType:"json",
    contentType:"application/json",
	xhrFields: {
           withCredentials: true
       },
     data:JSON.stringify(obj),  
    crossDomain: true,
    success:function(res){
       alert(res.message);
    }

});




})




//编辑子任务选择成员标识ID

$("#updateUpdateChildTaskInfoUsersDiv").delegate(".userA","click",function(e){
var target = $(e.target);
$("#updateChildTaskhadUserInputId").val(target.attr("value"));
})

//编辑子任务添加用户
$("#updateUpdateChildTaskInfoAddUserButton").click(function(){

var userId=$("#updateChildTaskCanAddUserInputId").val();

var domId='canAddUserA'+userId;

var userName=$("#"+domId).text();

var str='<a href="#" class="list-group-item userA" id="userA'+userId+'" value="'+userId+'">'+userName+'</a>';


$("#updateUpdateChildTaskInfoUsersDiv").append(str);

$("#"+domId).remove();



})


//编辑子任务选择可添加成员标识ID

$("#updateUpdateChildTaskInfoCanAddUsersDiv").delegate(".canAddUserA ","click",function(e){
var target = $(e.target);
$("#updateChildTaskCanAddUserInputId").val(target.attr("value"));
})



//编辑子任务移除用户
$("#updateUpdateChildTaskInfoRemoveUserButton").click(function(){

var userId=$("#updateChildTaskhadUserInputId").val();

var domId='userA'+userId;

var userName=$("#"+domId).text();
var str='<a href="#" class="list-group-item canAddUserA" id="canAddUserA'+userId+'" value="'+userId+'">'+userName+'</a>';


$("#updateUpdateChildTaskInfoCanAddUsersDiv").append(str);

$("#"+domId).remove();



})



//新建子任务


$("#updateCreateChildTaskButton").click(function(){


 $.ajax({
	url:backUrl+"/api/web/task/find-users",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    success:function(obj){

       
        var canAddUsers = obj.result.canAddUsers;

        $("#createChildTaskHadAddUserDiv").text("");
        $("#createChildTaskCanAddUserDiv").text("");

        canAddUsers.map(function(value,index){
            var str='<a href="#" class="list-group-item createCanAddUser" value="'+value.id+'" id="createCanAddUserA'+value.id+'" >'+value.name+'</a>';
            $("#createChildTaskCanAddUserDiv").append(str);

        })

      
     
        }

    }); 

})

//新建子任务添加用户标识ID

$("#createChildTaskCanAddUserDiv").delegate(".createCanAddUser","click",function(e){
var target = $(e.target);
$("#createChildTaskCanAddUserIdInput").val(target.attr("value"));
})

//新建子任务添加用户
$("#createChildTaskAddUserButton").click(function(){

var userId=$("#createChildTaskCanAddUserIdInput").val();

var domId='createCanAddUserA'+userId;

var userName=$("#"+domId).text();

var str='<a href="#" class="list-group-item createHadAddUser" id="createHadAddUserA'+userId+'" value="'+userId+'">'+userName+'</a>';


$("#createChildTaskHadAddUserDiv").append(str);

$("#"+domId).remove();



})

//新建子任务移除用户标识ID

$("#createChildTaskHadAddUserDiv").delegate(".createHadAddUser","click",function(e){
var target = $(e.target);
$("#createChildTaskHadUserIdInput").val(target.attr("value"));
})


//新建子任务移除用户
$("#createChildTaskRemoveUserButton").click(function(){

var userId=$("#createChildTaskHadUserIdInput").val();

var domId='createHadAddUserA'+userId;

var userName=$("#"+domId).text();

var str='<a href="#" class="list-group-item createCanAddUser" id="createCanAddUserA'+userId+'" value="'+userId+'">'+userName+'</a>';


$("#createChildTaskCanAddUserDiv").append(str);

$("#"+domId).remove();



})


//新建子任务确定
$("#createChildTaskSubmitButton").click(function(){

var obj ={};

obj.name =$("#createChildTaskName").val();
obj.descMessage =$("#createChildTaskDesc").val();
obj.endedDate =$("#createChildTaskEndDate").val();
obj.parentId=$("#updateProjectTaskModelId").val();
obj.projectId=$("#projectSelect").val();
 
 var arr=$("#createChildTaskHadAddUserDiv").children("a");
 var array=[];

for(var i =0 ;i<arr.length;i++){
    array.push($(arr.get(i)).attr("value"));
}
  
obj.userId=JSON.stringify(array);

$.ajax({
	url:backUrl+"/api/web/task/create-child",
	type:"POST",
	dataType:"json",
    contentType:"application/json",
	xhrFields: {
           withCredentials: true
       },
     data:JSON.stringify(obj),  
    crossDomain: true,
    success:function(res){
       alert(res.message);
    }

});



})





});
