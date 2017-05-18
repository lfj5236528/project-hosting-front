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

function showMyArticles(){

$("#myinfoArticleBody").text("");


$.ajax({
	url:backUrl+"/api/web/notify/article/find-by-userId",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
	success:function(obj){
        var result = obj.result;


        result.map(function(value,index){

            var i = value.theme.indexOf("：");
            var style;
            if(value.theme.indexOf("截止")!=-1){
              style="即将到期";
            }
            if(value.theme.indexOf("逾期")!=-1){
              style="逾期任务";
            }
           var str='<tr><td>'+value.id+'</td><td>'+value.theme+'</td><td>'+style+'</td><td>'+value.theme.substr(i+1)+'</td><td>'+format(value.createdAt)+'</td><td>'+format(value.updatedAt)+'</td></tr>'

             $("#myinfoArticleBody").append(str);


        })
        $("#count").text(result.length);

	}

});	



}

showMyArticles();








})