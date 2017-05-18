

$("document").ready(function(){

function findProjectByCreaterId(){
	$.ajax({
	url:backUrl+"/api/web/projects/findByCreaterId",
	type:"GET",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    success:function(obj){
        var arr = obj.result;
        if(arr.length>0){
        $("#projectSelect").text("");   
        $("#projectSelect").append('<option value=0>请选择项目</option>'); 
        arr.map(function(value,index) {
        var str ='<option value='+(index+1)+' class="projectSelectItem" >'+value.name+"</option>";
        $("#projectSelect").append(str); 

        });
        }
    }

})}
findProjectByCreaterId();

});

