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


function showDiscussInfo(){

$.ajax({
	url:backUrl+"/api/web/posts/find-all",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    success:function(obj){
        var arr =obj.result;
        $("#discussBodyDiv").text("");
        arr.map(function(value,index){

            var title =value.title;
            var content =value.content;
            var id =value.id;
            var userName =value.userName;
            var createDate =format(value.createdAt);
            var replys =JSON.parse(value.replyInfo);


            var head='<div class="panel panel-success"><div class="panel-heading" style="position:relative;"><h3 class="panel-title">'+title+'<span style="position: absolute;right:30px; font-size:5px; top:14px; padding-right:80px; color: #32CD32">'
            +'发布时间:'+createDate+'&nbsp;&nbsp;发布人:'+userName+' </span><a href="#" style="position: absolute;right:40px; font-size:15px; top:14px;" data-toggle="modal" data-target="#replyModal" value="'+title+'" id="'+id+'" class="replyClass">'
            +'回复此贴</a><a href="#" style="position: absolute;right:10px;top:13px;"><span class="glyphicon glyphicon-chevron-down discussDetailA"  value="'+id+'"index="0"></span></a></h3></div>';
            
            var detail='<div class="panel-body" hidden="true" id="discussDetailContentDiv'+id+'"><p style="color: #32CD32">主题内容</p><hr style="margin-top: -7px;"><div id="discussContentDiv">'
            +content+'</div>';
            var reply='<div id="discussReplyDiv" style="margin-top:20px;"><p style="color: #32CD32">回复评论</p><hr style="margin-top: -7px;">';
            if(replys){
              replys.map(function(replyValue,i){
                var str='<dl id="replyItem"><dt class="comment_head" floor="7">'+replyValue.number+'楼<span class="user"><a class="username" target="_blank">  '+replyValue.userName+'</a><span class="ptime">  '+format(replyValue.replayDate)+' 发表</span> '
                +'</span></dt><dd class="comment_body">'+replyValue.content+'</dd></dl>';
                     reply=reply+str;

            })
            }
           
           
            reply=reply+'</div>';

           $("#discussBodyDiv").append(head+detail+reply+'</div>');

        })
        $("#count").text(arr.length);
       
        }

    }); 



}


showDiscussInfo();




$("#discussBodyDiv").delegate(".replyClass","click",function(e){
var target = $(e.target);
var title =target.attr("value");
var postId =target.attr("id");

$("#replyTitle").text(title);

$("#replyTitle").attr("postId",postId);







})

$("#publishNoteButton").click(function(){
var postId=$("#replyTitle").attr("postId");
var content =$("#replyContent").val();
$("#replyContent").val("");

$.ajax({
	url:backUrl+"/api/web/posts/reply",
	type:"POST",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
       data:{
        "postId":postId,
        "content":content
       },
    crossDomain: true,
    success:function(obj){
    
       alert(obj.message);
        }

    });



})



$("#discussBodyDiv").delegate(".discussDetailA","click",function(e){
var target = $(e.target);
var id =target.attr("value");
var index =target.attr("index");
var dom='#discussDetailContentDiv'+id;
if(index==0){
$(dom).show();
target.attr("class","glyphicon glyphicon-chevron-up discussDetailA");
target.attr("index","1");
}
if(index==1){
$(dom).hide();
target.attr("class","glyphicon glyphicon-chevron-down discussDetailA");
target.attr("index","0");

}

})


$("#publishPostButton").click(function(){
var title =$("#postTitle").val();
var content =$("#postContent").val();
console.log("cccc",title,content);


$.ajax({
	url:backUrl+"/api/web/posts/create",
	type:"POST",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
       data:{
        "title":title,
        "content":content
       },
    crossDomain: true,
    success:function(obj){
    
       alert(obj.message);
        }

    });


$("#postTitle").val("");
$("#postContent").val("");


});



});