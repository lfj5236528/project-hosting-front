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



$("#projectSelect").change(function(){
    var parentId = $("#projectSelect").val();
    var status =0;

    $.ajax({
	url:backUrl+"/api/web/task/find-by-status",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "parentId":parentId,
        "status":status
    },
    success:function(obj){
        $("#FailedTaskBody").text("");
        var arr =obj.result;
        arr.map(function(value,index){
            var extras =JSON.parse(value.extraJson);
            var userStr="";
        $.ajax({
            url:backUrl+"/api/web/task/find-users",
            type:"GET",
            dataType:"json",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data:{
                "id":value.id
            },
            success:function(content){
                var users=content.result.users;
                users.map(function(user,i){
                userStr=userStr+user.name+",";
            })
                userStr=userStr.substring(0,userStr.length-1);
                 var str='<tr><td style="color:#0000FF;">'+value.name+'</td><td style="color:#0000FF;">'+value.descMessage+'</td><td style="color:#0000FF;">'+extras.parentName+'</td><td style="color:#0000FF;">'
            +format(value.endedAt)+'</td><td style="color:#0000FF;">'+extras.outDays+'天</td><td style="color:#7D26CD;">'+userStr+'</td></tr>';
            $("#FailedTaskBody").append(str);

                }
            

            }); 

        })
        $("#count").text(arr.length);

        }

    }); 


})





});