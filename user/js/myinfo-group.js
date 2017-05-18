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

function showMyGroup(){

$("#myinfoGroupBody").text("");


$.ajax({
	url:backUrl+"/api/web/project/group/my-group",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
	success:function(obj){
        var result = obj.result;

        result.map(function(value,index){

            var str ='<tr><td>'+value.projectGroup.name+'</td><td>'+value.projectGroup.descMessage+'</td><td>'+value.projectNames+'</td><td>'+value.memberNames+'</td><td>'+format(value.projectGroup.createdAt)+'</td></tr>'
            $("#myinfoGroupBody").append(str);


        })
        $("#count").text(result.length);

	}

});	



}

showMyGroup();





})