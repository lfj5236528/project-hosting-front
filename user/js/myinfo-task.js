$("document").ready(function(){

//时间戳转时间
function add0(m){return m<10?'0'+m:m }
function format(shijianchuo)
{
    if(!shijianchuo){

        return " ";
    }
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

function showMyTask(){

$("#myinfoTaskBody").text("");


$.ajax({
	url:backUrl+"/api/web/task/my-task",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
	success:function(obj){
        var result = obj.result;


        result.map(function(value,index){

            var extra =JSON.parse (value.projectTask.extraJson);
            var str ='<tr><td>'+value.projectTask.name+'</td><td>'+value.projectTask.descMessage+'</td><td>'+value.status+'</td><td>'+value.projectName+'</td><td>'+extra.parentName+'</td><td>'+format(value.projectTask.createdAt)+'</td>'
            +'<td>'+format(value.projectTask.endedAt)+'</td><td>'+format(extra.finishDate)+'</td><td>'+value.userNames+'</td><td><a href="#" value="'+value.projectTask.id+'" class="finishClass">完成任务</a></td></tr>';

             $("#myinfoTaskBody").append(str);


        })
        $("#count").text(result.length);

	}

});	



}

showMyTask();


$("#MyTaskDiv").delegate(".finishClass","click",function(e){

var target =$(e.target);
var taskId = target.attr("value");



$.ajax({
	url:backUrl+"/api/web/task/finish",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
       data:{
           "taskId":taskId
       },
    crossDomain: true,
	success:function(obj){
		
		alert(obj.message);

	}

});	



})





})