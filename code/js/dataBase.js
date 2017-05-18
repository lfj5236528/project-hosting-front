$("document").ready(function(){


var temp=[];


//获取表信息
$("#getTableInfoButton").click(function(){
        var url =$("#dataBaseUrl").val();
    $.ajax({
        url:backUrl+"/api/web/db/code/table-info",
        type:"POST",
        dataType:"json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data:{
            "url":url
        },
        success:function(obj){
            var arr =obj.result;
            $("#tablesBody").text("");
            arr.map(function(table,index){
            temp.push(table);
            var str='<tr><td style="color:#0000FF;">'+table.tableName+'</td><td style="color:#0000FF;">'+table.tableDesc+'</td><td><a href="#" style="font-size:10px;"  data-toggle="modal" data-target="#viewTableInfo" class="tableInfoClass" value="'+index+'">查看该表详细信息</a><br><a href="#" style="font-size:10px;"  data-toggle="modal" data-target="#viewTableModelCodeInfo" class="createModelClass" value="'+index+'">生成Model代码</a></td>'
            $("#tablesBody").append(str);
 
           })
        $("#count").text(arr.length);
    

            } 

        }); 
    })


                    
	

 //查看表的详细信息

 $("#tableDiv").delegate(".tableInfoClass","click",function(e){
    var target = $(e.target);
    var index =target.attr("value");
    var obj = temp[index];
    var descs =obj.columnDescs;
    var names =obj.columnNames;
    var types =obj.columnTypes;
    var size =obj.columnSize;
    $("#tableInfoName").val(obj.tableName);
    $("#tableInfoDesc").val(obj.tableDesc);
    $("#tableInfoBody").text("");
       for(var i=0;i<parseInt(size);i++){

        var str='<tr><td>'+names[i]+'</td><td>'+types[i]+'</td><td>'+descs[i]+'</td><tr>';
       
        $("#tableInfoBody").append(str);

    }


 })   

 //生成模型代码

 
 $("#tableDiv").delegate(".createModelClass","click",function(e){
    var target = $(e.target);
    var index =target.attr("value");
    var obj = temp[index];
    var tableName = obj.tableName;
    var url =$("#dataBaseUrl").val();
    console.log("1111111111",url)

  
$.ajax({
	url:backUrl+"/api/web/db/code/model-code",
	type:"POST",
	dataType:"json",
	xhrFields: {
           withCredentials: true
       },
    crossDomain: true,
    data:{
        "tableName":tableName,
        "url":url
    },
    success:function(text){

        var result = text.result
        $("#modelCodeTextArea").text(result);

      

        }

    }); 




 })   



})