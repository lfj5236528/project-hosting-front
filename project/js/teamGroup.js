

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



//编辑团队并获取团队成员
$("#ProjectTeamGroupDiv").delegate(".updateProjectTeamGroupButtonClass","click",function(e){
var target = $(e.target);
$("#updateProjectgroupId").val(target.attr("value"));
var id =$("#updateProjectgroupId").val();
findGroupUser("updateProjectTeamUserDiv","update",id);
findAllUser("updateProjectTeamAddUserDiv","delete",id);
findGroupInfo("updateProjectTeamUserDiv","update",id);




});






//查看团队
$("#ProjectTeamGroupDiv").delegate(".viewProjectTeamGroupButtonClass","click",function(e){

var target = $(e.target);
$("#updateProjectgroupId").val(target.attr("value"));
var id =$("#updateProjectgroupId").val();
findGroupInfo("viewProjectTeamUserDiv","view",id);
findGroupUser("viewProjectTeamUserDiv","view",id);
findAllUser("viewProjectTeamAddUserDiv","view",id);

});




//创建新的团队
function createTeamGroup(){
 
 var obj={};
 obj.name=$("#createProjectTeamName").val();
 obj.descMessage=$("#createProjectTeamDesc").val();
 obj.leaderId=$("#createProjectTeamLeaderId").val();
 obj.createdAt=$("#createProjectTeamDate").val();
 obj.parentId=$("#createProjectTeamOfProjectId").val();
 var arr=$("#createProjectTeamUserDiv").children("a");
 var array=[];

for(var i =0 ;i<arr.length;i++){
    array.push($(arr.get(i)).attr("value"));
}
  
obj.membersIds=JSON.stringify(array);
$.ajax({
	url:backUrl+"/api/web/project/group/create-root",
	type:"POST",
	dataType:"json",
    contentType:"application/json",
	xhrFields: {
           withCredentials: true
       },
     data:JSON.stringify(obj),  
    crossDomain: true,
     success:function(res){
var projectId = $("#projectSelect").val();

$.ajax({
	url:backUrl+"/api/web/projects/add-group",
	type:"POST",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
     data:{
        "id":projectId
     },  
    crossDomain: true,
    success:function(res){
        console.log("message",res.message);
    
    }

});


       alert(res.message);
    }

});




}





//编辑团队

function updateTeamGroup(groupId){
 
 var obj={};
 obj.id=groupId;
 obj.name=$("#updateProjectTeamName").val();
 obj.descMessage=$("#updateProjectTeamDesc").val();
 obj.leaderId=$("#updateProjectTeamLeaderId").val();
 obj.createdAt=$("#updateProjectTeamDate").val().substring(0,$("#updateProjectTeamDate").val().length);
 obj.parentId=$("#updateProjectTeamOfProjectId").val();
 var arr=$("#updateProjectTeamUserDiv").children("a");
 var array=[];

for(var i =0 ;i<arr.length;i++){
    array.push($(arr.get(i)).attr("value"));
}
  
obj.membersIds=JSON.stringify(array);
$.ajax({
	url:backUrl+"/api/web/project/group/update",
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

}


//删除团队

$("#ProjectTeamGroupDiv").delegate(".deleteProjectTeamButtonClass","click",function(e){
     var target = $(e.target);
     var groupId = target.attr("value");

     $.ajax({
	url:backUrl+"/api/web/project/group/delete",
	type:"POST",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
     data:{
         "groupId":groupId
     },  
    crossDomain: true,
    success:function(res){
       alert(res.message);
    }

});




})

//查找当前团队基本信息

function findGroupInfo(domId,nameSpace,groupId){
$.ajax({
	url:backUrl+"/api/web/project/group/find-by-id",
	type:"GET",
	dataType:"json",
    contentType:"application/json",
	xhrFields: {
           withCredentials: true
       },
    data:{
    "groupId":groupId
    },
    crossDomain: true,
    success:function(obj){
       obj =obj.result;
     $("#"+nameSpace+"ProjectTeamName").val(obj.name);
     $("#"+nameSpace+"ProjectTeamDesc").val(obj.descMessage);
     $("#"+nameSpace+"ProjectTeamLeaderName").val(obj.parentId);
     $("#"+nameSpace+"ProjectTeamDate").val(format(obj.createdAt));
        
    }

});

}



//查找当前团队的用户
function findGroupUser(domId,nameSpace,groupId){
$.ajax({
	url:backUrl+"/api/web/project/group/users",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    data:{
    "groupId":groupId
    },
    crossDomain: true,
    success:function(obj){
        var arr = obj.result;
        if(arr.length>0){
        $("#"+domId).text("");    
        arr.map(function(value,index) {

        var str ='<a href="#" class="list-group-item ' +nameSpace+'ProjectUserA" value='+value.id+' id="'+nameSpace+'ProjectTeamDeleteUser'+value.id+'">'+value.name+'</a>';
         $("#"+domId).append(str); 

        });
        }
    }

});

    
}



//获取所有用户
function findAllUser(domId,nameSpace,pid){
    if(!pid){
	$.ajax({
	url:backUrl+"/api/web/users/findAll",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    success:function(obj){
        var arr = obj.result;
        console.log(arr);
        if(arr.length>0){
        $("#"+domId).text("");    
        arr.map(function(value,index) {

        var str ='<a href="#" class="list-group-item '+nameSpace +'ProjectAddUserA" value='+value.id+' id=selectUser'+value.id+'>'+value.name+'</a>';
         $("#"+domId).append(str); 

        });
        }
    }

    }); 

    }else{


    $.ajax({
	url:backUrl+"/api/web/users/findAll",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
       data:{
           "groupId":pid
       },
    crossDomain: true,
    success:function(obj){
        var arr = obj.result;
        console.log(arr);
        if(arr.length>0){
        $("#"+domId).text("");    
        arr.map(function(value,index) {

        var str ='<a href="#" class="list-group-item '+nameSpace +'ProjectAddUserA" value='+value.id+' id=selectUser'+value.id+'>'+value.name+'</a>';
         $("#"+domId).append(str); 

        });
        }
    }

    }); 



    }




}


function init(){

//初始化模态框的，todo

}


//新建团队

//新建团队添加队员
$("#createProjectTeamButton").click(function(){

$("#createProjectTeamName").val("");
$("#createProjectTeamDesc").val("");
$("#createProjectTeamUserDiv").text("");
findAllUser("createProjectTeamAddUserDiv","create");
});

$("#createProjectTeamAddUserDiv").delegate(".createProjectAddUserA","click",function(e){
     var target = $(e.target);
 
    
    
    $("#createProjectTeamAddUserIdInput").val(target.attr("value"));
    $("#createProjectTeamAddUserIdInput").attr("selectDomId",target.attr("id"));

});

$("#createProjectTeamAddUserButton").click(function(){
 var domId=$("#createProjectTeamAddUserIdInput").attr("selectDomId");
 var objDom=$("#"+domId);
 var str='<a href="#" class="list-group-item createProjectUserA" value='+objDom.attr("value")+' id="createProjectTeamDeleteUser'+objDom.attr("value")+'">'+objDom.text()+'</a>';
 $("#createProjectTeamUserDiv").append(str);
 objDom.remove();
});

//新建团队删除队员

$("#createProjectTeamUserDiv").delegate(".createProjectUserA","click",function(e){
    
     var target = $(e.target);
    $("#createProjectTeamUserIdInput").val(target.attr("value"));
    $("#createProjectTeamUserIdInput").attr("selectDomId",target.attr("id"));
  

});

$("#createProjectTeamDeleteUserButton").click(function(){
 var domId=$("#createProjectTeamUserIdInput").attr("selectDomId");
 var objDom=$("#"+domId);
 var str='<a href="#" class="list-group-item createProjectAddUserA" value='+objDom.attr("value")+' id="createProjectTeamSelectUser"'+objDom.attr("value")+'>'+objDom.text()+'</a>';
 $("#createProjectTeamAddUserDiv").append(str);
objDom.remove();
});


$("#createProjectTeamGroupButton").click(function(){
    createTeamGroup();
});






//编辑团队




$("#updateProjectTeamAddUserDiv").delegate(".deleteProjectAddUserA","click",function(e){
     var target = $(e.target);
    $("#updateProjectTeamAddUserIdInput").val(target.attr("value"));
    $("#updateProjectTeamAddUserIdInput").attr("selectDomId",target.attr("id"));

});

$("#updateProjectTeamAddUserButton").click(function(){
 var domId=$("#updateProjectTeamAddUserIdInput").attr("selectDomId");
 var objDom=$("#"+domId);
 var str='<a href="#" class="list-group-item updateProjectUserA" value='+objDom.attr("value")+' id="updateProjectTeamDeleteUser"'+objDom.attr("value")+'>'+objDom.text()+'</a>';
 $("#updateProjectTeamUserDiv").append(str);
objDom.remove();
});

//编辑团队删除队员

$("#updateProjectTeamUserDiv").delegate(".updateProjectUserA","click",function(e){
   
     var target = $(e.target);
    $("#updateProjectTeamUserIdInput").val(target.attr("value"));
    $("#updateProjectTeamUserIdInput").attr("selectDomId",target.attr("id"));
  

});

$("#updateProjectTeamDeleteUserButton").click(function(){
 var domId=$("#updateProjectTeamUserIdInput").attr("selectDomId");
 var objDom=$("#"+domId);
 var str='<a href="#" class="list-group-item deleteProjectAddUserA" value='+objDom.attr("value")+' id="updateProjectTeamSelectUser"'+objDom.attr("value")+'>'+objDom.text()+'</a>';
 $("#updateProjectTeamAddUserDiv").append(str);
objDom.remove();
});

$("#updateProjectTeamGroupButton").click(function(){
    
    updateTeamGroup($("#updateProjectgroupId").val());
});








$("#projectSelect").change(function(){

var projectId = $("#projectSelect").val();

$.ajax({
	url:backUrl+"/api/web/projects/find-group",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
       data:{
        "id":projectId
       },
    crossDomain: true,
    success:function(obj){
        var arr = obj.result;
        if(arr.length>0){
       
        $("#ProjectTeamBody").text("");    
        arr.map(function(value,index) {

        var name='<td style="color:#0000FF;">'+value.name+'</td>'
        var desc ='<td style="color:#0000FF;">'+value.descMessage+'</td>';


        var operate ='<td><a href="#" style="font-size:10px;"  data-toggle="modal" data-target="#viewProjectTeamInfo" value="'+value.id+'" class="viewProjectTeamGroupButtonClass" id="viewProjectTeamGroupButton">'
        +'查看团队</a><br><a href="#" style="font-size:10px;"  data-toggle="modal" data-target="#updateProjectTeamInfo" value="'+value.id+'" class="updateProjectTeamGroupButtonClass" id="updateProjectTeamButton">编辑团队</a><br><a href="#" style="font-size:10px;" class="deleteProjectTeamButtonClass"  value="'+value.id+'">删除团队</a></td>';

        var str ='<tr>'+name+desc+operate+'</tr>';




        $("#ProjectTeamBody").append(str); 
        $("#count").text(arr.length);

        });
        }
    }

});


});

});

