/**
 * Created by xinyongjia on 2015/4/17.
 */
 
function TableLoad($table,dataJson)
{
    var data = dataJson;
	$table.bootstrapTable('load', data);
    $table.bootstrapTable({data: data});    
}
// 获取表格数据
function TableGetData($table)
{
    alert(JSON.stringify($table.bootstrapTable('getData')));
    return JSON.stringify($table.bootstrapTable('getData'));
}
//获取row的数据
function TableGetByRow($table,row)
{
    alert(JSON.stringify(row));
    return JSON.stringify(row);
}
//
function TableGetSelections($table)
{
    alert('getSelections: ' + JSON.stringify($table.bootstrapTable('getSelections')));
}

function TableHideItems($table,vis)
{
    var selects = $table.bootstrapTable('getSelections');
    if(selects.length==0)
    {
        alertError("未选中任何条目");
        return;
    }
    unSelectObject(true);
   //移除table数据
    ids = $.map(selects, function (row) { 
        if(oManageDiv.tabletype=="分组管理")
        {
            var group = curFloor.getGroupById(row['id']);
            groupVisibleChange(scene,curFloor,group.name,vis);
        }
        else
            objVisibleChange(scene,row['id'],vis);
        return row['id'];
    });    
    console.log("隐藏所选项：",ids);
    //TODO:场景、数据同步
}
function TableHideItem(row,vis)
{        
    //unSelectObject(true);
    if(oManageDiv.tabletype=="分组管理")
    {
        var group = curFloor.getGroupById(row['id']);
        groupVisibleChange(scene,curFloor,group.name,vis);  
    }
    else
    {
        objVisibleChange(scene,row['id'],vis);
        // INTERSECTED=scene.getObjectByModelId(row['id']).children[0];
        // selectObject(INTERSECTED);               
        selectObjectInTable(row['id']);   
    }
}

function TableHighLightItems($table,highlight)
{
    var mode="no";
    if(highlight==false)
    {
        unSelectObject(true);
        if(mode=="vis") setSceneVis(true);
        else setSceneHight(false);
        return;
    }
    var selects = $table.bootstrapTable('getSelections');
    if(selects.length==0)
    {
        alertError("未选中任何条目");
        return;
    }
    unSelectObject(true);
    if(mode=="vis") setSceneVis(false);
    else setSceneHight(true);
   //移除table数据
    ids = $.map(selects, function (row) { 
        if(oManageDiv.tabletype=="分组管理"&&osubManageDiv.style.display!="block")
        {
            var group = curFloor.getGroupById(row['id']);
            if(mode=="vis") groupVisibleChange(scene,curFloor,group.name,true);
            else highlightGroup(scene,curFloor,group.name,true);
        }
        else
        {
            if(mode=="vis") objVisibleChange(scene,row['id'],true);
            else highlightObject(scene,row['id'],true)
        }
        return row['id'];
    });  
}
function TableHighLightItem(row,highlight)
{     
    var mode="no";    
    //unSelectObject(true);
    if(mode=="vis") setSceneVis(!highlight);
    else setSceneHight(highlight);
    if(highlight==false)
        return;        
    if(oManageDiv.tabletype=="分组管理"&&osubManageDiv.style.display!="block")
    {
        var group = curFloor.getGroupById(row['id']);
        if(mode=="vis") groupVisibleChange(scene,curFloor,group.name,true);  
        else highlightGroup(scene,curFloor,group.name,true);
    }
    else
    {
        if(mode=="vis") objVisibleChange(scene,row['id'],true);
        else highlightObject(scene,row['id'],true);
        // INTERSECTED=scene.getObjectByModelId(row['id']).children[0];
        // selectObject(INTERSECTED); 
        selectObjectInTable(row['id']);        
    }
}

function TableAppend($table)
{
    TableHide($table);
    isBuildFromMngList=true;
    switch(oManageDiv.tabletype)
    {
        case "分组管理":            
            newGroup_docm("新建分组");
        break;
        case "区块管理":
            newBlock_docm("新建区块");
        break;
        case "测点管理":
            newMPoint_docm(document.getElementById("mpointLabelPic"),true);
        break;
    }
    //TODO:弹框
    //添加addDataJson到Grouplist数据
    //添加到$table中
    // $table.bootstrapTable('append', addDataJson);
    // TableShow();
}
function TableDetail(row,index)
{
    // alertError("开发中。。");
    // return;
 
    var id=row['id'];
    console.log("查看信息");
    switch(oManageDiv.tabletype)
    {
        case "分组管理":    
            //alertError("开发中。。");
            if(osubManageDiv.style.display=="block")
            {
                var obj= curFloor.getObjectById(row['id']);
                alertMsg(["",obj.info]);
                return;
            }
            var group = curFloor.getGroupById(row['id']);
            alertMsg(["",group.info]);
        return;
        break;
        case "区块管理":
        case "测点管理":
                var obj= curFloor.getObjectById(row['id']);
                alertMsg(["",obj.info]);
        break;
        
    }
}
function TableEdit(row,index)
{
    if(!params.mode_edit)
    {
        alertError("当前非编辑模式");
        return;
    }
    var id=row['id'];
    console.log("编辑信息");
    switch(oManageDiv.tabletype)
    {
        case "分组管理":  
            TableHide($table);
            curGroup = curFloor.getGroupById(id);
            subTableShow(curGroup.name);
        break;
        case "区块管理":
                //TableHide($table);
                selectObjectInTable(row['id']);            
        break;
        case "测点管理":   
                isBuildFromMngList=true;        
                TableHide($table);
                changeMPname_docm("更改测点ID",row);
                selectObjectInTable(row['id']);
                
        break;
    }
}
function selectObjectInTable(id)
{
    var op;
    if(oManageDiv.tabletype=="区块管理") op=0;                
    if(oManageDiv.tabletype=="测点管理") op=2;                
    INTERSECTED=scene.getObjectByModelId(id).children[0]; 
    blockparams.title=oManageDiv.tabletype.slice(0,-2);
    fillBlockUI(blockparams,INTERSECTED);
    if(guiBrand==null||guiBrand==undefined)
        initBlockUI(blockparams,op); 
    if(params.mode_edit)alertInfo("请在右上角的编辑界面中编辑"+blockparams.title);
}
function TableRemoveSelected($table)
{
   //根据selects.id为GroupId，删除Grouplist中的数据
    var selects = $table.bootstrapTable('getSelections');
   //移除table数据
    if(selects.length==0)
    {
        alertError("未选中任何条目");
        return;
    }
    ids = $.map(selects, function (row) { 
        return row['id'];
    });
    var ret=alertConfirm("删除 "+ids+" 吗？");
    if(ret==false) return;
    
    ids = $.map(selects, function (row) {        
        if(oManageDiv.tabletype=="分组管理")
        {
            curFloor.removeGroupById(row['id']);
        }
        else
            removeObjById(scene,curFloor,row['id']);
        return row['id'];
    });
    
    $table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
    console.log("删除所选项：",ids);
    //TODO:场景、数据同步
}
function TableRemoveById($table,id)
{
    //根据id为GroupId，删除Grouplist中的数据
    //移除table数据
    var ret=alertConfirm("删除 "+id+" 吗？");
    if(ret==false) return;
    ids = [id];
    $table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
    //TODO:数据、场景同步
    console.log("删除选项：",ids);
    if(oManageDiv.tabletype=="分组管理")
    {
        curFloor.removeGroupById(id);
    }
    else
        removeObjById(scene,curFloor,id);
}
//刷新表格
function TableRefresh($table)
{
    console.log("刷新列表");
    $table.bootstrapTable('refresh', {silent: true});
}

function TableDetory($table)
{
    $table.bootstrapTable('destroy');
}
// 隐藏表格
function TableHide($table)
{   
    lock_dock=false;
    fadeOut(iBase.Id('table_manage' ),1);
    //清理数据
    TableDetory($table);
}
// 显示表格
function TableShow(tabletype)
{    
    lock_dock=true;	
	unSelectObject(true);
    oManageDiv.tabletype=tabletype;
    TableDetory($table);
    fadeIn(iBase.Id('table_manage'));
    MoveFloatLayer('table_manage'); 
    var columDataFieldStrings=getTableDataField(tabletype);
    var columnNameStrings=getTableColumnNames(tabletype);
    var columNames=iBase.Id('tr_column');
    for(var item=0;item<columNames.childElementCount;item++)
    {
        if(columnNameStrings[item]!=undefined)
            columNames.children[item].innerHTML=columnNameStrings[item];
        if(columDataFieldStrings[item]!=undefined)
            columNames.children[item].setAttribute("data-field",columDataFieldStrings[item]);
    }
    oManageDiv.style.zIndex=2;
    oNewDiv.style.zIndex=1;
    iBase.Id("title-manage").innerHTML=tabletype;
    //获取数据
    var dataJson=getJsonDataOfTable(tabletype);
    //填充数据
    TableLoad($table,dataJson);
	TableRefresh($table);
    MoveFloatLayer('table_manage'); 
}
function asynTableData(row,field,submitValue)
{
    switch(curTable)
    {
        case 'title-manage-sub':
            if(field=='id')
            {
                var alertmsg;
                if(params.mode_edit==true)
                {
                    if(assertDuplicateId(submitValue,'curGroup',false))
                    {
                        if(!assertDuplicateId(submitValue,'curFloor',false))
                        {                        
                            curGroup.removeById(row[field]);
                            curGroup.addItem(submitValue);
                            return true;
                        }
                        else alertmsg="ID不存在";
                    }
                    else alertmsg="ID不能重复";     
                }        
                else alertmsg="当前非编辑模式";
                var dataJson=getJsonDataOfTable("分组内容");
                TableLoad($sub_table,dataJson);
                alertError(alertmsg);
                return false;
            }
        break;
        case 'title-manage':
            if(params.mode_edit==false)
            {
                var dataJson=getJsonDataOfTable(oManageDiv.tabletype);
                TableLoad($table,dataJson);
                alertError("当前非编辑模式");
                return false;
            }
            var title = iBase.Id("title-manage").innerHTML;
            if(field=='id')//改ID
            {
                var fromWherestr=getFromWhere(title);
                if(!assertDuplicateId(submitValue,fromWherestr,false))
                {
                    var dataJson=getJsonDataOfTable(oManageDiv.tabletype);
                    TableLoad($table,dataJson);
                    alertError("ID不能重复");
                    return false;
                }
                else
                {
                    if(title=="分组管理")
                    {
                        var obj=curFloor.getGroupById(row[field]);
                        obj.id=submitValue;
                    }
                    else
                    {
                        if(curFloor.changeObjectId(row[field],submitValue)==false)
                        {
                            var dataJson=getJsonDataOfTable(oManageDiv.tabletype);
                            TableLoad($table,dataJson);
                            alertError("ID不能重复");
                            return false;
                        }
                        var objsc=scene.getObjectByModelId(row[field]);
                        objsc.modelid=submitValue;                        
                    }
                }
            }
            else if(field=='infoShort')
            {
                if(title=="分组管理")
                {
                    var obj=curFloor.getGroupById(row['id']);
                    obj['info']=submitValue;
                    obj['infoShort']=submitValue.slice(0,30);
                }
                else
                {
                    var obj=curFloor.getObjectById(row['id']);
                    obj['info']=submitValue; 
                    obj['infoShort']=submitValue.slice(0,30); 
                    var objsc=scene.getObjectByModelId(row['id']);
                    objsc['info']=submitValue;                    
                }                
                var dataJson=getJsonDataOfTable(oManageDiv.tabletype);
                TableLoad($table,dataJson);
            }
            else//改其他
            {
                if(title=="分组管理")
                {
                    var obj=curFloor.getGroupById(row['id']);
                    obj[field]=submitValue;
                }
                else
                {
                    var obj=curFloor.getObjectById(row['id']);
                    obj[field]=submitValue; 
                    var objsc=scene.getObjectByModelId(row['id']);
                    if(field=="name") field="model"+field;
                    objsc[field]=submitValue;                    
                }
            }            
        break;
    }
    return true;
}
function getFromWhere(title)
{
    var ret;
    switch(title)
    {
        case "测点管理":
        case "区块管理":
           ret='curFloor';
        break;
        case "分组管理":
           ret= 'curFloor.GroupList';
        break;
    } 
    return ret;
}
function getTableDataField(tabletype)
{
    var columDataField;
    switch(tabletype)
    {
        case "分组管理":
            columDataField={
                    1: "id",
                    2: "name",
                    3: "info"
                };
        break;
        case "区块管理":
            columDataField={
                    1: "id",
                    2: "name",
                    3: "info"
                };
        break;
        case "测点管理":
            columDataField={
                    1: "id",
                    2: "name",
                    3: "type"
                };
        break;
        case "分组内容":
            columDataField={
                    1: "id"
                };
        break;
    }
    return columDataField;
}
function getTableColumnNames(tabletype)
{
    var columnNames;
    switch(tabletype)
    {
        case "分组管理":
            columnNames={
                    1: "ID",
                    2: "组名",
                    3: "分组信息"
                };
        break;
        case "区块管理":
            columnNames={
                    1: "ID",
                    2: "区块名称",
                    3: "区块信息"
                };
        break;
        case "测点管理":
            columnNames={
                    1: "ID",
                    2: "测点名称",
                    3: "标签"
                };
        break;        
        case "分组内容":
            columnNames={
                    1: "ID"
                };
        break;
    }
    return columnNames;
}
function fromListToJson(list)
{
    var jsonString="[";
    var jsonbody="";
    for(var item=0;item<list.length;item++)
    {        
        jsonbody+="{ 'id':'"+list[item];
        jsonbody+="'},";
    }
    jsonString+=jsonbody.slice(0,-1);
    jsonString+="]";
    return eval("("+jsonString+")");
}
function getJsonDataOfTable(tabletype)
{
    var jsonString;
    var dataJsontmp,dataJson;
    switch(tabletype)
    {
        case "分组管理":
            // jsonString=curFloor.GroupList.serializeJSON();
            jsonString= JSON.stringify(curFloor.GroupList,null, '    ' );
            dataJsontmp = eval("("+jsonString+")");
            dataJson = dataJsontmp.List;
        break;
        case "区块管理":
            // jsonString=curFloor.BlockList.serializeJSON();
            jsonString=JSON.stringify(curFloor.BlockList,null, '    ' );
            dataJsontmp = eval("("+jsonString+")");
            dataJson = dataJsontmp.List;
        break;
        case "测点管理":
            // jsonString=curFloor.MPointList.serializeJSON();
            jsonString= JSON.stringify(curFloor.MPointList,null, '    ' );
            dataJsontmp = eval("("+jsonString+")");
            dataJson = dataJsontmp.List;
        break;
        case "分组内容":
            dataJson=fromListToJson(curGroup.List);
        break;
    }    
    return dataJson;
}